"use client";

import MainHeading from "@/components/Typography/MainHeading";
import Paragraph from "@/components/Typography/Paragraph";
import Button from "@/components/ui/Button";
import { motion } from "framer-motion";
import Image from "next/image";

export default function MeetTheBrains() {
    return (
        <section
            className="relative w-full py-16 sm:py-20 px-4 sm:px-6 lg:px-10 flex flex-col items-center overflow-hidden"
        >
            <div className="absolute inset-0 bg-[linear-gradient(180deg,#FFFFFF_0%,#E2E7FF_50.01%,#FFFFFF_100%)] z-0"></div>
            <div className="w-full max-w-7xl flex flex-col items-center text-center relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <MainHeading text="Meet the Brains Behind Yetzu" highlights={['Brains']} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative"
                >
                    <Paragraph text="Our approach is simple — partner with passionate people, chase
                    excellence, and make learning unforgettable."/>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="flex sm:flex-row gap-4 mt-8 relative"
                >
                    <Button variant="secondary" className="">
                        Button
                    </Button>
                    <Button className="" variant="primary">
                        Button
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="mt-12 w-full flex justify-center relative"
                >
                    <div className="rounded-2xl overflow-hidden w-full max-w-5xl">
                        <Image
                            src="https://placehold.co/1200x700"
                            alt="Yetzu Team Dashboard"
                            width={1200}
                            height={700}
                            className="rounded-xl w-full h-auto object-cover"
                        />
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
