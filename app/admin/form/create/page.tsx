import { FormBuilder } from "@/components/FormBuilder/form-builder";
import { Button } from "@/components/FormBuilder/ui/button";
import { FormService } from "@/service/admin/form/form.service";
import { FileIcon } from "lucide-react";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { form_id } = await searchParams;
  const formId = String(form_id);
  const form = await FormService.findOne(formId);

  return (
    <div>
      <main className="min-h-screen bg-background">
        <header className="border-b bg-card">
          <div className="container mx-auto px-4 py-3 flex justify-between items-center">
            <h1 className="text-2xl font-bold">Form Builder</h1>
            <Link href="/admin/form">
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
        <FormBuilder
          formId={formId}
          name={form.data.name}
          description={form.data.description}
          defaultElements={form.data.elements}
        />
      </main>
    </div>
  );
}
