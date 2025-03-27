import React from "react";
import Header from "./Header";

export default function Main({ children }: { children?: any }) {
  return (
    <div>
      <main className="min-h-screen bg-background">
        <Header />
        <div>{children}</div>
      </main>
    </div>
  );
}
