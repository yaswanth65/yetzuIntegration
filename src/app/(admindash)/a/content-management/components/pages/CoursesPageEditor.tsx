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
          <TextInput
            label="Main Heading"
            placeholder="Choose your Ideal Course"
          />
          <TextInput label="Highlighted Words" placeholder="Ideal, Course" />
          <TextAreaInput
            label="Subtitle"
            placeholder="Explore courses tailored to your level and goals."
            rows={2}
          />
          <ButtonInput label="Button 1 Text" placeholder="Medical" />
          <ButtonInput label="Button 2 Text" placeholder="Engineering" />
          <ImageUpload label="Hero Image" dimensions="600 × 450 (5 MB max)" />
        </div>
      </div>

      {/* Course Filters Section */}
      <div>
        <SectionHeader title="Course Filters Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Search Placeholder"
            placeholder="Search by title..."
          />
          <TextInput label="Price Range Label" placeholder="Price Range:" />
          <TextInput label="Min Price Placeholder" placeholder="Min" />
          <TextInput label="Max Price Placeholder" placeholder="Max" />
        </div>
      </div>

      {/* Testimonials Section */}
      <div>
        <SectionHeader title="Testimonials Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Pill Text" placeholder="Testimonials" />
          <TextInput
            label="Section Heading"
            placeholder="What Our Students Say"
          />
          <TextAreaInput
            label="Section Description"
            placeholder="Real stories from real students"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-3">
              Testimonials (5 items)
            </p>
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Testimonial {index}
                </p>
                <ImageUpload label="Student Avatar" maxSizeMB={1} />
                <TextInput label="Student Name" placeholder="Alex Morgan" />
                <TextInput label="Student Role" placeholder="Medical Student" />
                <TextAreaInput
                  label="Testimonial Text"
                  placeholder="This course transformed my understanding..."
                  rows={3}
                />
              </div>
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
            placeholder="Get certified by Yetzu"
          />
          <ButtonInput label="Button Text" placeholder="Learn More" />
          <ImageUpload label="Right Image" dimensions="600 × 400 (5 MB max)" />
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Steps (3 items)
            </p>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Step {index}
                </p>
                <ImageUpload label="Icon" maxSizeMB={1} />
                <TextInput
                  label="Title"
                  placeholder="Lorem ipsum is a good way to start your design"
                />
                <TextAreaInput
                  label="Description"
                  placeholder="Lorem ipsum is a good way to start your design..."
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
          <TextAreaInput
            label="Description"
            placeholder="Find answers to common questions"
            rows={2}
          />
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700">FAQ Items (5)</p>
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
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              &quot;Still Have Questions?&quot; CTA Box
            </p>
            <TextInput label="CTA Title" placeholder="Still have questions?" />
            <TextAreaInput
              label="CTA Description"
              placeholder="Can't find the answer to your questions? Send us an email."
              rows={2}
            />
            <ButtonInput label="CTA Button Text" placeholder="Ask Here" />
          </div>
        </div>
      </div>

      {/* Promo Cards Section */}
      <div>
        <SectionHeader title="Promo Cards Section" />
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-3">
              Promo Cards (3 items)
            </p>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Promo Card {index}{" "}
                  {index === 2 ? "(Dark Theme)" : "(Light Theme)"}
                </p>
                <ImageUpload label="Logo Image" maxSizeMB={2} />
                <TextInput
                  label="Title"
                  placeholder="Loren ipsum is free course now"
                />
                <TextAreaInput
                  label="Description"
                  placeholder="Loren Ipsum meta description is display here..."
                  rows={2}
                />
                <TextInput label="Link Text" placeholder="Learn more" />
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
            placeholder="Book Your Slot Today"
          />
          <TextInput label="Highlighted Words" placeholder="Book, Today" />
          <TextAreaInput
            label="Description"
            placeholder="Join a Thriving Community Dedicated to Academic Excellence Supported by Cutting-Edge Technology and Expert Mentorship."
            rows={3}
          />
          <ButtonInput
            label="Button Text"
            placeholder="Get Invested in Your Academic Success"
          />
        </div>
      </div>
    </div>
  );
};

export default CoursesPageEditor;
