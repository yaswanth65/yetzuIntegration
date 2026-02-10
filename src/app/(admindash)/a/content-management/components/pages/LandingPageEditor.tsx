"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
  ImageUpload,
  SectionHeader,
} from "../FormInputs";

const LandingPageEditor = () => {
  return (
    <div className="space-y-8">
      {/* Introduction Section */}
      <div>
        <SectionHeader title="Introduction" />
        <div className="mt-6 space-y-4">
          <TextInput label="Content" placeholder="150+ Students Enrolled" />
        </div>
      </div>

      {/* Top Message Section */}
      <div>
        <SectionHeader title="Top Message" />
        <div className="mt-6 space-y-4">
          <TextInput label="Content" placeholder="150+ Students Enrolled" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <ImageUpload
                key={index}
                label={`Image ${index}`}
                dimensions="36 × 36 (10 MB max)"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Message Section */}
      <div>
        <SectionHeader title="Main Message" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Heading"
            placeholder="Your Ultimate Academic Mentorship & Learning Ecosystem"
          />
          <TextAreaInput
            label="Sub-heading"
            placeholder="Unlock Your Potential with Personalized Mentorship, Milestone Based Assignments, and Expert Academic Support-All in One Intuitive Platform."
            rows={3}
          />
          <ImageUpload label="Image" dimensions="1013 × 835 (10 MB max)" />
        </div>
      </div>

      {/* Stats Section */}
      <div>
        <SectionHeader title="Stats" />
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <TextInput label="Numbers" placeholder="200+" />
                <TextInput label="Content" placeholder="Community Members" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row Section */}
      <div>
        <SectionHeader title="Row Section" />
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Card {index}
                </p>
                <ImageUpload
                  label="Image"
                  dimensions="1013 × 835 (10 MB max)"
                />
                <TextInput label="Date" placeholder="Lorem Ipsum" />
                <TextInput label="Time" placeholder="Lorem Ipsum" />
                <TextInput label="Heading" placeholder="Lorem Ipsum" />
                <TextAreaInput
                  label="Sub-heading"
                  placeholder="Lorem ipsum meta description for card"
                  rows={2}
                />
                <TextInput label="Price" placeholder="₹500.01" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Message 2 */}
      <div>
        <SectionHeader title="Main Message" />
        <div className="mt-6 space-y-4">
          <TextInput label="Heading" placeholder="Lorem Ipsum Dolor Sit Amet" />
          <ImageUpload label="Image" dimensions="1013 × 835 (10 MB max)" />
        </div>
      </div>

      {/* Feature Row */}
      <div>
        <SectionHeader title="Feature Row" />
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Feature {index}
                </p>
                <ImageUpload label="Icon" dimensions="20 × 20 (10 MB max)" />
                <TextInput label="Heading" placeholder="Lorem Ipsum" />
                <TextAreaInput
                  label="Sub-heading"
                  placeholder="One-on-one sessions focused on your personal academic goals..."
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPageEditor;
