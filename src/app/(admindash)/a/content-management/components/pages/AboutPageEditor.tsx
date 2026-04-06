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
          <TextInput
            label="Main Heading"
            placeholder="Meet the Brains Behind Yetzu"
          />
          <TextInput label="Highlighted Word" placeholder="Brains" />
          <TextAreaInput
            label="Sub-heading"
            placeholder="Our approach is simple — partner with passionate people, chase excellence, and make learning unforgettable."
            rows={3}
          />
          <ButtonInput label="Button 1 Text" placeholder="Get in Touch" />
          <ButtonInput label="Button 2 Text" placeholder="Join Us" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-3">
              Hero Image Cards (6 items)
            </p>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Card {index}
                </p>
                <ImageUpload label="Photo" maxSizeMB={3} />
                <TextInput label="Name" placeholder="Dr. Yetinder" />
                <TextInput label="Role" placeholder="Expertise in subject" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Founder Story Section */}
      <div>
        <SectionHeader title="Founder Story" />
        <div className="mt-6 space-y-4">
          <TextInput label="Label" placeholder="Founder story" />
          <TextInput label="Founder Name" placeholder="Founder Name" />
          <TextAreaInput
            label="Paragraph 1"
            placeholder="Lorem ipsum is a free text to use whenever you want content for your design..."
            rows={4}
          />
          <TextAreaInput
            label="Paragraph 2"
            placeholder="Lorem ipsum is a free text to use whenever you want content for your design..."
            rows={4}
          />
          <ImageUpload
            label="Founder Photo"
            dimensions="598 × 415 (5 MB max)"
          />
          <div className="space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Achievements (6 items)
            </p>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <TextInput
                  label={`Achievement ${index}`}
                  placeholder="Achievement text"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div>
        <SectionHeader title="Team Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Meet the Minds Behind Your Success"
          />
          <TextAreaInput
            label="Section Description"
            placeholder="Our team of expert educators, doctors, and mentors bring years of clinical experience and teaching excellence."
            rows={2}
          />
          <ButtonInput label="Button Text" placeholder="View All" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-3">
              Team Members (6 items)
            </p>
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Team Member {index}
                </p>
                <ImageUpload label="Photo" maxSizeMB={2} />
                <TextInput label="Badge" placeholder="MBBS" />
                <TextInput label="Name" placeholder="John Doe" />
                <TextInput
                  label="Expertise"
                  placeholder="Expertise in Cardiology"
                />
                <TextAreaInput
                  label="Hover Description"
                  placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
                  rows={3}
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
          <TextInput label="Section Heading" placeholder="Mission & Vision" />
          <ImageUpload label="Left Image" dimensions="400 × 455 (5 MB max)" />
          <ImageUpload label="Right Image" dimensions="400 × 455 (5 MB max)" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Mission</p>
              <TextInput label="Title" placeholder="Mission" />
              <TextAreaInput
                label="Description"
                placeholder="Loren ipsum is a free text to use whenever you want content for your design..."
                rows={4}
              />
              <ImageUpload label="Icon" maxSizeMB={1} />
            </div>
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Vision</p>
              <TextInput label="Title" placeholder="Vision" />
              <TextAreaInput
                label="Description"
                placeholder="Loren ipsum is a free text to use whenever you want content for your design..."
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
          <TextInput label="Section Heading" placeholder="Initiatives" />
          <TextAreaInput
            label="Section Description"
            placeholder="Lorem ipsum is a free text to use whenever you want content for your design."
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-4">
              Initiative Cards (4 items)
            </p>
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Initiative {index}
                </p>
                <TextInput
                  label="Year / Date Label"
                  placeholder={`Year ${index}`}
                />
                <TextInput label="Title" placeholder="Lorem ipsum dolor" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Purpose & Belief Section */}
      <div>
        <SectionHeader title="Purpose & Belief Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Purpose & Belief" />
          <TextAreaInput
            label="Section Description"
            placeholder="Lorem ipsum is a free text to use whenever you want content for your design."
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Our Purpose</p>
              <ImageUpload label="Icon" maxSizeMB={1} />
              <TextInput label="Title" placeholder="Our Purpose" />
              <TextAreaInput
                label="Description"
                placeholder="Lorem ipsum is a free text to use whenever you want content for your design."
                rows={2}
              />
            </div>
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Core Belief</p>
              <ImageUpload label="Icon" maxSizeMB={1} />
              <TextInput label="Title" placeholder="Core Belief" />
              <TextAreaInput
                label="Description"
                placeholder="Lorem ipsum is a free text to use whenever you want content for your design."
                rows={2}
              />
            </div>
          </div>
          <ImageUpload
            label="Full-Width Bottom Image"
            dimensions="1440 × 400 (10 MB max)"
          />
        </div>
      </div>

      {/* Our Impact Section */}
      <div>
        <SectionHeader title="Our Impact Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Our Impact" />
          <TextAreaInput
            label="Section Description"
            placeholder="Loren ipsum is a free text to use whenever you want content for your design."
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-4">
              Impact Cards (4 placeholder items)
            </p>
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Card {index}
                </p>
                <ImageUpload label="Card Image / Content" maxSizeMB={3} />
              </div>
            ))}
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
          <TextInput
            label="Highlighted Words"
            placeholder="Leading Institutions"
          />
          <TextAreaInput
            label="Description"
            placeholder="Section description text"
            rows={2}
          />
          <ImageUpload
            label="Section Image"
            dimensions="1200 × 400 (5 MB max)"
          />
          <ButtonInput label="Button Text" placeholder="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default AboutPageEditor;
