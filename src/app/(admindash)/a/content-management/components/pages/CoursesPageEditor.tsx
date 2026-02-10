"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
  ImageUpload,
  SectionHeader,
  ButtonInput,
} from "../FormInputs";

const CoursesPageEditor = () => {
  return (
    <div className="space-y-8">
      {/* Courses Hero Section */}
      <div>
        <SectionHeader title="Courses Hero Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Main Heading" placeholder="Explore Our Courses" />
          <TextAreaInput
            label="Description"
            placeholder="Comprehensive courses designed to help you excel in your academic journey"
            rows={3}
          />
          <ImageUpload
            label="Hero Background Image"
            dimensions="1920 × 600 (10 MB max)"
          />
          <ButtonInput label="CTA Button Text" placeholder="Browse Courses" />
        </div>
      </div>

      {/* Course Filters Section */}
      <div>
        <SectionHeader title="Course Filters Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Search Placeholder"
            placeholder="Search courses..."
          />
          <TextInput label="Filter Label" placeholder="Filter by:" />
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Filter Categories
            </p>
            {["Category", "Level", "Duration", "Price Range"].map((filter) => (
              <TextInput
                key={filter}
                label={filter}
                placeholder={`Enter ${filter.toLowerCase()}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Certification Section */}
      <div>
        <SectionHeader title="Certification Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Get Certified Upon Completion"
          />
          <TextAreaInput
            label="Description"
            placeholder="Earn industry-recognized certificates to boost your career"
            rows={3}
          />
          <ImageUpload
            label="Certificate Sample Image"
            dimensions="800 × 600 (5 MB max)"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Benefit {index}
                </p>
                <ImageUpload label="Icon" maxSizeMB={1} />
                <TextInput label="Title" placeholder="Verified Certificate" />
                <TextAreaInput
                  label="Description"
                  placeholder="Share on LinkedIn and enhance your profile"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div>
        <SectionHeader title="FAQ Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Frequently Asked Questions"
          />
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <TextInput
                  label={`Question ${index}`}
                  placeholder="How long is each course?"
                />
                <TextAreaInput
                  label={`Answer ${index}`}
                  placeholder="Course duration varies from 4 to 12 weeks..."
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div>
        <SectionHeader title="Testimonials Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Student Success Stories"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Testimonial {index}
                </p>
                <ImageUpload label="Student Photo" maxSizeMB={1} />
                <TextInput label="Student Name" placeholder="Alex Morgan" />
                <TextInput
                  label="Course Taken"
                  placeholder="Advanced Biology"
                />
                <TextAreaInput
                  label="Testimonial"
                  placeholder="This course transformed my understanding..."
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Promo Cards Section */}
      <div>
        <SectionHeader title="Promo Cards Section" />
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Promo Card {index}
                </p>
                <ImageUpload label="Card Image" maxSizeMB={3} />
                <TextInput label="Heading" placeholder="Special Offer" />
                <TextAreaInput
                  label="Description"
                  placeholder="Get 20% off on all courses..."
                  rows={2}
                />
                <ButtonInput label="Button Text" placeholder="Claim Offer" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Book Slot Section */}
      <div>
        <SectionHeader title="Book Slot Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Book a Free Consultation"
          />
          <TextAreaInput
            label="Description"
            placeholder="Not sure which course is right for you? Book a free session with our counselors"
            rows={3}
          />
          <ButtonInput label="Button Text" placeholder="Book Now" />
          <ImageUpload
            label="Section Image"
            dimensions="800 × 400 (5 MB max)"
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPageEditor;
