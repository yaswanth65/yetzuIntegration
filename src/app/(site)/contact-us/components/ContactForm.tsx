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

const FormInput = ({
  label,
  required,
  name,
  placeholder,
  type = "text",
  error,
  helperText,
  value,
  onChange,
  onBlur,
  disabled
}: any) => {
  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <div className="flex items-center gap-[2px]">
          <span className="font-sans text-[16px] font-normal leading-[19px] tracking-[-0.03em] text-[#252525]">
            {label}
          </span>
          {required && (
            <span className="font-sans text-[14px] font-medium leading-[17px] text-[#FD0404]">
              *
            </span>
          )}
        </div>
      )}
      <div className={`flex items-center h-[53px] bg-[#F4F4F4] border border-[#F4F4F4] rounded-[8px] p-[12px_8px_12px_12px] transition-all w-full ${error ? "border-red-500" : ""}`}>
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className="w-full bg-transparent border-none outline-none font-sans text-[14px] font-normal leading-[17px] text-[#252525] placeholder-[#5C5C5C] disabled:cursor-not-allowed"
        />
      </div>
      {error && helperText && (
        <p className="text-red-500 text-xs mt-1">{helperText}</p>
      )}
    </div>
  );
};

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
        "Enter a valid 10-digit mobile number",
      )
      .required("Mobile number is required"),
    medicalSchool: Yup.string().required(
      "Medical School / Affiliation is required",
    ),
    mentorshipNeeds: Yup.string().required(
      "Please describe your mentorship needs",
    ),
  });

  return (
    <section className="bg-[#164CFF] min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-20 xl:px-[108px] py-8 lg:py-10">
      <div className="max-w-[1224px] w-full flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
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
            <h2 className="text-lg sm:text-xl font-medium">
              Customer Support
            </h2>
            <p className="text-white/80 text-sm sm:text-base leading-relaxed max-w-sm">
              Our support team is available 24/7 to help you with any questions
              or issues you might face.
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
        <div className="flex flex-col items-start bg-white shadow-[0px_16px_32px_-12px_rgba(31,30,130,0.1)] rounded-[32px] p-8 sm:p-[28px_36px] gap-[32px] w-full max-w-[524px] lg:w-[524px] h-auto lg:min-h-[580px] transition-all duration-500 justify-center">
          {!isSubmitted ? (
            <Formik
              initialValues={{
                fullName: "",
                email: "",
                mobile: "",
                medicalSchool: "",
                mentorshipNeeds: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values, { resetForm }) => {
                try {
                  const {
                    fullName,
                    email,
                    mentorshipNeeds,
                    medicalSchool,
                    mobile,
                  } = values;
                  const payload: ContactFormPayload = {
                    name: fullName,
                    email: email,
                    mobile: mobile,
                    medical_school_affiliation: medicalSchool,
                    subject: "Mentorship Request",
                    description: mentorshipNeeds,
                  };

                  await postContactInfo(payload);
                  toast.success("Contact Form Submitted Successfully");
                  resetForm();
                  setIsSubmitted(true);
                } catch (error: any) {
                  const message = error?.response?.data?.message || error?.message || "";
                  if (message.toLowerCase().includes("duplicate") || message.toLowerCase().includes("already exists")) {
                    toast.error(message || "This email or phone is already registered");
                  } else if (message.toLowerCase().includes("validation")) {
                    toast.error(message || "Please check your inputs and try again");
                  } else {
                    toast.error("Failed to submit the contact form. Please try again.");
                  }
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
              }) => (
                <form onSubmit={handleSubmit} className="flex flex-col gap-[28px] w-full max-w-[440px]">
                  {/* Full Name */}
                  <FormInput
                    name="fullName"
                    label="Full Name"
                    required
                    placeholder="Enter your name"
                    value={values.fullName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.fullName && !!errors.fullName}
                    helperText={
                      touched.fullName && errors.fullName ? errors.fullName : ""
                    }
                    disabled={isPending}
                  />

                  {/* Email & Mobile Row */}
                  <div className="flex flex-col sm:flex-row gap-[28px] w-full">
                    <FormInput
                      name="email"
                      label="Email Address"
                      required
                      placeholder="Enter your email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && !!errors.email}
                      helperText={
                        touched.email && errors.email ? errors.email : ""
                      }
                      disabled={isPending}
                    />
                    <FormInput
                      name="mobile"
                      label="Mobile Number"
                      required
                      placeholder="Enter your number"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.mobile && !!errors.mobile}
                      helperText={
                        touched.mobile && errors.mobile ? errors.mobile : ""
                      }
                      disabled={isPending}
                    />
                  </div>

                  {/* Medical School */}
                  <FormInput
                    name="medicalSchool"
                    label="Medical School / Affiliation"
                    required
                    placeholder="Enter your institution"
                    value={values.medicalSchool}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.medicalSchool && !!errors.medicalSchool}
                    helperText={
                      touched.medicalSchool && errors.medicalSchool
                        ? errors.medicalSchool
                        : ""
                    }
                    disabled={isPending}
                  />



                  {/* Describe Your Mentorship Needs */}
                  <div className="flex flex-col gap-1.5 w-full">
                    <div className="flex items-center gap-[2px]">
                      <span className="font-sans text-[16px] font-normal leading-[19px] tracking-[-0.03em] text-[#252525]">
                        Describe Your Mentorship Needs
                      </span>
                      <span className="font-sans text-[14px] font-medium leading-[17px] text-[#FD0404]">
                        *
                      </span>
                    </div>
                    <div className={`flex items-start h-[77px] bg-[#F4F4F4] border border-[#F4F4F4] rounded-[8px] p-[12px_8px_12px_12px] transition-all w-full ${touched.mentorshipNeeds && errors.mentorshipNeeds ? "border-red-500" : ""}`}>
                      <textarea
                        name="mentorshipNeeds"
                        placeholder="Enter Input"
                        value={values.mentorshipNeeds}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        disabled={isPending}
                        className="w-full h-full bg-transparent border-none outline-none font-sans text-[14px] font-normal leading-[17px] text-[#252525] placeholder-[#5C5C5C] resize-none"
                      />
                    </div>
                    {errors.mentorshipNeeds && touched.mentorshipNeeds && (
                      <p className="text-red-500 text-xs mt-1">{errors.mentorshipNeeds}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isPending}
                    className="flex justify-center items-center gap-[8px] w-full h-[51px] bg-[#042BFD] shadow-[0px_2px_4px_rgba(31,30,130,0.04)] rounded-[12px] font-sans font-normal text-[18px] leading-[21px] text-center tracking-[-0.03em] text-white hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer disabled:bg-blue-400 disabled:cursor-not-allowed"
                  >
                    {isPending ? "Submitting..." : "Submit"}
                  </button>
                </form>
              )}
            </Formik>
          ) : (
            <div className="flex flex-col items-center text-center space-y-4 py-10 px-4 w-full">
              <CheckCircle2 className="text-green-500 w-16 h-16 mb-2" />
              <h3 className="text-2xl font-medium text-gray-800">
                Thank you!
              </h3>
              <p className="text-gray-600 text-sm sm:text-base max-w-sm">
                Your submission has been received successfully. Our team will
                contact you soon!
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="mt-4 flex justify-center items-center w-full max-w-[240px] h-[51px] bg-[#042BFD] shadow-[0px_2px_4px_rgba(31,30,130,0.04)] rounded-[12px] font-sans font-normal text-[16px] text-white hover:bg-blue-700 active:scale-[0.98] transition-all cursor-pointer"
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
