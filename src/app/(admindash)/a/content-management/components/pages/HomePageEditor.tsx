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
            label="Sub Heading"
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
            label="Hero Background Image"
            dimensions="1920 × 1080 (10 MB max)"
          />
          <ImageUpload
            label="Hero Illustration"
            dimensions="800 × 600 (5 MB max)"
          />
        </div>
      </div>

      {/* Video Section */}
      <div>
        <SectionHeader title="Video Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="See How It Works" />
          <TextAreaInput
            label="Description"
            placeholder="Watch this short video to understand how our platform works"
            rows={2}
          />
          <TextInput label="Video URL" placeholder="https://youtube.com/..." />
          <ImageUpload
            label="Video Thumbnail"
            dimensions="1280 × 720 (5 MB max)"
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
            label="View All Button Text"
            placeholder="View All Webinars"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Webinar {index}
                </p>
                <ImageUpload label="Thumbnail" maxSizeMB={2} />
                <TextInput label="Title" placeholder="Webinar Title" />
                <TextInput label="Speaker" placeholder="Dr. John Doe" />
                <TextInput label="Date" placeholder="Feb 15, 2026" />
                <TextInput label="Time" placeholder="6:00 PM IST" />
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
          <ButtonInput label="Button Text" placeholder="Book a Session" />
          <ImageUpload
            label="Section Image"
            dimensions="800 × 600 (5 MB max)"
          />
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Features (3 items)
            </p>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <TextInput
                  label={`Feature ${index} Title`}
                  placeholder="Personalized Guidance"
                />
                <TextAreaInput
                  label={`Feature ${index} Description`}
                  placeholder="Get one-on-one support tailored to your goals"
                  rows={2}
                />
                <ImageUpload label="Icon" maxSizeMB={1} />
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
          <TextAreaInput
            label="Description"
            placeholder="Get help with your assignments from expert tutors"
            rows={2}
          />
          <ButtonInput label="Button Text" placeholder="Get Help Now" />
          <ImageUpload
            label="Section Image"
            dimensions="800 × 600 (5 MB max)"
          />
        </div>
      </div>

      {/* Testimonials Section */}
      <div>
        <SectionHeader title="Testimonials Section" />
        <div className="mt-6 space-y-4">
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
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Testimonial {index}
                </p>
                <ImageUpload label="Student Photo" maxSizeMB={1} />
                <TextInput label="Student Name" placeholder="Sarah Johnson" />
                <TextInput label="Student Role" placeholder="Medical Student" />
                <TextAreaInput
                  label="Testimonial Text"
                  placeholder="This platform has transformed my learning experience..."
                  rows={3}
                />
                <NumberInput label="Rating (1-5)" placeholder="5" />
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
          <TextAreaInput
            label="Description"
            placeholder="Connect with thousands of students worldwide"
            rows={2}
          />
          <ButtonInput label="Button Text" placeholder="Join Now" />
          <ImageUpload
            label="Background Image"
            dimensions="1920 × 400 (5 MB max)"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Students", "Mentors", "Countries"].map((label) => (
              <div
                key={label}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <NumberInput label={`${label} Count`} placeholder="10,000+" />
                <TextInput label={`${label} Label`} placeholder={label} />
              </div>
            ))}
          </div>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Resource {index}
                </p>
                <ImageUpload label="Icon" maxSizeMB={1} />
                <TextInput label="Title" placeholder="Study Guides" />
                <TextAreaInput
                  label="Description"
                  placeholder="Comprehensive guides for all subjects"
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4"
              >
                <ImageUpload label={`Logo ${index}`} maxSizeMB={1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePageEditor;
