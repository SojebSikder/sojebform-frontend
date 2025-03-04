"use client";
import katex from "katex";
import "katex/dist/katex.min.css";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useRef, useState } from "react";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // ES6

export default function TextEditor({
  id,
  value,
  onChange,
}: {
  id?: string;
  value: any;
  onChange: (value: any) => void;
}) {
  // const reactQuill = useRef();
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  useEffect(() => {
    (window as any).katex = katex;
  }, []);

  const modules: any = { formula: true };
  modules.toolbar = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const formats = [
    "header",
    "font",
    "background",
    "code",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "script",
    "align",
    "direction",
    "link",
    "image",
    "code-block",
    "formula",
    "video",
  ];

  return (
    <>
      <ReactQuill
        // ref={reactQuill}
        id={id}
        modules={modules}
        formats={formats}
        theme="snow"
        value={value}
        onChange={onChange}
        style={{
          wordBreak: "break-all",
          backgroundColor: "#fff",
          marginBottom: "20px",
        }}
        placeholder="Click here to insert text..."
      />
    </>
  );
}
