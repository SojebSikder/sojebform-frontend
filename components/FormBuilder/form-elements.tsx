"use client";

import {
  TextIcon,
  TypeIcon,
  CheckSquareIcon,
  ListIcon,
  ToggleLeftIcon,
  CalendarIcon,
  FileTextIcon,
  SlidersIcon,
} from "lucide-react";
import { Label } from "@/components/FormBuilder/ui/label";
import { Input } from "@/components/FormBuilder/ui/input";
import { Textarea } from "@/components/FormBuilder/ui/textarea";
import { Checkbox } from "@/components/FormBuilder/ui/checkbox";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/FormBuilder/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/FormBuilder/ui/select";
import { Switch } from "@/components/FormBuilder/ui/switch";
import { Slider } from "@/components/FormBuilder/ui/slider";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/FormBuilder/ui/form";
import { Button } from "@/components/FormBuilder/ui/button";

// Base types
export type FormElementInstance = {
  id: string;
  type: string;
  extra_attributes?: Record<string, any>;
};

export type FormElement = {
  type: string;
  construct: () => Record<string, any>;
  label: string;
  icon: React.ElementType;
  formComponent: React.FC<{
    elementInstance: FormElementInstance;
  }>;
  propertiesComponent: React.FC<{
    elementInstance: FormElementInstance;
    updateElement: (attributes: Record<string, any>) => void;
  }>;
};

// Text Field Element
const TextFieldFormElement: FormElement = {
  type: "TextField",
  construct: () => ({
    label: "Text Field",
    placeholder: "Enter text here",
    helper_text: "",
    required: false,
  }),
  label: "Text Field",
  icon: TextIcon,
  formComponent: ({ elementInstance }) => {
    const { label, placeholder, helper_text, required } =
      elementInstance.extra_attributes || {};

    return (
      <div className="space-y-2">
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Input placeholder={placeholder} />
        {helper_text && (
          <p className="text-sm text-muted-foreground">{helper_text}</p>
        )}
      </div>
    );
  },
  propertiesComponent: ({ elementInstance, updateElement }) => {
    const { label, placeholder, helper_text, required } =
      elementInstance.extra_attributes || {};

    const formSchema = z.object({
      label: z.string().min(1, "Label is required"),
      placeholder: z.string().optional(),
      helper_text: z.string().optional(),
      required: z.boolean().default(false),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        label: label || "Text Field",
        placeholder: placeholder || "",
        helper_text: helper_text || "",
        required: required || false,
      },
    });

    function onSubmit(values: FormSchemaType) {
      updateElement(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeholder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placeholder</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helper_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Required field
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update properties
          </Button>
        </form>
      </Form>
    );
  },
};

// Textarea Element
const TextareaFormElement: FormElement = {
  type: "Textarea",
  construct: () => ({
    label: "Textarea",
    placeholder: "Enter text here",
    helper_text: "",
    required: false,
    rows: 3,
  }),
  label: "Textarea",
  icon: FileTextIcon,
  formComponent: ({ elementInstance }) => {
    const { label, placeholder, helper_text, required, rows } =
      elementInstance.extra_attributes || {};

    return (
      <div className="space-y-2">
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Textarea placeholder={placeholder} rows={rows || 3} />
        {helper_text && (
          <p className="text-sm text-muted-foreground">{helper_text}</p>
        )}
      </div>
    );
  },
  propertiesComponent: ({ elementInstance, updateElement }) => {
    const { label, placeholder, helper_text, required, rows } =
      elementInstance.extra_attributes || {};

    const formSchema = z.object({
      label: z.string().min(1, "Label is required"),
      placeholder: z.string().optional(),
      helper_text: z.string().optional(),
      required: z.boolean().default(false),
      rows: z.coerce.number().min(1).max(20).default(3),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        label: label || "Textarea",
        placeholder: placeholder || "",
        helper_text: helper_text || "",
        required: required || false,
        rows: rows || 3,
      },
    });

    function onSubmit(values: FormSchemaType) {
      updateElement(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeholder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placeholder</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helper_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rows"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rows</FormLabel>
                <FormControl>
                  <Input type="number" min={1} max={20} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Required field
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update properties
          </Button>
        </form>
      </Form>
    );
  },
};

// Checkbox Element
const CheckboxFormElement: FormElement = {
  type: "Checkbox",
  construct: () => ({
    label: "Checkbox",
    helper_text: "",
    defaultChecked: false,
  }),
  label: "Checkbox",
  icon: CheckSquareIcon,
  formComponent: ({ elementInstance }) => {
    const { label, helper_text, defaultChecked } =
      elementInstance.extra_attributes || {};

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Checkbox
            id={`checkbox-${elementInstance.id}`}
            defaultChecked={defaultChecked}
          />
          <Label htmlFor={`checkbox-${elementInstance.id}`}>{label}</Label>
        </div>
        {helper_text && (
          <p className="text-sm text-muted-foreground ml-6">{helper_text}</p>
        )}
      </div>
    );
  },
  propertiesComponent: ({ elementInstance, updateElement }) => {
    const { label, helper_text, defaultChecked } =
      elementInstance.extra_attributes || {};

    const formSchema = z.object({
      label: z.string().min(1, "Label is required"),
      helper_text: z.string().optional(),
      defaultChecked: z.boolean().default(false),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        label: label || "Checkbox",
        helper_text: helper_text || "",
        defaultChecked: defaultChecked || false,
      },
    });

    function onSubmit(values: FormSchemaType) {
      updateElement(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helper_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultChecked"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Default checked
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update properties
          </Button>
        </form>
      </Form>
    );
  },
};

// Select Element
const SelectFormElement: FormElement = {
  type: "Select",
  construct: () => ({
    label: "Select",
    placeholder: "Select an option",
    helper_text: "",
    required: false,
    options: [
      { label: "Option 1", value: "option1" },
      { label: "Option 2", value: "option2" },
    ],
  }),
  label: "Select",
  icon: ListIcon,
  formComponent: ({ elementInstance }) => {
    const { label, placeholder, helper_text, required, options } =
      elementInstance.extra_attributes || {};

    return (
      <div className="space-y-2">
        <Label>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options?.map((option: { label: string; value: string }) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {helper_text && (
          <p className="text-sm text-muted-foreground">{helper_text}</p>
        )}
      </div>
    );
  },
  propertiesComponent: ({ elementInstance, updateElement }) => {
    const { label, placeholder, helper_text, required, options } =
      elementInstance.extra_attributes || {};

    const formSchema = z.object({
      label: z.string().min(1, "Label is required"),
      placeholder: z.string().optional(),
      helper_text: z.string().optional(),
      required: z.boolean().default(false),
      options: z
        .array(
          z.object({
            label: z.string().min(1, "Option label is required"),
            value: z.string().min(1, "Option value is required"),
          })
        )
        .min(1, "At least one option is required"),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        label: label || "Select",
        placeholder: placeholder || "Select an option",
        helper_text: helper_text || "",
        required: required || false,
        options: options || [
          { label: "Option 1", value: "option1" },
          { label: "Option 2", value: "option2" },
        ],
      },
    });

    function onSubmit(values: FormSchemaType) {
      updateElement(values);
    }

    const { fields, append, remove } = form.control._formValues.options;

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="placeholder"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placeholder</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helper_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Options</FormLabel>
            <div className="space-y-2 mt-2">
              {form.watch("options")?.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Label"
                    {...form.register(`options.${index}.label`)}
                  />
                  <Input
                    placeholder="Value"
                    {...form.register(`options.${index}.value`)}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => {
                      const currentOptions = form.getValues("options");
                      const newOptions = [...currentOptions];
                      newOptions.splice(index, 1);
                      form.setValue("options", newOptions);
                    }}
                  >
                    &times;
                  </Button>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="mt-2"
                onClick={() => {
                  const currentOptions = form.getValues("options") || [];
                  form.setValue("options", [
                    ...currentOptions,
                    { label: "", value: "" },
                  ]);
                }}
              >
                Add Option
              </Button>
            </div>
            {form.formState.errors.options && (
              <p className="text-sm text-destructive mt-1">
                {form.formState.errors.options.message}
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Required field
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update properties
          </Button>
        </form>
      </Form>
    );
  },
};

// Switch Element
const SwitchFormElement: FormElement = {
  type: "Switch",
  construct: () => ({
    label: "Switch",
    helper_text: "",
    defaultChecked: false,
  }),
  label: "Switch",
  icon: ToggleLeftIcon,
  formComponent: ({ elementInstance }) => {
    const { label, helper_text, defaultChecked } =
      elementInstance.extra_attributes || {};

    return (
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Switch
            id={`switch-${elementInstance.id}`}
            defaultChecked={defaultChecked}
          />
          <Label htmlFor={`switch-${elementInstance.id}`}>{label}</Label>
        </div>
        {helper_text && (
          <p className="text-sm text-muted-foreground ml-6">{helper_text}</p>
        )}
      </div>
    );
  },
  propertiesComponent: ({ elementInstance, updateElement }) => {
    const { label, helper_text, defaultChecked } =
      elementInstance.extra_attributes || {};

    const formSchema = z.object({
      label: z.string().min(1, "Label is required"),
      helper_text: z.string().optional(),
      defaultChecked: z.boolean().default(false),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        label: label || "Switch",
        helper_text: helper_text || "",
        defaultChecked: defaultChecked || false,
      },
    });

    function onSubmit(values: FormSchemaType) {
      updateElement(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helper_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="defaultChecked"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel className="text-sm font-normal">
                  Default checked
                </FormLabel>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update properties
          </Button>
        </form>
      </Form>
    );
  },
};

// Slider Element
const SliderFormElement: FormElement = {
  type: "Slider",
  construct: () => ({
    label: "Slider",
    helper_text: "",
    min: 0,
    max: 100,
    step: 1,
    defaultValue: 50,
  }),
  label: "Slider",
  icon: SlidersIcon,
  formComponent: ({ elementInstance }) => {
    const { label, helper_text, min, max, step, defaultValue } =
      elementInstance.extra_attributes || {};

    return (
      <div className="space-y-2">
        <Label>{label}</Label>
        <Slider
          defaultValue={[defaultValue || 50]}
          min={min || 0}
          max={max || 100}
          step={step || 1}
          className="py-2"
        />
        {helper_text && (
          <p className="text-sm text-muted-foreground">{helper_text}</p>
        )}
      </div>
    );
  },
  propertiesComponent: ({ elementInstance, updateElement }) => {
    const { label, helper_text, min, max, step, defaultValue } =
      elementInstance.extra_attributes || {};

    const formSchema = z.object({
      label: z.string().min(1, "Label is required"),
      helper_text: z.string().optional(),
      min: z.coerce.number().default(0),
      max: z.coerce.number().default(100),
      step: z.coerce.number().default(1),
      defaultValue: z.coerce.number().default(50),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        label: label || "Slider",
        helper_text: helper_text || "",
        min: min ?? 0,
        max: max ?? 100,
        step: step ?? 1,
        defaultValue: defaultValue ?? 50,
      },
    });

    function onSubmit(values: FormSchemaType) {
      updateElement(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="label"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Label</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="helper_text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Helper Text</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="min"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Min</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="max"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Max</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <FormField
              control={form.control}
              name="step"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Step</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="defaultValue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Default</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Update properties
          </Button>
        </form>
      </Form>
    );
  },
};

// Title Element
const TitleFormElement: FormElement = {
  type: "Title",
  construct: () => ({
    title: "Form Title",
    subtitle: "Fill out the form below",
  }),
  label: "Title",
  icon: TypeIcon,
  formComponent: ({ elementInstance }) => {
    const { title, subtitle } = elementInstance.extra_attributes || {};

    return (
      <div className="space-y-1">
        <h2 className="text-2xl font-bold">{title}</h2>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
    );
  },
  propertiesComponent: ({ elementInstance, updateElement }) => {
    const { title, subtitle } = elementInstance.extra_attributes || {};

    const formSchema = z.object({
      title: z.string().min(1, "Title is required"),
      subtitle: z.string().optional(),
    });

    type FormSchemaType = z.infer<typeof formSchema>;

    const form = useForm<FormSchemaType>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        title: title || "Form Title",
        subtitle: subtitle || "Fill out the form below",
      },
    });

    function onSubmit(values: FormSchemaType) {
      updateElement(values);
    }

    return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="subtitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Subtitle</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full">
            Update properties
          </Button>
        </form>
      </Form>
    );
  },
};

// Export all form elements
export const FormElements = {
  TextField: TextFieldFormElement,
  Textarea: TextareaFormElement,
  Title: TitleFormElement,
  Checkbox: CheckboxFormElement,
  Select: SelectFormElement,
  Switch: SwitchFormElement,
  Slider: SliderFormElement,
};
