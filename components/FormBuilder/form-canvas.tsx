"use client";

import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { FormElementInstance, FormElements } from "@/components/FormBuilder/form-elements";
import { Button } from "@/components/FormBuilder/ui/button";
import { Trash2Icon } from "lucide-react";

interface FormCanvasProps {
  elements: FormElementInstance[];
  selectedElement: FormElementInstance | null;
  setSelectedElement: (element: FormElementInstance | null) => void;
  removeElement: (id: string) => void;
}

export function FormCanvas({ 
  elements, 
  selectedElement, 
  setSelectedElement,
  removeElement,
}: FormCanvasProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: "canvas",
  });
  
  return (
    <div className="flex flex-col items-center p-4 min-h-full">
      <div 
        ref={setNodeRef}
        className={cn(
          "w-full max-w-[920px] h-full bg-background rounded-lg border-2 border-dashed p-4 overflow-y-auto",
          isOver && "border-primary/50 bg-primary/5",
          elements.length === 0 && "flex flex-col items-center justify-center"
        )}
      >
        {elements.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-2">Drop elements here</h3>
            <p className="text-muted-foreground">Drag components from the sidebar to build your form</p>
          </div>
        ) : (
          <div className="space-y-4">
            {elements.map((element) => (
              <CanvasElement 
                key={element.id} 
                element={element} 
                isSelected={selectedElement?.id === element.id}
                onClick={() => setSelectedElement(element)}
                onRemove={() => removeElement(element.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface CanvasElementProps {
  element: FormElementInstance;
  isSelected: boolean;
  onClick: () => void;
  onRemove: () => void;
}

function CanvasElement({ element, isSelected, onClick, onRemove }: CanvasElementProps) {
  const ElementComponent = FormElements[element.type].formComponent;
  
  if (!ElementComponent) {
    return null;
  }
  
  return (
    <div
      className={cn(
        "relative rounded-md border bg-card transition-all",
        isSelected && "ring-2 ring-primary"
      )}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <div className="p-4">
        <ElementComponent elementInstance={element} />
      </div>
      
      {isSelected && (
        <div className="absolute -top-3 -right-3">
          <Button
            size="icon"
            variant="destructive"
            className="h-6 w-6 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
          >
            <Trash2Icon className="h-3 w-3" />
          </Button>
        </div>
      )}
    </div>
  );
}