import React, { useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useSelector, useDispatch } from "react-redux";
import * as monaco from "monaco-editor";
import socket from "../../services/SocketClient";
import { useParams } from "react-router-dom";
import {
  setCode,
  updateRemoteCursor,
  clearRemoteCursors,
} from "../../redux/slices/code.slice";

// Boilerplate per language
const boilerplateMap = {
  javascript: `function hello() {
  console.log("Hello, world!");
}`,
  python: `def hello():
    print("Hello, world!")`,
  cpp: `#include <iostream>
using namespace std;

int main() {
    cout << "Hello, world!" << endl;
    return 0;
}`,
  java: `public class Main {
  public static void main(String[] args) {
    System.out.println("Hello, world!");
  }
}`,
  c: `#include <stdio.h>

int main() {
    printf("Hello, world!\\n");
    return 0;
}`,
};

// Gradient styles per user
const gradients = [
  ["#ec4899", "#ef4444"],
  ["#22c55e", "#10b981"],
  ["#3b82f6", "#6366f1"],
  ["#facc15", "#f97316"],
  ["#a855f7", "#d946ef"],
];
const hashString = (str) =>
  str.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
const getUserCursorColors = (userId) => {
  const index = Math.abs(hashString(userId)) % gradients.length;
  return gradients[index];
};

// Throttle helper
const throttle = (func, limit) => {
  let inThrottle = false;
  return function (...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

// Generate dynamic cursor styles
const generateCursorStyles = (remoteCursors, currentUserId) => {
  let styles = "";
  Object.entries(remoteCursors).forEach(([userId, { userName }]) => {
    if (userId === currentUserId) return;
    const [fromColor, toColor] = getUserCursorColors(userId);
    styles += `
      .monaco-editor .remote-cursor-${userId} {
        --flag-gradient-from: ${fromColor};
        --flag-gradient-to: ${toColor};
      }
      .monaco-editor .cursor-label-${userId}::after {
        content: "${userName}";
        --flag-bg-color: ${toColor};
      }
    `;
  });
  return styles;
};

const CodeEditor = () => {
  const { user } = useSelector((state) => state.auth);
  const { language } = useSelector((state) => state.room);
  const { code, remoteCursors } = useSelector((state) => state.code);
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const editorRef = useRef(null);
  const decorationsRef = useRef([]);

  // Set initial code when language changes
  useEffect(() => {
    dispatch(setCode(boilerplateMap[language] || "// Start coding..."));
  }, [language]);

  // Handle code change
  const handleCodeChange = (value) => {
    dispatch(setCode(value));
    socket.emit("code-change", { code: value, roomId, userId: user._id });
  };

  // Setup cursor tracking
  const handleEditorMount = (editor) => {
    editorRef.current = editor;

    const throttledCursorEmit = throttle((position) => {
      socket.emit("cursor-change", {
        roomId,
        userId: user._id,
        userName: user.firstName,
        position,
      });
    }, 100);

    editor.onDidChangeCursorPosition((e) => {
      throttledCursorEmit(e.position);
    });
  };

  // Preserve this socket listener code
  useEffect(() => {
    // socket.on("code-change", ({ code: newCode }) => {
    //   if (newCode !== code) {
    //     dispatch(setCode(newCode));
    //   }
    // });
    // socket.on("cursor-change", ({ userId, userName, position }) => {
    //   if (userId !== user._id) {
    //     dispatch(updateRemoteCursor({ userId, userName, position }));
    //   }
    // });
    // return () => {
    //   socket.off("code-change");
    //   socket.off("cursor-change");
    //   dispatch(clearRemoteCursors());
    // };
  }, [code]);

  // Apply decorations for remote cursors
  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !monaco) return;

    const decorations = Object.entries(remoteCursors)
      .filter(([userId]) => userId !== user._id)
      .map(([userId, { position }]) => ({
        range: new monaco.Range(
          position.lineNumber,
          position.column,
          position.lineNumber,
          position.column
        ),
        options: {
          className: `remote-cursor-${userId}`,
          afterContentClassName: `cursor-label-${userId}`,
        },
      }));

    decorationsRef.current = editor.deltaDecorations(
      decorationsRef.current,
      decorations
    );
  }, [remoteCursors]);

  // Custom theme (optional)
  useEffect(() => {
    monaco.editor.defineTheme("github-dark", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {
        "editor.background": "#0f1116",
        "editorLineNumber.foreground": "#8b949e",
        "editorCursor.foreground": "#58a6ff",
      },
    });
  }, []);

  const dynamicCursorStyles = generateCursorStyles(remoteCursors, user._id);

  return (
    <div className="relative h-full w-full">
      <Editor
        height="100%"
        language={language}
        value={code}
        theme="vs-dark" // Use "vs-dark" if preferred
        onChange={handleCodeChange}
        onMount={handleEditorMount}
        options={{
          fontSize: 15,
          fontFamily: "monospace , 'Fira Code'",
          fontLigatures: true,
          minimap: { enabled: true },
          smoothScrolling: true,
          cursorSmoothCaretAnimation: true,
          wordWrap: "on",
          tabSize: 2,
          formatOnType: true,
          formatOnPaste: true,
          autoClosingBrackets: "always",
          autoClosingQuotes: "always",
          matchBrackets: "always",
          scrollBeyondLastLine: false,
          automaticLayout: true,
          lineNumbers: "on",
          suggestOnTriggerCharacters: true,
        }}
      />

      <style>{`
        ${dynamicCursorStyles}

        .monaco-editor .remote-cursor-${user._id}::before {
          display: none !important;
        }
        .monaco-editor .cursor-label-${user._id}::after {
          display: none !important;
        }

        .monaco-editor [class^="remote-cursor-"]::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          background-image: linear-gradient(to bottom, var(--flag-gradient-from), var(--flag-gradient-to));
          border-radius: 1px;
          z-index: 1000;
        }

        .monaco-editor [class^="cursor-label-"]::after {
          position: absolute;
          bottom: 100%;
          left: 50%;
          transform: translateX(-50%);
          margin-bottom: 6px;
          background-image: linear-gradient(to right, var(--flag-gradient-from), var(--flag-gradient-to));
          padding: 4px 10px;
          border-radius: 9999px;
          color: white;
          font-size: 12px;
          font-weight: 700;
          white-space: nowrap;
          pointer-events: none;
          box-shadow: 0 2px 6px rgba(0,0,0,0.4);
          z-index: 1100;
          user-select: none;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
