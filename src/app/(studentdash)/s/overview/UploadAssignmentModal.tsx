"use strict";
import { useState, useRef } from "react";
import { X, Upload, FileText, Loader2 } from "lucide-react";
import { useUploadAssignment } from "@/lib/queries/assignments/useAssignments";
import { useFormik } from "formik";
import * as Yup from "yup";

interface UploadAssignmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const UploadAssignmentSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    file: Yup.mixed()
        .required("A PDF file is required")
        .test("fileSize", "File too large (max 10MB)", (value: any) => {
            return value && value.size <= 10 * 1024 * 1024;
        })
        .test("fileType", "Only PDF files are allowed", (value: any) => {
            return value && value.type === "application/pdf";
        }),
});

export default function UploadAssignmentModal({ isOpen, onClose }: UploadAssignmentModalProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const { mutate: uploadAssignment, isPending } = useUploadAssignment();

    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            file: null as File | null,
        },
        validationSchema: UploadAssignmentSchema,
        onSubmit: (values) => {
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            if (values.file) {
                formData.append("documentFile", values.file);
            }

            uploadAssignment(formData, {
                onSuccess: () => {
                    formik.resetForm();
                    if (fileInputRef.current) fileInputRef.current.value = "";
                    onClose();
                },
            });
        },
    });

    if (!isOpen) return null;

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.currentTarget.files && event.currentTarget.files[0]) {
            formik.setFieldValue("file", event.currentTarget.files[0]);
        }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            formik.setFieldValue("file", event.dataTransfer.files[0]);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-[#021165]">Upload Assignment</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={24} />
                    </button>
                </div>

                <form onSubmit={formik.handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            id="title"
                            type="text"
                            {...formik.getFieldProps("title")}
                            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042BFD] ${formik.touched.title && formik.errors.title ? "border-red-500" : "border-gray-200"
                                }`}
                            placeholder="Enter assignment title"
                        />
                        {formik.touched.title && formik.errors.title && (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.title}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            {...formik.getFieldProps("description")}
                            className={`w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#042BFD] min-h-[100px] resize-none ${formik.touched.description && formik.errors.description
                                    ? "border-red-500"
                                    : "border-gray-200"
                                }`}
                            placeholder="Describe your assignment..."
                        />
                        {formik.touched.description && formik.errors.description && (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.description}</div>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Assignment File (PDF)</label>
                        <div
                            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-colors ${formik.touched.file && formik.errors.file
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-300 hover:border-[#042BFD] hover:bg-blue-50"
                                }`}
                            onDragOver={handleDragOver}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".pdf"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                            {formik.values.file ? (
                                <div className="flex flex-col items-center text-[#042BFD]">
                                    <FileText size={32} className="mb-2" />
                                    <p className="text-sm font-medium truncate max-w-[200px]">{formik.values.file.name}</p>
                                    <p className="text-xs text-gray-500">
                                        {(formik.values.file.size / (1024 * 1024)).toFixed(2)} MB
                                    </p>
                                </div>
                            ) : (
                                <div className="flex flex-col items-center text-gray-500">
                                    <Upload size={32} className="mb-2" />
                                    <p className="text-sm font-medium">Click or Drag & Drop to upload</p>
                                    <p className="text-xs">PDF up to 10MB</p>
                                </div>
                            )}
                        </div>
                        {formik.touched.file && formik.errors.file && (
                            <div className="text-red-500 text-xs mt-1">{formik.errors.file as string}</div>
                        )}
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#042BFD] hover:bg-[#0325D7] text-white font-medium py-2.5 rounded-lg text-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isPending ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                "Submit Assignment"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
