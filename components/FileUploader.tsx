"use client";

import React from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FileUploadFieldProps } from "@/types";
import { FieldValues } from "react-hook-form";

const FileUploader = <T extends FieldValues>({
  control,
  name,
  label,
  acceptTypes,
  disabled,
  icon: Icon,
  placeholder,
  hint,
}: FileUploadFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="form-label">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <input
                type="file"
                accept={acceptTypes.join(",")}
                className="hidden"
                id={`file-input-${name}`}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) field.onChange(file);
                }}
                disabled={disabled}
              />
              <label
                htmlFor={`file-input-${name}`}
                className={`upload-dropzone ${field.value ? "upload-dropzone-uploaded" : ""} ${
                  disabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <Icon className="upload-dropzone-icon" />
                <p className="upload-dropzone-text">
                  {field.value instanceof File ? field.value.name : placeholder}
                </p>
                <p className="upload-dropzone-hint">{hint}</p>
              </label>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FileUploader;
