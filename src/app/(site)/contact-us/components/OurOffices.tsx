"use client";

import MainHeading from "@/components/Typography/MainHeading";
import Paragraph from "@/components/Typography/Paragraph";
import SubHeading from "@/components/Typography/SubHeading";
import { Mail, Phone, MapPin, MessageCircle, Youtube, Instagram } from "lucide-react";

const contactInfo = [
    {
        icon: <Phone className="text-blue-500 w-8 h-8" />,
        title: "Phone Number",
        detail: "+91 8747398748",
    },
    {
        icon: <Mail className="text-blue-500 w-8 h-8" />,
        title: "Email",
        detail: "hello@gmail.com",
    },
    {
        icon: <MapPin className="text-blue-500 w-8 h-8" />,
        title: "Location",
        detail: "Lorem ipsum is free text to use",
    },
    {
        icon: <MessageCircle className="text-blue-500 w-8 h-8" />,
        title: "WhatsApp",
        detail: "+91 652365756",
    },
    {
        icon: <Youtube className="text-blue-500 w-8 h-8" />,
        title: "Youtube",
        detail: "Lorem ipsum is free text to use",
    },
    {
        icon: <Instagram className="text-blue-500 w-8 h-8" />,
        title: "Instagram",
        detail: "+91 652365756",
    },
];

export default function OurOffices() {
    return (
        <section className="w-full bg-gradient-to-b from-white to-blue-50 py-10 px-4 sm:px-6 lg:px-10 flex flex-col items-center">
            <div className="text-center mb-12">
                <SubHeading text="Our Offices" />
                <Paragraph text="Join a Thriving Community Dedicated to Academic Excellence Supported by
                    Cutting-Edge Technology and Expert Mentorship."/>
            </div>

            <div className="flex flex-col-reverse lg:flex-row bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-7xl">
                <div className="w-full lg:w-[40%] flex flex-col justify-center p-8 sm:p-10">
                    <h3 className="text-4xl sm:text-3xl font-semibold text-blue-900 mb-8">
                        Contact us
                    </h3>

                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-8 gap-y-10">
                        {contactInfo.map((item, index) => (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center space-y-2"
                            >
                                <div>{item.icon}</div>
                                <h4 className="font-semibold text-gray-900 text-base sm:text-lg">
                                    {item.title}
                                </h4>
                                <p className="text-gray-600 text-sm sm:text-base">
                                    {item.detail}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-full lg:w-[60%] h-[250px] sm:h-[350px] lg:h-auto relative">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d243646.9050953727!2d78.24323113439742!3d17.412608642828793!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99daeaebd2c7%3A0xae93b78392bafbc2!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1762447944298!5m2!1sen!2sin"
                        width="100%"
                        height="100%"
                        allowFullScreen
                        loading="lazy"
                        className="rounded-none lg:rounded-r-2xl pointer-events-none"
                    ></iframe>
                </div>
            </div>
        </section>
    );
}
