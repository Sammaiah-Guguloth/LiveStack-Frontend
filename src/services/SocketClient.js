// SocketClient.js a singleton class to manage socket connections
import { io } from "socket.io-client";

class SocketClient {
  socket = null;

  connect() {
    console.log(import.meta.env.VITE_SOCKET_HOST);
    this.socket = io(import.meta.env.VITE_SOCKET_HOST, {
      transports: ["websocket"],
      withCredentials: true,
    });

    return new Promise((resolve, reject) => {
      this.socket.on("connect", () => resolve());
      this.socket.on("connect_error", (err) => reject(err));
    });
  }

  disconnect() {
    return new Promise((resolve) => {
      if (this.socket) {
        this.socket.disconnect();
        this.socket = null;
      }
      resolve();
    });
  }

  emit(event, data) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("Socket not initialized");
      this.socket.emit(event, data, (response) => {
        if (response?.error) return reject(response.error);
        resolve(response); // you can also return data from backend
      });
    });
  }

  on(event, handler) {
    return new Promise((resolve, reject) => {
      if (!this.socket) return reject("Socket not initialized");
      this.socket.on(event, handler);
      resolve();
    });
  }

  off(event) {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  isConnected() {
    return !!this.socket && this.socket.connected;
  }

  getId() {
    return this.socket?.id;
  }
}

const socket = new SocketClient();
export default socket;
