"use client";

import { useDraggable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { FormElements } from "@/components/FormBuilder/form-elements";
import { ScrollArea } from "@/components/FormBuilder/ui/scroll-area";

export function ComponentSidebar() {
  return (
    <div className="w-64 border-r bg-card overflow-hidden flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Form Elements</h2>
        <p className="text-sm text-muted-foreground">Drag and drop elements onto the canvas</p>
      </div>
      
      <ScrollArea className="flex-1">
        <div className="grid grid-cols-1 gap-2 p-4">
          {Object.values(FormElements).map((element) => (
            <SidebarItem key={element.type} element={element} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}

function SidebarItem({ element }: { element: any }) {
  const { label, icon: Icon } = element;
  
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `sidebar-item-${element.type}`,
    data: {
      element,
      isNew: true,
    },
  });
  
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={cn(
        "flex items-center gap-2 p-3 bg-background rounded-md border shadow-sm cursor-grab transition-colors hover:border-primary",
        isDragging && "opacity-50"
      )}
    >
      <Icon className="h-4 w-4 text-primary" />
      <span className="text-sm">{label}</span>
    </div>
  );
}