class PeerConnectionManager {
  constructor({ localStream, socket, onRemoteStream }) {
    this.localStream = localStream;
    this.socket = socket;
    this.onRemoteStream = onRemoteStream; // callback(socketId, remoteStream)
    this.peerConnections = {}; // { [socketId]: { userId, socketId, peer } }
  }

  createPeer({ userId, userName, socketId }) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: [
            "stun:stun.l.google.com:19302",
            "stun:global.stun.twilio.com:3478",
          ],
        },
        // Add TURN servers if needed
      ],
    });

    // Add local media tracks
    this.localStream.getTracks().forEach((track) => {
      peer.addTrack(track, this.localStream);
    });

    // Handle ICE candidate
    peer.onicecandidate = (event) => {
      if (event.candidate) {
        this.socket.emit("ice-candidate", {
          to: socketId,
          candidate: event.candidate,
        });
      }
    };

    // Handle remote stream
    peer.ontrack = (event) => {
      const [remoteStream] = event.streams;
      this.onRemoteStream(userId, userName, socketId, remoteStream);
    };

    this.peerConnections[socketId] = { userId, socketId, peer };
    return peer;
  }

  async createAndSendOffer({ userId, userName, socketId }) {
    console.log("creating and sending offer to ", userId, " ", socketId);
    const peer = this.createPeer({ userId, userName, socketId });
    const offer = await peer.createOffer();
    console.log("sending offer : ", offer);
    await peer.setLocalDescription(offer);

    this.socket.emit("send-offer", {
      fromUserName: userName,
      from: userId,
      to: socketId,
      offer,
    });
  }

  async handleReceivedOffer({ fromSocketId, fromUserId, userName, offer }) {
    console.log("handling recevied offer : ", offer, " ", userName);
    const peer = this.createPeer({
      userName,
      userId: fromUserId,
      socketId: fromSocketId,
    });
    await peer.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    this.socket.emit("send-answer", {
      to: fromSocketId,
      answer,
    });
  }

  async handleReceivedAnswer({ fromSocketId, answer }) {
    const conn = this.peerConnections[fromSocketId];
    if (!conn) return;
    await conn.peer.setRemoteDescription(new RTCSessionDescription(answer));
  }

  async addIceCandidate({ fromSocketId, candidate }) {
    const conn = this.peerConnections[fromSocketId];
    if (conn && candidate) {
      await conn.peer.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  toggleAudio(enable) {
    this.localStream.getAudioTracks().forEach((track) => {
      track.enabled = enable;
    });
  }

  toggleVideo(enable) {
    this.localStream.getVideoTracks().forEach((track) => {
      track.enabled = enable;
    });
  }

  closePeer(socketId) {
    const conn = this.peerConnections[socketId];
    if (conn) {
      conn.peer.close();
      delete this.peerConnections[socketId];
    }
  }

  closeAll() {
    Object.keys(this.peerConnections).forEach((socketId) => {
      this.closePeer(socketId);
    });
  }
}

export default PeerConnectionManager;
