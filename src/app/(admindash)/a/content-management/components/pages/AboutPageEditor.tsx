"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
  ImageUpload,
  SectionHeader,
  ButtonInput,
} from "../FormInputs";

const AboutPageEditor = () => {
  return (
    <div className="space-y-8">
      {/* About Hero Section */}
      <div>
        <SectionHeader title="About Hero Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Main Heading" placeholder="About Yetzu" />
          <TextAreaInput
            label="Description"
            placeholder="Empowering students with personalized mentorship and academic excellence"
            rows={3}
          />
          <ImageUpload label="Hero Image" dimensions="1920 × 600 (10 MB max)" />
        </div>
      </div>

      {/* Founder Story Section */}
      <div>
        <SectionHeader title="Founder Story" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="The Story Behind Yetzu"
          />
          <TextAreaInput
            label="Founder Story"
            placeholder="Our founder's journey and vision..."
            rows={5}
          />
          <ImageUpload
            label="Founder Photo"
            dimensions="400 × 400 (5 MB max)"
          />
          <TextInput label="Founder Name" placeholder="Dr. John Doe" />
          <TextInput label="Founder Title" placeholder="Founder & CEO" />
        </div>
      </div>

      {/* Team Section */}
      <div>
        <SectionHeader title="Team Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Meet Our Team" />
          <TextAreaInput
            label="Section Description"
            placeholder="Passionate educators and mentors dedicated to your success"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Team Member {index}
                </p>
                <ImageUpload label="Photo" maxSizeMB={2} />
                <TextInput label="Name" placeholder="Jane Smith" />
                <TextInput label="Role" placeholder="Senior Mentor" />
                <TextAreaInput
                  label="Bio"
                  placeholder="Brief biography..."
                  rows={2}
                />
                <TextInput
                  label="LinkedIn URL"
                  placeholder="https://linkedin.com/in/..."
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div>
        <SectionHeader title="Mission & Vision Section" />
        <div className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Mission</p>
              <TextInput label="Heading" placeholder="Our Mission" />
              <TextAreaInput
                label="Description"
                placeholder="To provide accessible, personalized education..."
                rows={4}
              />
              <ImageUpload label="Icon" maxSizeMB={1} />
            </div>
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Vision</p>
              <TextInput label="Heading" placeholder="Our Vision" />
              <TextAreaInput
                label="Description"
                placeholder="To become the world's leading platform..."
                rows={4}
              />
              <ImageUpload label="Icon" maxSizeMB={1} />
            </div>
          </div>
        </div>
      </div>

      {/* Initiatives Section */}
      <div>
        <SectionHeader title="Initiatives Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Our Initiatives" />
          <TextAreaInput
            label="Section Description"
            placeholder="Programs and initiatives that drive our mission"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Initiative {index}
                </p>
                <ImageUpload label="Image" maxSizeMB={2} />
                <TextInput label="Title" placeholder="Scholarship Program" />
                <TextAreaInput
                  label="Description"
                  placeholder="Supporting underprivileged students..."
                  rows={3}
                />
                <ButtonInput label="Button Text" placeholder="Learn More" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purpose & Belief Section */}
      <div>
        <SectionHeader title="Purpose & Belief Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="What We Believe" />
          <div className="space-y-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <TextInput
                  label={`Belief ${index} Title`}
                  placeholder="Education for All"
                />
                <TextAreaInput
                  label={`Belief ${index} Description`}
                  placeholder="We believe education should be accessible to everyone..."
                  rows={2}
                />
                <ImageUpload label="Icon" maxSizeMB={1} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Impact Section */}
      <div>
        <SectionHeader title="Our Impact Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Our Impact in Numbers"
          />
          <TextAreaInput
            label="Section Description"
            placeholder="See how we're making a difference"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["Students Helped", "Countries", "Success Rate", "Mentors"].map(
              (label) => (
                <div
                  key={label}
                  className="border border-gray-200 rounded-lg p-4 space-y-3"
                >
                  <TextInput label="Number" placeholder="10,000+" />
                  <TextInput label="Label" placeholder={label} />
                  <TextAreaInput
                    label="Description"
                    placeholder="Additional context..."
                    rows={2}
                  />
                </div>
              ),
            )}
          </div>
        </div>
      </div>

      {/* Trusted By Leaders */}
      <div>
        <SectionHeader title="Trusted By Leaders" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Partnered with Leading Institutions"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <ImageUpload label={`Partner Logo ${index}`} maxSizeMB={1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPageEditor;
