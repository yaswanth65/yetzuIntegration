"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
  ImageUpload,
  SectionHeader,
  ButtonInput,
} from "../FormInputs";

const ContactPageEditor = () => {
  return (
    <div className="space-y-8">
      {/* Contact Form Section */}
      <div>
        <SectionHeader title="Contact Form Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Get in Touch" />
          <TextAreaInput
            label="Section Description"
            placeholder="We'd love to hear from you. Send us a message and we'll respond as soon as possible."
            rows={3}
          />
          <div className="space-y-3 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700">Form Fields</p>
            <TextInput label="Name Field Placeholder" placeholder="Your Name" />
            <TextInput
              label="Email Field Placeholder"
              placeholder="Your Email"
            />
            <TextInput
              label="Phone Field Placeholder"
              placeholder="Your Phone"
            />
            <TextInput
              label="Subject Field Placeholder"
              placeholder="Subject"
            />
            <TextInput
              label="Message Field Placeholder"
              placeholder="Your Message"
            />
            <ButtonInput
              label="Submit Button Text"
              placeholder="Send Message"
            />
          </div>
          <ImageUpload
            label="Form Background Image"
            dimensions="800 × 1000 (5 MB max)"
          />
        </div>
      </div>

      {/* Contact Information Section */}
      <div>
        <SectionHeader title="Contact Information" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Contact Details" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Email</p>
              <ImageUpload label="Email Icon" maxSizeMB={1} />
              <TextInput
                label="Email Address"
                placeholder="support@yetzu.com"
              />
              <TextInput label="Email Label" placeholder="Email Us" />
            </div>
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Phone</p>
              <ImageUpload label="Phone Icon" maxSizeMB={1} />
              <TextInput label="Phone Number" placeholder="+91 98765 43210" />
              <TextInput label="Phone Label" placeholder="Call Us" />
            </div>
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <p className="text-sm font-semibold text-gray-700">Address</p>
              <ImageUpload label="Location Icon" maxSizeMB={1} />
              <TextAreaInput
                label="Address"
                placeholder="123 Education Street, Learning City, 110001"
                rows={2}
              />
              <TextInput label="Address Label" placeholder="Visit Us" />
            </div>
          </div>
        </div>
      </div>

      {/* Our Offices Section */}
      <div>
        <SectionHeader title="Our Offices Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Our Global Presence"
          />
          <TextAreaInput
            label="Section Description"
            placeholder="Find us in multiple locations around the world"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Office {index}
                </p>
                <ImageUpload label="Office Image" maxSizeMB={3} />
                <TextInput
                  label="City/Country"
                  placeholder="New Delhi, India"
                />
                <TextAreaInput
                  label="Address"
                  placeholder="Complete office address"
                  rows={2}
                />
                <TextInput label="Phone" placeholder="+91 98765 43210" />
                <TextInput label="Email" placeholder="delhi@yetzu.com" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div>
        <SectionHeader title="Map Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Find Us on Map" />
          <TextInput
            label="Google Maps Embed URL"
            placeholder="https://maps.google.com/..."
          />
          <ImageUpload
            label="Map Preview Image"
            dimensions="1200 × 600 (5 MB max)"
          />
        </div>
      </div>

      {/* Resource Cards Section */}
      <div>
        <SectionHeader title="Resource Cards Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Helpful Resources" />
          <TextAreaInput
            label="Section Description"
            placeholder="Explore our resources to learn more"
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Resource Card {index}
                </p>
                <ImageUpload label="Card Image" maxSizeMB={2} />
                <TextInput label="Title" placeholder="Help Center" />
                <TextAreaInput
                  label="Description"
                  placeholder="Find answers to common questions"
                  rows={2}
                />
                <ButtonInput label="Button Text" placeholder="Visit" />
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
                  placeholder="How can I contact support?"
                />
                <TextAreaInput
                  label={`Answer ${index}`}
                  placeholder="You can reach our support team via email, phone, or contact form..."
                  rows={3}
                />
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
            placeholder="Schedule a Consultation"
          />
          <TextAreaInput
            label="Description"
            placeholder="Book a free consultation with our education counselors"
            rows={3}
          />
          <ButtonInput label="Button Text" placeholder="Book a Slot" />
          <ImageUpload
            label="Section Background Image"
            dimensions="1920 × 600 (10 MB max)"
          />
          <div className="space-y-3 border border-gray-200 rounded-lg p-4">
            <p className="text-sm font-semibold text-gray-700">
              Booking Form Fields
            </p>
            <TextInput label="Name Placeholder" placeholder="Full Name" />
            <TextInput label="Email Placeholder" placeholder="Email Address" />
            <TextInput label="Phone Placeholder" placeholder="Phone Number" />
            <TextInput label="Date Placeholder" placeholder="Preferred Date" />
            <TextInput label="Time Placeholder" placeholder="Preferred Time" />
            <TextInput
              label="Topic Placeholder"
              placeholder="Topic of Discussion"
            />
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div>
        <SectionHeader title="Social Media Links" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Connect With Us" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "Facebook",
              "Twitter",
              "LinkedIn",
              "Instagram",
              "YouTube",
              "WhatsApp",
            ].map((platform) => (
              <div
                key={platform}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <ImageUpload label={`${platform} Icon`} maxSizeMB={1} />
                <TextInput
                  label={`${platform} URL`}
                  placeholder={`https://${platform.toLowerCase()}.com/yetzu`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Business Hours Section */}
      <div>
        <SectionHeader title="Business Hours" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="When We're Available"
          />
          <div className="space-y-3">
            {["Monday - Friday", "Saturday", "Sunday"].map((day) => (
              <div
                key={day}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <TextInput label={day} placeholder="9:00 AM - 6:00 PM" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPageEditor;
