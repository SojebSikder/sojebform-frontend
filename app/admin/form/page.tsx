"use client";

import { useEffect, useState } from "react";
// import { getForms, deleteForm, togglePublishForm } from "@/lib/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/FormBuilder/ui/card";

import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/FormBuilder/ui/alert-dialog";
import {
  EyeIcon,
  PencilIcon,
  TrashIcon,
  FileIcon,
  CheckCircleIcon,
  XCircleIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/FormBuilder/ui/button";
import { Badge } from "@/components/FormBuilder/ui/badge";
import { FormService, FormData } from "@/service/admin/form/form.service";

export default function FormsPage() {
  const [forms, setForms] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formToDelete, setFormToDelete] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadForms();
  }, []);

  async function loadForms() {
    try {
      setLoading(true);
      // const data = await getForms();
      const form_data = await FormService.findAll();

      if (form_data.success) {
        setForms(form_data.data);
      }
    } catch (error) {
      console.error("Error loading forms:", error);
      toast({
        title: "Error loading forms",
        description: "There was an error loading your forms. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteForm(id: string) {
    try {
      // await deleteForm(id);
      const form = await FormService.delete(id);
      if (form.success) {
        setForms(forms.filter((form) => form.id !== id));
        toast({
          title: "Form deleted",
          description: "The form has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      toast({
        title: "Error deleting form",
        description: "There was an error deleting the form. Please try again.",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setFormToDelete(null);
    }
  }

  async function handleTogglePublish(id: string) {
    try {
      const updatedForm = await FormService.toggleStatus(id);
      if (updatedForm.success) {
        setForms(forms.map((form) => (form.id === id ? updatedForm : form)));
        toast({
          title: updatedForm.status ? "Form published" : "Form unpublished",
          description: updatedForm.status
            ? "The form is now available for submissions."
            : "The form is no longer accepting submissions.",
        });
      }
    } catch (error) {
      console.error("Error toggling form publish status:", error);
      toast({
        title: "Error updating form",
        description: "There was an error updating the form. Please try again.",
        variant: "destructive",
      });
    }
  }

  function confirmDelete(id: string) {
    setFormToDelete(id);
    setDeleteDialogOpen(true);
  }

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-6">Your Forms</h1>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Loading forms...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Your Forms</h1>
        <Link href="/admin/form/create">
          <Button>Create New Form</Button>
        </Link>
      </div>

      {forms.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-64 bg-muted/30 rounded-lg border border-dashed">
          <FileIcon className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-xl font-medium mb-2">No forms yet</h3>
          <p className="text-muted-foreground mb-4">
            Create your first form to get started
          </p>
          <Link href="/admin/form/create">
            <Button>Create Form</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {forms.map((form) => (
            <Card key={form.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="truncate">{form.name}</CardTitle>
                  <Badge variant={form.status ? "default" : "outline"}>
                    {form.status ? "Published" : "Draft"}
                  </Badge>
                </div>
                <CardDescription className="line-clamp-2">
                  {form.description || "No description"}
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">
                  {form.elements.length}{" "}
                  {form.elements.length === 1 ? "element" : "elements"}
                </p>
                <p className="text-sm text-muted-foreground">
                  Created: {new Date(form.created_at!).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/forms/${form.id}`}>
                      <PencilIcon className="h-4 w-4 mr-1" />
                      Edit
                    </Link>
                  </Button>
                  {form.status && (
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/forms/${form.id}/view`}>
                        <EyeIcon className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleTogglePublish(form.id!)}
                  >
                    {form.status ? (
                      <>
                        <XCircleIcon className="h-4 w-4 mr-1" />
                        Unpublish
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon className="h-4 w-4 mr-1" />
                        Publish
                      </>
                    )}
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => confirmDelete(form.id!)}
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              form and all its submissions.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => formToDelete && handleDeleteForm(formToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
