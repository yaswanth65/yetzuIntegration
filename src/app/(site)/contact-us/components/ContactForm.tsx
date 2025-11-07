"use client";

import { ErrorMessage, Field, Formik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { Phone, CheckCircle2 } from "lucide-react";
import Input from "@/components/ui/Input";
import { usePostContactInfo } from "@/lib/queries/formService/useFormService";
import Button from "@/components/ui/Button";
import { ContactFormPayload } from "@/lib/queries/formService/types";
import toast from "react-hot-toast";
import MainHeading from "@/components/Typography/MainHeading";
import Paragraph from "@/components/Typography/Paragraph";

const ContactForm = () => {
    const { mutateAsync: postContactInfo, isPending } = usePostContactInfo();
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validationSchema = Yup.object({
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        mobile: Yup.string()
            .matches(
                /^(\+91[\-\s]?)?[6-9]\d{9}$/,
                "Enter a valid 10-digit mobile number"
            )
            .required("Mobile number is required"),
        medicalSchool: Yup.string().required("Medical School / Affiliation is required"),
        researchFocus: Yup.string(),
        mentorshipNeeds: Yup.string().required("Please describe your mentorship needs"),
    });

    return (
        <section className="bg-[#164CFF] min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-16 sm:py-20">
            <div className="max-w-7xl w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
                {/* LEFT SECTION */}
                <div className="text-white w-full lg:w-1/2 flex flex-col justify-between h-full">
                    <div className="flex flex-col space-y-6 sm:space-y-8">
                        <button className="bg-white/20 text-sm sm:text-base text-white px-4 py-1.5 rounded-full backdrop-blur-md w-fit">
                            Contact us
                        </button>

                        <div className="space-y-3 sm:space-y-4">
                            <MainHeading text="Get in touch with us" className="text-white" />
                            <p className="text-base sm:text-lg text-white/90">
                                Or just reach out manually to{" "}
                                <a
                                    href="mailto:email@yetzu.com"
                                    className="underline text-white font-medium hover:text-blue-200 transition-colors"
                                >
                                    email@yetzu.com
                                </a>
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 sm:mt-24 space-y-4">
                        <h2 className="text-lg sm:text-xl font-semibold">Customer Support</h2>
                        <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm">
                            Our support team is available 24/7 to help you with any questions or issues you might face.
                        </p>

                        <div className="flex items-center gap-3 pt-2">
                            <Phone size={20} />
                            <span className="text-white font-medium text-sm sm:text-base">
                                +91 98765 43210
                            </span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION - FORM / THANK YOU CARD */}
                <div className="bg-white rounded-2xl shadow-xl p-5 sm:p-8 w-full lg:w-1/2 max-w-lg min-h-[480px] flex items-center justify-center transition-all duration-500">
                    {!isSubmitted ? (
                        <Formik
                            initialValues={{
                                fullName: "",
                                email: "",
                                mobile: "",
                                medicalSchool: "",
                                researchFocus: "",
                                mentorshipNeeds: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={async (values, { resetForm }) => {
                                try {
                                    const { fullName, email, mentorshipNeeds, medicalSchool, researchFocus, mobile } = values;
                                    const payload: ContactFormPayload = {
                                        name: fullName,
                                        email: email,
                                        mobile: mobile,
                                        medical_school_affiliation: medicalSchool,
                                        subject: researchFocus,
                                        description: mentorshipNeeds,
                                    };

                                    await postContactInfo(payload);
                                    toast.success("Contact Form Submitted Successfully");
                                    resetForm();
                                    setIsSubmitted(true);
                                } catch (error) {
                                    toast.error("Failed to submit the contact form");
                                }
                            }}
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form onSubmit={handleSubmit} className="space-y-3 w-full">
                                    <Input
                                        name="fullName"
                                        label="Full Name"
                                        placeholder="Enter your name"
                                        value={values.fullName}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.fullName && !!errors.fullName}
                                        helperText={touched.fullName && errors.fullName ? errors.fullName : ""}
                                        disabled={isPending}
                                    />
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                        <Input
                                            name="email"
                                            label="Email Address"
                                            placeholder="Enter your email"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.email && !!errors.email}
                                            helperText={touched.email && errors.email ? errors.email : ""}
                                            disabled={isPending}
                                        />
                                        <Input
                                            name="mobile"
                                            label="Mobile Number"
                                            placeholder="Enter your number"
                                            value={values.mobile}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            error={touched.mobile && !!errors.mobile}
                                            helperText={touched.mobile && errors.mobile ? errors.mobile : ""}
                                            disabled={isPending}
                                        />
                                    </div>

                                    <Input
                                        name="medicalSchool"
                                        label="Medical School / Affiliation"
                                        placeholder="Enter your institution"
                                        value={values.medicalSchool}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.medicalSchool && !!errors.medicalSchool}
                                        helperText={touched.medicalSchool && errors.medicalSchool ? errors.medicalSchool : ""}
                                        disabled={isPending}
                                    />

                                    <div className="flex flex-col space-y-1.5">
                                        <label
                                            htmlFor="researchFocus"
                                            className="text-gray-700 font-medium text-sm sm:text-base"
                                        >
                                            Research Paper Focus
                                        </label>
                                        <select
                                            id="researchFocus"
                                            name="researchFocus"
                                            value={values.researchFocus}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={isPending}
                                            className="border border-gray-300 rounded-md p-2 sm:p-2.5 text-sm sm:text-base focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            <option value="">Choose from the option</option>
                                            <option value="Cardiology">Cardiology</option>
                                            <option value="Neurology">Neurology</option>
                                            <option value="Oncology">Oncology</option>
                                            <option value="Public Health">Public Health</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-medium text-sm sm:text-base">
                                            Describe Your Mentorship Needs <span className="text-red-500">*</span>
                                        </label>
                                        <Field
                                            as="textarea"
                                            name="mentorshipNeeds"
                                            rows={3}
                                            placeholder="Enter Input"
                                            disabled={isPending}
                                            className="w-full mt-1 p-2 sm:p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none text-sm sm:text-base resize-none"
                                        />
                                        <ErrorMessage
                                            name="mentorshipNeeds"
                                            component="p"
                                            className="text-red-500 text-xs sm:text-sm mt-1"
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isPending}
                                        className="w-full bg-[#164CFF] hover:bg-blue-700 text-white font-medium py-3 rounded-md transition-colors duration-200 text-sm sm:text-base disabled:bg-blue-400 disabled:cursor-not-allowed"
                                    >
                                        {isPending ? "Submitting..." : "Submit"}
                                    </Button>
                                </form>
                            )}
                        </Formik>
                    ) : (
                        <div className="flex flex-col items-center text-center space-y-4 py-10 px-4">
                            <CheckCircle2 className="text-green-500 w-16 h-16 mb-2" />
                            <h3 className="text-2xl font-semibold text-gray-800">Thank you!</h3>
                            <p className="text-gray-600 text-sm sm:text-base max-w-sm">
                                Your submission has been received successfully. Our team will contact you soon!
                            </p>
                            <button
                                onClick={() => setIsSubmitted(false)}
                                className="mt-4 bg-[#164CFF] text-white px-6 py-2 rounded-md font-medium hover:bg-blue-700 transition"
                            >
                                Submit Another Response
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ContactForm;
