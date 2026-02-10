"use client";

import React, { useState } from "react";
import { X, Cloud, CheckCircle } from "lucide-react";
import { ChevronDown } from "lucide-react";

interface UploadUsersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

const csvPropertyOptions = [
  "Name",
  "Email",
  "Role",
  "University Name",
  "University ID",
  "Expertise",
  "Availability",
];

const UploadUsersModal: React.FC<UploadUsersModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [csvPreview, setCsvPreview] = useState<string[][]>([]);
  const [importName, setImportName] = useState("Graphic Era Students");
  const [mappings, setMappings] = useState({
    column1: "Name",
    column2: "Email",
    column3: "Role",
  });
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCsvFile(file);
      // Parse CSV for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        const csv = event.target?.result as string;
        const lines = csv.split("\n").slice(0, 5);
        const rows = lines.map((line) => line.split(","));
        setCsvPreview(rows);
      };
      reader.readAsText(file);
      setStep(2);
    }
  };

  const handleMappingChange = (column: string, value: string) => {
    setMappings((prev) => ({
      ...prev,
      [column]: value,
    }));
    setOpenDropdown(null);
  };

  const handleConfirmMapping = () => {
    setStep(3);
  };

  const handleFinalSubmit = () => {
    onSubmit({
      csvFile,
      mappings,
      importName,
      usersToCreate: 1345,
      usersToUpdate: 45,
    });
    // Reset
    setCsvFile(null);
    setCsvPreview([]);
    setMappings({
      column1: "Name",
      column2: "Email",
      column3: "Role",
    });
    setImportName("Graphic Era Students");
    setStep(1);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-[700px] max-h-[90vh] overflow-y-auto">
        <div className="p-6 sm:p-8">
          {/* Close Button */}
          <div className="flex justify-end mb-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Step 1: Upload CSV */}
          {step === 1 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center">
                  <Cloud size={20} className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Upload Users
                  </h2>
                  <p className="text-sm text-gray-500">Upload a CSV file</p>
                </div>
              </div>

              {/* Upload Area */}
              <label className="block border-2 border-dashed border-blue-300 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 transition-colors">
                <div className="flex flex-col items-center gap-3">
                  <Cloud size={40} className="text-blue-500" />
                  <div>
                    <p className="text-gray-900 font-medium">
                      Drop a file or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      File with up to 10,000 rows works best
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </>
          )}

          {/* Step 2: Identify Properties */}
          {step === 2 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center">
                  <Cloud size={20} className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Upload Users
                  </h2>
                  <p className="text-sm text-gray-500">Identify Properties</p>
                </div>
              </div>

              {/* Mapping Section */}
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-700">
                  Columns in your file
                </p>

                <div className="space-y-3">
                  {csvPreview[0]?.map((column, index) => (
                    <div key={index} className="flex items-center gap-3">
                      {/* CSV Column */}
                      <div className="flex-1">
                        <button
                          type="button"
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-300 transition-colors text-left"
                        >
                          {column}
                        </button>
                      </div>

                      {/* Arrow */}
                      <div className="text-gray-400">→</div>

                      {/* Yetzu Property */}
                      <div className="flex-1 relative">
                        <button
                          type="button"
                          onClick={() =>
                            setOpenDropdown(
                              openDropdown === `col${index}`
                                ? null
                                : `col${index}`,
                            )
                          }
                          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm bg-white text-gray-700 hover:border-gray-300 transition-colors flex items-center justify-between"
                        >
                          <span>
                            {
                              mappings[
                                `column${index + 1}` as keyof typeof mappings
                              ]
                            }
                          </span>
                          <ChevronDown
                            size={18}
                            className={`text-gray-400 transition-transform ${
                              openDropdown === `col${index}` ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {openDropdown === `col${index}` && (
                          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                            {csvPropertyOptions.map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() =>
                                  handleMappingChange(
                                    `column${index + 1}`,
                                    option,
                                  )
                                }
                                className="w-full px-4 py-2.5 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Checkmark */}
                      <CheckCircle
                        size={20}
                        className="text-blue-600 flex-shrink-0"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3 pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setCsvFile(null);
                    setCsvPreview([]);
                    setStep(1);
                  }}
                  className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmMapping}
                  className="px-6 py-2.5 bg-[#042BFD] text-white rounded-lg text-sm font-medium hover:bg-[#021DC0] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </>
          )}

          {/* Step 3: Import Confirmation */}
          {step === 3 && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 border border-gray-200 rounded-xl flex items-center justify-center">
                  <Cloud size={20} className="text-gray-600" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Upload Users
                  </h2>
                  <p className="text-sm text-gray-500">Import Users</p>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">1345</p>
                  <p className="text-sm text-gray-600">Users will be created</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-gray-900">45</p>
                  <p className="text-sm text-gray-600">Users will be updated</p>
                </div>
              </div>

              {/* Name Your Import */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Name Your Import
                </label>
                <input
                  type="text"
                  value={importName}
                  onChange={(e) => setImportName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  className="px-6 py-2.5 bg-[#042BFD] text-white rounded-lg text-sm font-medium hover:bg-[#021DC0] transition-colors"
                >
                  Import
                </button>
              </div>

              {/* Success Message */}
              <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3">
                <CheckCircle size={20} className="text-emerald-600" />
                <p className="text-sm text-emerald-700">
                  Users Upload successfully! You can now perform activities
                  individually
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadUsersModal;
