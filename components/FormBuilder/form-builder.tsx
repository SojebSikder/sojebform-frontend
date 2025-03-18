"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import { ComponentSidebar } from "@/components/FormBuilder/component-sidebar";
import { FormCanvas } from "@/components/FormBuilder/form-canvas";
import { PropertiesPanel } from "@/components/FormBuilder/properties-panel";
import {
  FormElement,
  FormElementInstance,
} from "@/components/FormBuilder/form-elements";
import { createPortal } from "react-dom";
import { ElementPreview } from "@/components/FormBuilder/element-preview";
import { nanoid } from "nanoid";
import { Button } from "@/components/FormBuilder/ui/button";
import { SaveIcon, Trash2Icon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/FormBuilder/ui/dialog";
import { Label } from "@/components/FormBuilder/ui/label";
import { Input } from "@/components/FormBuilder/ui/input";
import { Textarea } from "@/components/FormBuilder/ui/textarea";
import { FormService } from "@/service/admin/form/form.service";

export function FormBuilder() {
  const [elements, setElements] = useState<FormElementInstance[]>([]);
  const [selectedElement, setSelectedElement] =
    useState<FormElementInstance | null>(null);
  const [draggedElement, setDraggedElement] = useState<FormElement | null>(
    null
  );
  const [saveDialogOpen, setSaveDialogOpen] = useState(false);
  const [formName, setFormName] = useState("My Form");
  const [formDescription, setFormDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 5,
      },
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const activeData = active.data.current as {
      isNew?: boolean;
      element?: FormElement;
    };

    if (activeData?.isNew && activeData.element) {
      setDraggedElement(activeData.element);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (!over || !active.data.current) {
      setDraggedElement(null);
      return;
    }

    const activeData = active.data.current as {
      isNew?: boolean;
      element?: FormElement;
    };

    if (activeData?.isNew && activeData.element && over.id === "canvas") {
      const newElement: FormElementInstance = {
        id: nanoid(),
        type: activeData.element.type,
        extra_attributes: activeData.element.construct(),
      };

      setElements((prev) => [...prev, newElement]);
      setSelectedElement(newElement);
    }

    setDraggedElement(null);
  }

  function updateElement(id: string, attributes: any) {
    setElements((prev) =>
      prev.map((element) => {
        if (element.id === id) {
          return {
            ...element,
            extra_attributes: {
              ...element.extra_attributes,
              ...attributes,
            },
          };
        }
        return element;
      })
    );

    // Also update the selected element if it's the one being modified
    if (selectedElement?.id === id) {
      setSelectedElement((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          extra_attributes: {
            ...prev.extra_attributes,
            ...attributes,
          },
        };
      });
    }
  }

  function removeElement(id: string) {
    setElements((prev) => prev.filter((element) => element.id !== id));
    if (selectedElement?.id === id) {
      setSelectedElement(null);
    }
  }

  function saveForm() {
    if (elements.length === 0) {
      toast({
        title: "Cannot save empty form",
        description: "Add at least one element to your form before saving.",
        variant: "destructive",
      });
      return;
    }

    setSaveDialogOpen(true);
  }

  async function handleSaveForm() {
    try {
      setIsSaving(true);

      const formData = {
        name: formName,
        description: formDescription,
        elements: elements,
      };

      console.log("formData", formData);

      // const savedForm = await createForm(formData);
      const createForm = await FormService.create(formData);

      setSaveDialogOpen(false);

      toast({
        title: "Form saved successfully",
        description: `Your form "${formData.name}" has been saved.`,
      });
    } catch (error) {
      console.error("Error saving form:", error);
      toast({
        title: "Error saving form",
        description: "There was an error saving your form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  }

  function clearForm() {
    if (elements.length === 0) return;

    setElements([]);
    setSelectedElement(null);

    toast({
      title: "Form cleared",
      description: "All elements have been removed from the form.",
    });
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToWindowEdges]}
    >
      <div className="flex flex-col h-screen">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Form Builder</h1>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={clearForm}
                className="flex items-center gap-1"
              >
                <Trash2Icon className="h-4 w-4" />
                Clear
              </Button>
              <Button
                size="sm"
                onClick={saveForm}
                className="flex items-center gap-1"
              >
                <SaveIcon className="h-4 w-4" />
                Save Form
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 overflow-hidden">
          <ComponentSidebar />

          <div className="flex-1 overflow-auto bg-muted/40">
            <FormCanvas
              elements={elements}
              selectedElement={selectedElement}
              setSelectedElement={setSelectedElement}
              removeElement={removeElement}
            />
          </div>

          <PropertiesPanel
            selectedElement={selectedElement}
            updateElement={updateElement}
          />
        </div>
      </div>

      <Dialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Form</DialogTitle>
            <DialogDescription>
              Enter a name and description for your form.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="form-name">Form Name</Label>
              <Input
                id="form-name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="My Form"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="form-description">Description (optional)</Label>
              <Textarea
                id="form-description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                placeholder="Enter a description for your form"
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setSaveDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleSaveForm}
              disabled={!formName.trim() || isSaving}
            >
              {isSaving ? "Saving..." : "Save Form"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {typeof document !== "undefined" &&
        createPortal(
          <DragOverlay>
            {draggedElement && <ElementPreview element={draggedElement} />}
          </DragOverlay>,
          document.body
        )}
    </DndContext>
  );
}
