import Link from "next/link";
import React from "react";
import { Button } from "../FormBuilder/ui/button";
import { FileIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Form Builder</h1>
        <Link href="/dashboard/form">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1"
          >
            <FileIcon className="h-4 w-4" />
            My Forms
          </Button>
        </Link>
      </div>
    </header>
  );
}
