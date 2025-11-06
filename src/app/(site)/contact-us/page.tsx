"use client";

import ContactForm from "./components/ContactForm";
import OurOffices from "./components/OurOffices";
import ResourceCards from "./components/ResourceCards";
import FAQSection from "./components/FAQSection";
import BookSlotSection from "./components/BookSlotSection";

export default function ContactPage() {
    return (
        <>
            <ContactForm />
            <OurOffices />
            <ResourceCards />
            <FAQSection />
            <BookSlotSection />
        </>
    );
}
