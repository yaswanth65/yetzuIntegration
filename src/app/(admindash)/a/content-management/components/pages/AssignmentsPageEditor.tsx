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
            placeholder="Meet the Brains Behind Yetzu"
          />
          <TextInput label="Highlighted Word" placeholder="Brains" />
          <TextAreaInput
            label="Description"
            placeholder="Our approach is simple — partner with passionate people, chase excellence, and make learning unforgettable."
            rows={3}
          />
          <ButtonInput label="Button 1 Text" placeholder="Button" />
          <ButtonInput label="Button 2 Text" placeholder="Button" />
          <ImageUpload label="Hero Image" dimensions="1200 × 700 (10 MB max)" />
        </div>
      </div>

      {/* Assignment Workflow With Steps Section */}
      <div>
        <SectionHeader title="Assignment Workflow Steps" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Assignments Workflow"
          />
          <TextAreaInput
            label="Section Description"
            placeholder="Experience personalized coaching and strategic academic support that adapts to your unique goals and challenges."
            rows={2}
          />
          <ButtonInput label="Button Text" placeholder="Try it out!" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-2">
              Steps (4 items)
            </p>
            {[
              {
                title: "Upload",
                desc: "Upload your assignment and share your specific requirements with ease.",
              },
              {
                title: "Completion / Download",
                desc: "Our approach is simple — partner with passionate people.",
              },
              {
                title: "In Review",
                desc: "Your assignment is being carefully reviewed by our expert mentors.",
              },
              {
                title: "Feedback And Revision",
                desc: "Receive detailed feedback and request revisions.",
              },
            ].map((step, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Step {index + 1}
                </p>
                <TextInput label="Step Title" placeholder={step.title} />
                <TextAreaInput
                  label="Step Description"
                  placeholder={step.desc}
                  rows={2}
                />
                <ImageUpload
                  label="Step Image"
                  dimensions="600 × 550 (3 MB max)"
                  maxSizeMB={3}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Assignment Workflow Details (WrokFlow) Section */}
      <div>
        <SectionHeader title="Assignment Workflow Cards" />
        <div className="mt-6 space-y-4">
          <TextInput
            label="Section Heading"
            placeholder="Assignments Workflow"
          />
          <TextAreaInput
            label="Description"
            placeholder="Experience Personalized Coaching and Strategic Academic Support that Adapts to your Unique Goals."
            rows={3}
          />
          <ButtonInput label="Button Text" placeholder="Try it out!" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <p className="text-sm font-semibold text-gray-700 md:col-span-2">
              Feature Cards (4 items)
            </p>
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 space-y-3"
              >
                <p className="text-sm font-semibold text-gray-700">
                  Card {index}
                </p>
                <TextInput
                  label="Title"
                  placeholder="Customized Mentorship Sessions"
                />
                <TextAreaInput
                  label="Description"
                  placeholder="One-on-one sessions focused on your personal academic needs and growth"
                  rows={2}
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-700">
              Marquee Chips (10 items)
            </p>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg p-3"
                >
                  <TextInput
                    label={`Chip ${index}`}
                    placeholder="Medical Students"
                  />
                </div>
              ))}
            </div>
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
    </div>
  );
};

export default AssignmentsPageEditor;
