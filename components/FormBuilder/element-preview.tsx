"use client";

import { FormElement } from "@/components/FormBuilder/form-elements";

interface ElementPreviewProps {
  element: FormElement;
}

export function ElementPreview({ element }: ElementPreviewProps) {
  const { label, icon: Icon } = element;
  
  return (
    <div className="flex items-center gap-2 p-3 bg-background rounded-md border shadow-sm w-48">
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-sm">{label}</span>
    </div>
  );
}