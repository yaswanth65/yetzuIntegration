"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
  ImageUpload,
  SectionHeader,
  ButtonInput,
} from "../FormInputs";

const BlogPageEditor = () => {
  return (
    <div className="space-y-8">
      {/* Blog Hero Section */}
      <div>
        <SectionHeader title="Blog Hero Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Main Heading" placeholder="Read Our Blogs" />
          <TextInput label="Highlighted Word" placeholder="Blogs" />
          <TextAreaInput
            label="Subtitle"
            placeholder="All educational materials, course content, documentation, and tools are protected by copyright."
            rows={3}
          />
        </div>
      </div>

      {/* Search & Filters */}
      <div>
        <SectionHeader title="Search & Filters" />
        <div className="mt-6 space-y-4">
          <TextInput label="Search Placeholder" placeholder="Search by" />
          <TextInput label="Sort Option 1" placeholder="Most Recent" />
          <TextInput label="Sort Option 2" placeholder="Most Popular" />
          <TextInput label="Category Option 1" placeholder="Technology" />
          <TextInput label="Category Option 2" placeholder="Education" />
        </div>
      </div>

      {/* Featured Blog Card */}
      <div>
        <SectionHeader title="Featured Blog Card" />
        <div className="mt-6 space-y-4">
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Featured Card (1 item — displayed at top)
            </p>
            <TextInput label="Badge / Pill Text" placeholder="Our Latest" />
            <ImageUpload
              label="Featured Image"
              dimensions="600 × 400 (5 MB max)"
            />
            <TextInput
              label="Title"
              placeholder="Loren ipsum, can be used for free any where for anything."
            />
            <TextAreaInput
              label="Description"
              placeholder="Loren ipsum, can be used for free any where for anything. It is effective tool so solve our..."
              rows={2}
            />
            <TextInput label="Date" placeholder="November 23, 2025" />
          </div>
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div>
        <SectionHeader title="Blog Cards Grid" />
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-3">
              Regular Blog Cards (9 items)
            </p>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Blog Card {index}
                </p>
                <ImageUpload label="Card Image" maxSizeMB={3} />
                <TextInput label="Title" placeholder="Lorem Ipsum" />
                <TextAreaInput
                  label="Description"
                  placeholder="Loren ipsum meta description is display here..."
                  rows={2}
                />
                <TextInput label="Date" placeholder="November 23, 2025" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Your Slot Section */}
      <div>
        <SectionHeader title="Book Your Slot Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Book Your Slot Today"
          />
          <TextInput label="Highlighted Word" placeholder="Book" />
          <TextAreaInput
            label="Subtitle"
            placeholder="Join a Thriving Community Dedicated to Academic Excellence Supported by Cutting-Edge Technology and Expert"
            rows={3}
          />
          <ButtonInput
            label="Button Text"
            placeholder="Get Invested In Your Academic Success"
          />
        </div>
      </div>
    </div>
  );
};

export default BlogPageEditor;
