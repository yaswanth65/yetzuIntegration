"use client";

import React from "react";
import HomePageEditor from "./pages/HomePageEditor";
import AboutPageEditor from "./pages/AboutPageEditor";
import CoursesPageEditor from "./pages/CoursesPageEditor";
import AssignmentsPageEditor from "./pages/AssignmentsPageEditor";
import BlogPageEditor from "./pages/BlogPageEditor";
import ContactPageEditor from "./pages/ContactPageEditor";
import LandingPageEditor from "./pages/LandingPageEditor";

interface ContentEditorProps {
  selectedPage: string;
}

const ContentEditor: React.FC<ContentEditorProps> = ({ selectedPage }) => {
  const renderEditor = () => {
    switch (selectedPage) {
      case "Landing Page":
        return <LandingPageEditor />;
      case "Home":
        return <HomePageEditor />;
      case "About Us":
        return <AboutPageEditor />;
      case "Courses":
        return <CoursesPageEditor />;
      case "Assignments":
        return <AssignmentsPageEditor />;
      case "Blog":
        return <BlogPageEditor />;
      case "Contact Us":
        return <ContactPageEditor />;
      default:
        return <div>Select a page to edit</div>;
    }
  };

  return <div className="bg-white">{renderEditor()}</div>;
};

export default ContentEditor;
