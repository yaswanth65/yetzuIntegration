"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
  ImageUpload,
  SectionHeader,
  ButtonInput,
} from "../FormInputs";

const AssignmentsPageEditor = () => {
  return (
    <div className="space-y-8">
      {/* Meet The Brains Section */}
      <div>
        <SectionHeader title="Meet The Brains Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Main Heading"
            placeholder="Meet the Brains Behind Your Success"
          />
          <TextAreaInput
            label="Description"
            placeholder="Our expert team of academic professionals is here to guide you through every challenge"
            rows={3}
          />
          <ImageUpload label="Hero Image" dimensions="1920 × 600 (10 MB max)" />
          <ButtonInput label="CTA Button Text" placeholder="Get Started" />
        </div>
      </div>

      {/* Assignment Workflow With Steps Section */}
      <div>
        <SectionHeader title="Assignment Workflow Steps" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="How It Works" />
          <TextAreaInput
            label="Section Description"
            placeholder="Our simple 4-step process to get your assignments done"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Step {index}
                </p>
                <ImageUpload label="Step Icon" maxSizeMB={1} />
                <TextInput label="Step Number" placeholder={`0${index}`} />
                <TextInput
                  label="Step Title"
                  placeholder="Submit Your Assignment"
                />
                <TextAreaInput
                  label="Step Description"
                  placeholder="Upload your assignment details and requirements"
                  rows={2}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Workflow Section */}
      <div>
        <SectionHeader title="Assignment Workflow Details" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Comprehensive Assignment Support"
          />
          <TextAreaInput
            label="Description"
            placeholder="From initial consultation to final submission, we're with you every step"
            rows={3}
          />
          <div className="space-y-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Feature {index}
                </p>
                <ImageUpload label="Feature Image" maxSizeMB={3} />
                <TextInput
                  label="Feature Title"
                  placeholder="Expert Guidance"
                />
                <TextAreaInput
                  label="Feature Description"
                  placeholder="Get personalized help from subject matter experts"
                  rows={3}
                />
                <ButtonInput label="Button Text" placeholder="Learn More" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div>
        <SectionHeader title="Pricing Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Affordable Pricing Plans"
          />
          <TextAreaInput
            label="Section Description"
            placeholder="Choose a plan that works for you"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Basic", "Standard", "Premium"].map((plan) => (
              <div
                key={plan}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  {plan} Plan
                </p>
                <TextInput label="Plan Name" placeholder={plan} />
                <TextInput label="Price" placeholder="₹999" />
                <TextInput
                  label="Price Duration"
                  placeholder="per assignment"
                />
                <TextAreaInput
                  label="Features (comma separated)"
                  placeholder="Feature 1, Feature 2, Feature 3"
                  rows={3}
                />
                <ButtonInput label="Button Text" placeholder="Choose Plan" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Coverage Section */}
      <div>
        <SectionHeader title="Subject Coverage" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Subjects We Cover" />
          <TextAreaInput
            label="Description"
            placeholder="Expert assistance across all major subjects and disciplines"
            rows={2}
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <ImageUpload label={`Subject ${index} Icon`} maxSizeMB={1} />
                <TextInput label="Subject Name" placeholder="Mathematics" />
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
                  placeholder="How quickly can I get help?"
                />
                <TextAreaInput
                  label={`Answer ${index}`}
                  placeholder="We typically respond within 24 hours..."
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div>
        <SectionHeader title="Success Stories" />
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
                <TextInput label="Student Name" placeholder="Mike Johnson" />
                <TextInput label="Grade/Achievement" placeholder="Scored A+" />
                <TextAreaInput
                  label="Testimonial"
                  placeholder="The assignment help was incredible..."
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

export default AssignmentsPageEditor;
