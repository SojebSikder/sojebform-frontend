"use client";

import { FormElementInstance, FormElements } from "@/components/FormBuilder/form-elements";
import { ScrollArea } from "@/components/FormBuilder/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/FormBuilder/ui/tabs";
import { SettingsIcon, TypeIcon } from "lucide-react";

interface PropertiesPanelProps {
  selectedElement: FormElementInstance | null;
  updateElement: (id: string, attributes: any) => void;
}

export function PropertiesPanel({ selectedElement, updateElement }: PropertiesPanelProps) {
  if (!selectedElement) {
    return (
      <div className="w-80 border-l bg-card p-6 flex flex-col items-center justify-center text-center">
        <div className="mb-4 rounded-full bg-muted p-3">
          <SettingsIcon className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1">No element selected</h3>
        <p className="text-sm text-muted-foreground">
          Select an element to configure its properties
        </p>
      </div>
    );
  }
  
  const element = FormElements[selectedElement.type];
  
  if (!element) {
    return (
      <div className="w-80 border-l bg-card p-6">
        <p className="text-sm text-muted-foreground">
          Unknown element type: {selectedElement.type}
        </p>
      </div>
    );
  }
  
  const PropertiesComponent = element.propertiesComponent;
  
  if (!PropertiesComponent) {
    return (
      <div className="w-80 border-l bg-card p-6">
        <p className="text-sm text-muted-foreground">
          No properties available for this element
        </p>
      </div>
    );
  }
  
  return (
    <div className="w-80 border-l bg-card flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold flex items-center gap-2">
          <TypeIcon className="h-4 w-4" />
          <span>{element.label} Properties</span>
        </h2>
      </div>
      
      <Tabs defaultValue="properties" className="flex-1 flex flex-col">
        <TabsList className="mx-4 mt-2">
          <TabsTrigger value="properties" className="flex-1">Properties</TabsTrigger>
          <TabsTrigger value="design" className="flex-1">Design</TabsTrigger>
        </TabsList>
        
        <ScrollArea className="flex-1">
          <TabsContent value="properties" className="p-4 focus-visible:outline-none focus-visible:ring-0">
            <PropertiesComponent
              elementInstance={selectedElement}
              updateElement={(attributes) => updateElement(selectedElement.id, attributes)}
            />
          </TabsContent>
          
          <TabsContent value="design" className="p-4 focus-visible:outline-none focus-visible:ring-0">
            <DesignPanel
              elementInstance={selectedElement}
              updateElement={(attributes) => updateElement(selectedElement.id, attributes)}
            />
          </TabsContent>
        </ScrollArea>
      </Tabs>
    </div>
  );
}

interface DesignPanelProps {
  elementInstance: FormElementInstance;
  updateElement: (attributes: any) => void;
}

function DesignPanel({ elementInstance, updateElement }: DesignPanelProps) {
  // This is a simplified design panel - in a real app, you would have more styling options
  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Design options will be available in a future update.
      </p>
    </div>
  );
}