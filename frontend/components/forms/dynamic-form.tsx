"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowRight, Loader2 } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { sendEnquiryEmail } from "@/app/actions/contact/actions";
import { toast } from "sonner";
import { trackMetaEvent } from "@/lib/meta-pixel";
import { useParams } from "next/navigation";
import { cleanSanityString } from "@/lib/utils";
import type { FormSheet, FormConfig } from "@/sanity.types";
import { PhoneInput } from "@/components/ui/phone-input";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormSettings {
  selectedFormSheet?: FormSheet | null;
  selectedFormConfig?: FormConfig | null;
  uniqKey?: string;
}

interface FormProps {
  formSettings: FormSettings;
  bgcolor?: string | undefined;
}

const DynamicForm = ({ formSettings, bgcolor }: FormProps) => {
  const params = useParams();
  const slug = params?.slug;

  const { selectedFormSheet, selectedFormConfig, uniqKey } = formSettings;
  const fields = selectedFormSheet?.fields || [];

  // Helper to generate consistent field names
  const getFieldName = (field: NonNullable<FormSheet["fields"]>[number], index: number) => {
    const cleanLabel = cleanSanityString(field.label);
    const cleanPlaceholder = cleanSanityString(field.placeholder);
    return (
      cleanLabel?.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") ||
      cleanPlaceholder?.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "") ||
      `field_${index}`
    );
  };

  // Generate Zod schema dynamically
  const formSchema = useMemo(() => {
    const schemaMap: Record<string, any> = {};

    fields.forEach((field, index) => {
      const fieldName = getFieldName(field, index);
      let validator;

      switch (field.fieldType) {
        case "email": {
          let v: z.ZodType<any> = z.string();
          if (field.required) {
            v = (v as z.ZodString).min(1, "Required").email("Invalid email address");
          } else {
            // Optional email: strictly allow undefined or empty string, transforming empty to undefined if needed, or just standard string
            // Assuming empty string is allowed for optional
            v = v.optional().or(z.literal(""));
          }
          validator = v;
          break;
        }
        case "checkbox": {
          let v = z.boolean().default(false);
          if (field.required) {
            v = v.refine((val) => val === true, {
              message: "Required",
            });
          }
          validator = v;
          break;
        }
        case "checkboxGroup": {
          let v = z.array(z.string());
          if (field.required) {
            v = v.min(1, "Select at least one option");
          }
          validator = v.default([]);
          break;
        }
        default: {
          // text, textarea, tel, radio, dropdown, number, password
          let v: z.ZodType<any> = z.string();
          if (field.required) {
            v = (v as z.ZodString).min(1, "Required");
          } else {
            v = v.optional().or(z.literal(""));
          }
          validator = v;
          break;
        }
      }
      schemaMap[fieldName] = validator;
    });

    return z.object(schemaMap);
  }, [fields]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: fields.reduce((acc, field, index) => {
      const fieldName = getFieldName(field, index);
      if (field.fieldType === "checkboxGroup") acc[fieldName] = [];
      else if (field.fieldType === "checkbox") acc[fieldName] = false;
      else acc[fieldName] = "";
      return acc;
    }, {} as Record<string, any>),
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    // Cast values to expected structure for sendEnquiryEmail
    const data = values as Record<string, string | boolean | string[] | File[] | undefined>;

    // Find email field for Reply-To
    let replyTo: string | undefined;
    const emailField = fields.find((f) => f.fieldType === "email");
    if (emailField) {
      const emailFieldName = getFieldName(emailField, fields.indexOf(emailField));
      const emailVal = data[emailFieldName];
      if (typeof emailVal === "string") {
        replyTo = emailVal;
      }
    }

    const sendEmail = await sendEnquiryEmail({
      subject: selectedFormConfig?.formSubject || "Enquiry",
      data,
      toEmail: selectedFormConfig?.toEmail || "[EMAIL_ADDRESS]",
      ccEmails: selectedFormConfig?.ccEmails,
      bccEmails: selectedFormConfig?.bccEmails,
      fromName: selectedFormConfig?.fromName || "Website Enquiry",
      replyTo,
    });

    if (sendEmail) {
      if (slug && slug[0] === "maintenance-request") {
        trackMetaEvent("Contact", {
          content_name: "Service Request",
          content_category: "General",
        });
      }
      toast.success(
        selectedFormSheet?.successMessage ??
        "Thank you for your enquiry. We'll be in touch soon!"
      );
      form.reset();
    }
  };

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={`w-full flex flex-col ${bgcolor === "primary" || bgcolor === "secondary"
            ? "text-primary-foreground"
            : "text-black"
            }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {fields.map((field, index) => {
              const {
                label,
                fieldType,
                placeholder = "",
                required,
                disabled,
                options,
                fieldWidth = "full",
                allowedCountries,
              } = field;

              if (
                fieldType &&
                ["dropdown", "radio", "checkboxGroup"].includes(fieldType) &&
                !options?.length
              )
                return null;

              const cleanLabel = cleanSanityString(label) || null;
              const cleanPlaceholder = cleanSanityString(placeholder);
              const fieldName = getFieldName(field, index);
              const fieldId = `${fieldName}_${uniqKey}_${index}`;
              const fieldClass = `field-wrp flex flex-col justify-start ${cleanSanityString(fieldWidth) === "full"
                ? "col-span-1 md:col-span-2"
                : "col-span-1"
                }`;

              if (
                fieldType === "text" ||
                fieldType === "email" ||
                fieldType === "number" ||
                fieldType === "password"
              ) {
                const textPlaceholder =
                  cleanSanityString(placeholder) || `Enter ${label}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className="label">
                              {cleanLabel}
                              {required && "*"}
                            </FormLabel>
                          )}
                          <FormControl>
                            <Input
                              {...formField}
                              type={fieldType}
                              id={fieldId}
                              placeholder={`${textPlaceholder}${required ? "*" : ""}`}
                              disabled={disabled}
                              value={formField.value?.toString() ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "tel") {
                const telPlaceholder =
                  cleanSanityString(placeholder) || `Enter phone number`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className="label">
                              {cleanLabel}
                              {required && "*"}
                            </FormLabel>
                          )}
                          <FormControl>
                            <PhoneInput
                              id={fieldId}
                              name={fieldName}
                              value={formField.value?.toString() ?? ""}
                              placeholder={`${telPlaceholder}${required ? "*" : ""}`}
                              required={required}
                              disabled={disabled}
                              allowedCountries={allowedCountries as string[] | undefined}
                              onChange={(_phone, _country, fullValue) => {
                                formField.onChange(fullValue);
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "textarea") {
                const textareaPlaceholder =
                  cleanSanityString(placeholder) || `Enter ${label}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className="label">
                              {cleanLabel}
                              {required && "*"}
                            </FormLabel>
                          )}
                          <FormControl>
                            <Textarea
                              {...formField}
                              id={fieldId}
                              placeholder={`${textareaPlaceholder}${required ? "*" : ""}`}
                              disabled={disabled}
                              value={formField.value?.toString() ?? ""}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "dropdown") {
                const dropdownPlaceholder =
                  cleanSanityString(placeholder) ||
                  `Select ${cleanSanityString(label)}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem>
                          {cleanLabel && (
                            <FormLabel className="label">
                              {cleanLabel}
                              {required && "*"}
                            </FormLabel>
                          )}
                          <Select
                            onValueChange={formField.onChange}
                            defaultValue={formField.value as string}
                            disabled={disabled}
                          >
                            <FormControl>
                              <SelectTrigger
                                id={fieldId}
                                className={`${bgcolor === "primary" || bgcolor === "secondary"
                                  ? "border-primary-foreground text-primary-foreground"
                                  : "border-black text-black"
                                  }`}
                              >
                                <SelectValue
                                  placeholder={`${dropdownPlaceholder}${required ? "*" : ""
                                    }`}
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {options?.map((option) => (
                                <SelectItem
                                  key={option}
                                  value={cleanSanityString(option)}
                                >
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "checkbox") {
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem className="flex items-center space-x-2 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={formField.value as boolean}
                              onCheckedChange={formField.onChange}
                              disabled={disabled}
                              id={fieldId}
                            />
                          </FormControl>
                          <FormLabel
                            htmlFor={fieldId}
                            className="label font-normal m-0"
                          >
                            {cleanLabel}
                            {required && "*"}
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "checkboxGroup") {
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={() => (
                        <FormItem>
                          <div className="mb-4">
                            <FormLabel className="text-base">
                              {cleanLabel}
                              {required && "*"}
                            </FormLabel>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {options?.map((option, optIndex) => {
                              const optionValue = cleanSanityString(option);
                              const checkboxId = `${fieldName}_${uniqKey}_${optIndex}`;
                              return (
                                <FormField
                                  key={checkboxId}
                                  control={form.control}
                                  name={fieldName}
                                  render={({ field: formField }) => {
                                    return (
                                      <FormItem
                                        key={checkboxId}
                                        className="flex items-center space-x-2 space-y-0"
                                      >
                                        <FormControl>
                                          <Checkbox
                                            checked={(
                                              formField.value as string[]
                                            )?.includes(optionValue)}
                                            onCheckedChange={(checked) => {
                                              const currentValue = (formField.value as string[]) || [];
                                              return checked
                                                ? formField.onChange([
                                                  ...currentValue,
                                                  optionValue,
                                                ])
                                                : formField.onChange(
                                                  currentValue.filter(
                                                    (value: string) =>
                                                      value !== optionValue
                                                  )
                                                );
                                            }}
                                            disabled={disabled}
                                            id={checkboxId}
                                          />
                                        </FormControl>
                                        <FormLabel
                                          htmlFor={checkboxId}
                                          className="font-normal"
                                        >
                                          {option}
                                        </FormLabel>
                                      </FormItem>
                                    );
                                  }}
                                />
                              );
                            })}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              if (fieldType === "radio") {
                const radioGroupName = `${fieldName}_${uniqKey ?? "form"}`;
                return (
                  <div className={fieldClass} key={index}>
                    <FormField
                      control={form.control}
                      name={fieldName}
                      render={({ field: formField }) => (
                        <FormItem className="space-y-3">
                          <FormLabel>
                            {cleanLabel}
                            {required && "*"}
                          </FormLabel>
                          <FormControl>
                            <RadioGroup
                              onValueChange={formField.onChange}
                              defaultValue={formField.value as string}
                              className="flex flex-col gap-3"
                              disabled={disabled}
                              name={radioGroupName}
                            >
                              {options?.map((option, optIndex) => {
                                const optionValue = cleanSanityString(option);
                                const radioId = `${fieldName}_${uniqKey}_${optIndex}`;
                                return (
                                  <FormItem
                                    key={radioId}
                                    className="flex items-center space-x-2 space-y-0"
                                  >
                                    <FormControl>
                                      <RadioGroupItem
                                        value={optionValue}
                                        id={radioId}
                                      />
                                    </FormControl>
                                    <FormLabel
                                      htmlFor={radioId}
                                      className="font-normal"
                                    >
                                      {option}
                                    </FormLabel>
                                  </FormItem>
                                );
                              })}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                );
              }

              return null;
            })}
          </div>

          <div className="form-footer mt-8 flex justify-start">
            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full sm:w-auto"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  {selectedFormSheet?.submitButtonText || "Submit"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default DynamicForm;
