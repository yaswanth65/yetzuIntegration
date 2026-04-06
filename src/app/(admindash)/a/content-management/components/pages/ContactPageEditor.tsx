"use client";

import React from "react";
import {
  TextInput,
  TextAreaInput,
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
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Left Panel (Blue Background)
            </p>
            <TextInput label="Pill / Badge Text" placeholder="Contact us" />
            <TextInput label="Heading" placeholder="Get in touch with us" />
            <TextInput
              label="Email Line Text"
              placeholder="Or just reach out manually to"
            />
            <TextInput label="Email Address" placeholder="email@yetzu.com" />
            <TextInput label="Support Heading" placeholder="Customer Support" />
            <TextAreaInput
              label="Support Description"
              placeholder="Our support team is available 24/7 to help you with any questions or issues you might face."
              rows={2}
            />
            <TextInput label="Phone Number" placeholder="+91 98765 43210" />
          </div>
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Right Panel (Contact Form — 6 fields)
            </p>
            <TextInput label="Field 1 Label" placeholder="Full Name" />
            <TextInput
              label="Field 1 Placeholder"
              placeholder="Enter your name"
            />
            <TextInput label="Field 2 Label" placeholder="Email Address" />
            <TextInput
              label="Field 2 Placeholder"
              placeholder="Enter your email"
            />
            <TextInput label="Field 3 Label" placeholder="Mobile Number" />
            <TextInput
              label="Field 3 Placeholder"
              placeholder="Enter your number"
            />
            <TextInput
              label="Field 4 Label"
              placeholder="Medical School / Affiliation"
            />
            <TextInput
              label="Field 4 Placeholder"
              placeholder="Enter your institution"
            />
            <TextInput
              label="Field 5 Label"
              placeholder="Research Paper Focus"
            />
            <TextInput
              label="Field 5 Placeholder"
              placeholder="Choose from the option"
            />
            <TextAreaInput
              label="Field 5 Options (comma separated)"
              placeholder="Cardiology, Neurology, Oncology, Public Health"
              rows={2}
            />
            <TextInput
              label="Field 6 Label"
              placeholder="Describe Your Mentorship Needs"
            />
            <TextInput label="Field 6 Placeholder" placeholder="Enter Input" />
            <ButtonInput label="Submit Button Text" placeholder="Submit" />
          </div>
          <div className="border border-gray-200 rounded-lg p-4 space-y-3">
            <p className="text-sm font-semibold text-gray-700">
              Thank You State (after submission)
            </p>
            <TextInput label="Heading" placeholder="Thank you!" />
            <TextAreaInput
              label="Message"
              placeholder="Your submission has been received successfully. Our team will contact you soon!"
              rows={2}
            />
            <ButtonInput
              label="Button Text"
              placeholder="Submit Another Response"
            />
          </div>
        </div>
      </div>

      {/* Our Offices Section */}
      <div>
        <SectionHeader title="Our Offices Section" />
        <div className="mt-6 space-y-4">
          <TextInput label="Section Heading" placeholder="Our Offices" />
          <TextAreaInput
            label="Section Description"
            placeholder="Join a Thriving Community Dedicated to Academic Excellence Supported by Cutting-Edge Technology and Expert Mentorship."
            rows={2}
          />
          <TextInput label="Card Heading" placeholder="Contact us" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-3">
              Contact Info Items (6 items)
            </p>
            {[
              {
                icon: "Phone",
                title: "Phone Number",
                detail: "+91 8747398748",
              },
              { icon: "Mail", title: "Email", detail: "hello@gmail.com" },
              {
                icon: "MapPin",
                title: "Location",
                detail: "Lorem ipsum is free text to use",
              },
              {
                icon: "MessageCircle",
                title: "WhatsApp",
                detail: "+91 652365756",
              },
              {
                icon: "Youtube",
                title: "Youtube",
                detail: "Lorem ipsum is free text to use",
              },
              {
                icon: "Instagram",
                title: "Instagram",
                detail: "+91 652365756",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  {item.icon}
                </p>
                <TextInput label="Title" placeholder={item.title} />
                <TextInput label="Detail" placeholder={item.detail} />
              </div>
            ))}
          </div>
          <TextInput
            label="Google Maps Embed URL"
            placeholder="https://www.google.com/maps/embed?..."
          />
        </div>
      </div>

      {/* Resource Cards Section */}
      <div>
        <SectionHeader title="Resource Cards Section" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Explore our Resources"
          />
          <TextAreaInput
            label="Section Description"
            placeholder="Learn from our curated collection of materials and guides."
            rows={2}
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-3">
              Resource Cards (3 items)
            </p>
            {[1, 2, 3].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Resource Card {index}
                </p>
                <TextInput
                  label="Title"
                  placeholder="Loren ipsym, can be used for free any where"
                />
                <TextAreaInput
                  label="Description"
                  placeholder="Loren ipsym, can be used for free any where for anything. It is effective tool..."
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
          <TextInput label="Section Heading" placeholder="FAQ" />
          <TextAreaInput
            label="Description"
            placeholder="Know answers to all of your questions"
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
                  placeholder="Your Question goes here?"
                />
                <TextAreaInput
                  label={`Answer ${index}`}
                  placeholder="Accordion description goes here."
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

export default ContactPageEditor;
