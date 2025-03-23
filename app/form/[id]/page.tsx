"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  FormElementInstance,
  FormElements,
} from "@/components/FormBuilder/form-elements";
import { Button } from "@/components/FormBuilder/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/FormBuilder/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { FormService } from "@/service/application/form/form.service";
import { SubmissionService } from "@/service/application/submission/submission.service";

export default function FormView() {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [form, setForm] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<Record<string, any>>({});

  async function loadForm() {
    try {
      const formData = await FormService.findOne(params.id as string);
      if (!formData.success) {
        toast({
          title: formData.message,
          description: formData.message,
          variant: "destructive",
        });
        router.push("/");
        return;
      }
      setForm(formData.data);
    } catch (error) {
      console.error("Error loading form:", error);
      toast({
        title: "Error loading form",
        description: "There was an error loading the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadForm();
  }, [params.id, router, toast]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate required fields
    const missingFields: string[] = [];
    form.elements.forEach((element: FormElementInstance) => {
      const { type, id } = element;
      const { required, label } = element.extra_attributes || {};

      if (required && !formData[id]) {
        missingFields.push(label || type);
      }
    });

    if (missingFields.length > 0) {
      toast({
        title: "Required fields missing",
        description: `Please fill in: ${missingFields.join(", ")}`,
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);
      await SubmissionService.create({
        form_id: params.id as string,
        data: formData,
      });

      toast({
        title: "Form submitted successfully",
        description: "Thank you for your submission!",
      });

      // Clear form data
      setFormData({});
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error submitting form",
        description:
          "There was an error submitting the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  }

  function handleInputChange(elementId: string, value: any) {
    setFormData((prev) => ({
      ...prev,
      [elementId]: value,
    }));
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <Skeleton className="h-8 w-64 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="bg-destructive/10 text-destructive px-4 py-2 rounded-md">
            Form not found
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <h1 className="text-3xl font-bold">{form.name}</h1>
        </div>

        {form.description && (
          <p className="text-muted-foreground mb-8">{form.description}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {form.elements &&
            form.elements.map((element: FormElementInstance) => {
              const FormComponent = FormElements[element.type].formComponent;

              if (!FormComponent) {
                return null;
              }

              return (
                <div
                  key={element.id}
                  className={cn(
                    "p-4 border rounded-lg bg-background",
                    element.type === "Title" && "border-none p-0 bg-transparent"
                  )}
                >
                  <FormComponent
                    elementInstance={element}
                    isSubmission={true}
                    defaultValue={formData[element.id]}
                    onChange={(e) =>
                      handleInputChange(element.id, e.target.value)
                    }
                  />
                </div>
              );
            })}

          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Form"}
          </Button>
        </form>
      </div>
    </div>
  );
}
