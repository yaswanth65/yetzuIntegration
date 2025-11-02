import { Inter } from "next/font/google";
import "@/styles/globals.css";
import ToastProvider from "@/providers/ToastProvider";
import { SessionProvider } from "@/providers/SessionProvider";
import { QueryClientWrapper } from "@/providers/QueryClientProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata = {
  title: {
    default: "YETZU ED TECH | Asterisks.Inc",
    template: "%s | Yetzu",
  },
  description: "Yetzu — Simplify your workflow with ease.",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <QueryClientWrapper>
          <SessionProvider>
            {children}
            <ToastProvider />
          </SessionProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
