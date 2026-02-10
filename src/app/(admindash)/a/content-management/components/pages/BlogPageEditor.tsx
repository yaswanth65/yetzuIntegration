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
          <TextInput label="Main Heading" placeholder="Our Blog" />
          <TextAreaInput
            label="Description"
            placeholder="Insights, tips, and stories from the world of education"
            rows={3}
          />
          <ImageUpload
            label="Hero Background Image"
            dimensions="1920 × 600 (10 MB max)"
          />
        </div>
      </div>

      {/* Featured Article Section */}
      <div>
        <SectionHeader title="Featured Article" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Featured Story" />
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <ImageUpload
              label="Featured Image"
              dimensions="1200 × 600 (10 MB max)"
            />
            <TextInput
              label="Article Title"
              placeholder="How to Excel in Medical Studies"
            />
            <TextInput label="Author Name" placeholder="Dr. Jane Smith" />
            <TextInput label="Date" placeholder="February 9, 2026" />
            <TextInput label="Read Time" placeholder="5 min read" />
            <TextAreaInput
              label="Excerpt"
              placeholder="A comprehensive guide to succeeding in medical school..."
              rows={3}
            />
            <TextInput label="Category" placeholder="Study Tips" />
            <ButtonInput label="Button Text" placeholder="Read More" />
          </div>
        </div>
      </div>

      {/* Blog Categories Section */}
      <div>
        <SectionHeader title="Blog Categories" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Browse by Category" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <ImageUpload label={`Category ${index} Icon`} maxSizeMB={1} />
                <TextInput label="Category Name" placeholder="Study Tips" />
                <TextInput label="Article Count" placeholder="24 articles" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Blog Cards Grid Section */}
      <div>
        <SectionHeader title="Blog Articles Grid" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Latest Articles" />
          <TextAreaInput
            label="Section Description"
            placeholder="Stay updated with our latest insights and tips"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Article {index}
                </p>
                <ImageUpload label="Article Image" maxSizeMB={3} />
                <TextInput
                  label="Title"
                  placeholder="10 Tips for Better Study Habits"
                />
                <TextInput label="Author" placeholder="Sarah Williams" />
                <TextInput label="Date" placeholder="Feb 5, 2026" />
                <TextInput label="Read Time" placeholder="3 min read" />
                <TextAreaInput
                  label="Excerpt"
                  placeholder="Discover effective study techniques that work..."
                  rows={2}
                />
                <TextInput label="Category" placeholder="Study Tips" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Signup Section */}
      <div>
        <SectionHeader title="Newsletter Signup" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Subscribe to Our Newsletter"
          />
          <TextAreaInput
            label="Description"
            placeholder="Get the latest articles and updates delivered to your inbox"
            rows={2}
          />
          <TextInput label="Email Placeholder" placeholder="Enter your email" />
          <ButtonInput label="Button Text" placeholder="Subscribe" />
          <ImageUpload
            label="Newsletter Image"
            dimensions="800 × 400 (5 MB max)"
          />
        </div>
      </div>

      {/* Popular Tags Section */}
      <div>
        <SectionHeader title="Popular Tags" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Popular Topics" />
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-3"
              >
                <TextInput label={`Tag ${index}`} placeholder="Study Tips" />
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
            placeholder="Ready to Start Your Journey?"
          />
          <TextAreaInput
            label="Description"
            placeholder="Book a free consultation session with our experts"
            rows={3}
          />
          <ButtonInput label="Button Text" placeholder="Book a Slot" />
          <ImageUpload
            label="Background Image"
            dimensions="1920 × 400 (10 MB max)"
          />
        </div>
      </div>

      {/* Related Articles Section */}
      <div>
        <SectionHeader title="Related Articles" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="You Might Also Like"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Related Article {index}
                </p>
                <ImageUpload label="Image" maxSizeMB={2} />
                <TextInput label="Title" placeholder="Related article title" />
                <TextInput label="Category" placeholder="Category" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPageEditor;
