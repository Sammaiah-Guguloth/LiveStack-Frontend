// components/Layout/DesktopLayout.jsx
import React from "react";
import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import CodeHeader from "../Room/CodeHeader";
import CodeEditor from "../Room/CodeEditor";
import VideoCall from "../Room/VideoCall";
import ChatBox from "../Room/ChatBox";

const DesktopLayout = () => {
  return (
    <PanelGroup direction="horizontal" className="h-full w-full">
      {/* Left Panel: Code Editor */}
      <Panel defaultSize={70} minSize={50}>
        <div className="flex flex-col h-full w-full overflow-hidden">
          <CodeHeader />
          <div className="flex-1 overflow-hidden">
            <CodeEditor />
          </div>
        </div>
      </Panel>

      {/* Resize Handle */}
      <PanelResizeHandle className="w-[4px] bg-[#2e2e2e] hover:bg-yellow-400 transition-all duration-200 cursor-col-resize" />

      {/* Right Panel: Video + Chat */}
      <Panel defaultSize={30} minSize={20}>
        <PanelGroup direction="vertical" className="h-full w-full">
          {/* Top Half: Video */}
          <Panel defaultSize={50} minSize={20}>
            <div className="h-full w-full overflow-auto border-b border-[#2e2e2e]">
              <VideoCall />
            </div>
          </Panel>

          {/* Resize Handle */}
          <PanelResizeHandle className="h-[4px] bg-[#2e2e2e] hover:bg-yellow-400 transition-all duration-200 cursor-row-resize" />

          {/* Bottom Half: Chat */}
          <Panel defaultSize={50} minSize={20}>
            <div className="h-full w-full overflow-auto">
              <ChatBox />
            </div>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
};

export default DesktopLayout;
