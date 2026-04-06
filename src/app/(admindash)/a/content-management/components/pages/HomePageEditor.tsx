"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
  ImageUpload,
  SectionHeader,
  NumberInput,
  ButtonInput,
} from "../FormInputs";

const HomePageEditor = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div>
        <SectionHeader title="Hero Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Main Heading"
            placeholder="Your Ultimate Academic"
          />
          <TextInput
            label="Highlighted Heading"
            placeholder="Mentorship & Learning Ecosystem"
          />
          <TextAreaInput
            label="Description"
            placeholder="Unlock Your Potential with Personalized Mentorship, Milestone Based Assignments, and Expert Academic Support-All in One Intuitive Platform."
            rows={3}
          />
          <ButtonInput label="Primary Button Text" placeholder="Get Started" />
          <ButtonInput label="Secondary Button Text" placeholder="Watch Demo" />
          <ImageUpload
            label="Hero Illustration"
            dimensions="1013 × 835 (10 MB max)"
          />
          <TextInput
            label="Student Count Text"
            placeholder="150+ Students Enrolled"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <ImageUpload
                  label={`Avatar ${index}`}
                  dimensions="36 × 36 (1 MB max)"
                  maxSizeMB={1}
                />
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold text-gray-700">Stats (4 items)</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { num: "200+", label: "Community Members" },
              { num: "24+", label: "Courses Available" },
              { num: "30k+", label: "Assignments Completed" },
              { num: "100+", label: "Expert Mentors" },
            ].map((stat, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <NumberInput
                  label={`Stat ${index + 1} Number`}
                  placeholder={stat.num}
                />
                <TextInput
                  label={`Stat ${index + 1} Label`}
                  placeholder={stat.label}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div>
        <SectionHeader title="Video Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Lorem Ipsum Dolor Self Amet"
          />
          <TextInput
            label="YouTube Embed URL"
            placeholder="https://youtube.com/embed/..."
          />
        </div>
      </div>

      {/* Webinars Section */}
      <div>
        <SectionHeader title="Webinars Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Upcoming Webinars" />
          <TextAreaInput
            label="Section Description"
            placeholder="Join our expert-led webinars and expand your knowledge"
            rows={2}
          />
          <ButtonInput
            label="Explore All Button Text"
            placeholder="Explore All"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Webinar {index}
                </p>
                <ImageUpload label="Thumbnail" maxSizeMB={2} />
                <TextInput label="Title" placeholder="Webinar Title" />
                <TextAreaInput
                  label="Description"
                  placeholder="Webinar description..."
                  rows={2}
                />
                <TextInput label="Price" placeholder="₹500.01" />
                <TextInput label="Badge Text" placeholder="Live" />
                <TextInput label="Author Name" placeholder="Dr. John Doe" />
                <TextInput label="Date" placeholder="Feb 15, 2026" />
                <ImageUpload
                  label="Author Avatar"
                  dimensions="36 × 36 (1 MB max)"
                  maxSizeMB={1}
                />
                <ButtonInput
                  label="Primary Button Text"
                  placeholder="View details"
                />
                <ButtonInput
                  label="Secondary Button Text"
                  placeholder="Enroll now"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mentorship Section */}
      <div>
        <SectionHeader title="Mentorship Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="1:1 Mentorship & Expert Academic Guidance"
          />
          <TextAreaInput
            label="Description"
            placeholder="Experience Personalized Coaching and Strategic Academic Support"
            rows={3}
          />
          <ButtonInput label="Button Text" placeholder="Learn More" />
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Feature Cards (4 items)
            </p>
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <TextInput
                  label={`Feature ${index} Title`}
                  placeholder="Customized Mentorship Sessions"
                />
                <TextAreaInput
                  label={`Feature ${index} Description`}
                  placeholder="One-on-one sessions focused on your personal academic needs and growth"
                  rows={2}
                />
                <ImageUpload label="Icon" maxSizeMB={1} />
                <TextInput label="Background Color" placeholder="#E6EAFF" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Support Section */}
      <div>
        <SectionHeader title="Assignment Support Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Assignment Support Made Easy"
          />
          <ButtonInput label="Button Text" placeholder="Submit Now" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-2">
              Bento Cards (4 items — 2×2 grid)
            </p>
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Card {index}
                </p>
                <TextInput label="Title" placeholder="Card Title" />
                <TextAreaInput
                  label="Description"
                  placeholder="Card description..."
                  rows={2}
                />
                <ImageUpload label="Card Image" maxSizeMB={3} />
              </div>
            ))}
          </div>
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
                <TextInput label="Student Name" placeholder="Sarah Johnson" />
                <TextInput label="Student Role" placeholder="Medical Student" />
                <TextAreaInput
                  label="Testimonial Text"
                  placeholder="This platform has transformed my learning experience..."
                  rows={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Join Community Section */}
      <div>
        <SectionHeader title="Join Community Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Join Our Learning Community"
          />
          <TextInput
            label="Highlighted Words"
            placeholder="Learning Community"
          />
          <TextAreaInput
            label="Description"
            placeholder="Connect with thousands of students worldwide"
            rows={2}
          />
          <ButtonInput label="Button Text" placeholder="Get started today" />
          <ImageUpload
            label="Section Image"
            dimensions="800 × 600 (5 MB max)"
          />
        </div>
      </div>

      {/* Programs & Webinars Section */}
      <div>
        <SectionHeader title="Programs & Webinars Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Explore Our Programs"
          />
          <TextAreaInput
            label="Description"
            placeholder="Choose from a variety of courses and webinars"
            rows={2}
          />
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Cards (1 featured + 4 small = 5 total)
            </p>
            {[1, 2, 3, 4, 5].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  {index === 1 ? "Featured Card" : `Card ${index}`}
                </p>
                <ImageUpload label="Image" maxSizeMB={3} />
                <TextInput label="Date Badge" placeholder="Feb 15, 2026" />
                <TextInput label="Author Name" placeholder="Dr. John Doe" />
                <TextInput label="Time" placeholder="6:00 PM IST" />
                <TextInput label="Title" placeholder="Program Title" />
                <ImageUpload
                  label="Author Avatar"
                  dimensions="36 × 36 (1 MB max)"
                  maxSizeMB={1}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resources Section */}
      <div>
        <SectionHeader title="Resources Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Learning Resources" />
          <TextAreaInput
            label="Description"
            placeholder="Access a wealth of study materials and guides"
            rows={2}
          />
          <ButtonInput label="Button Text" placeholder="Check the Resource" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-2">
              Cards (1 featured + 3 small = 4 total)
            </p>
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  {index === 1 ? "Featured Resource" : `Resource ${index}`}
                </p>
                <ImageUpload label="Image" maxSizeMB={3} />
                <TextInput label="Title" placeholder="Resource Title" />
                <TextAreaInput
                  label="Excerpt"
                  placeholder="Resource description..."
                  rows={2}
                />
                <TextInput label="Author" placeholder="Author Name" />
                <TextInput label="Date" placeholder="Feb 5, 2026" />
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
                  placeholder="How does it work?"
                />
                <TextAreaInput
                  label={`Answer ${index}`}
                  placeholder="Our platform provides..."
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
              placeholder="Can't find the answer to your questions? Send us an email and we'll get back to you."
              rows={2}
            />
            <ButtonInput label="CTA Button Text" placeholder="Ask Here" />
          </div>
        </div>
      </div>

      {/* Trusted By Leaders Section */}
      <div>
        <SectionHeader title="Trusted By Leaders Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Trusted by Top Universities"
          />
          <TextInput label="Highlighted Words" placeholder="Top Universities" />
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

export default HomePageEditor;
