// Import Inter font from Google Fonts for consistent typography
import { Inter } from "next/font/google";
// Import global CSS styles that apply to the entire application
import "@/styles/globals.css";
// Provider for displaying toast notifications throughout the app
import ToastProvider from "@/providers/ToastProvider";
// Provider for managing user authentication sessions
import { SessionProvider } from "@/providers/SessionProvider";
// Provider for React Query - handles server state management, caching, and data fetching
import { QueryClientWrapper } from "@/providers/QueryClientProvider";

// Configure Inter font with Latin subset and create a CSS variable
// This variable (--font-inter) can be used in CSS/SCSS files
// Added fallback and display options for better resilience during builds
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  fallback: ["system-ui", "arial"],
  adjustFontFallback: false,
});

// Export metadata for SEO and browser display
// This sets the document title, description, favicon, and viewport settings
export const metadata = {
  title: {
    // Default title shown on the home page
    default: "YETZU ED TECH | Asterisks.Inc",
    // Template for nested pages - %s gets replaced with the page title
    template: "%s | Yetzu",
  },
  // Meta description shown in search results
  description: "Yetzu — Simplify your workflow with ease.",
  icons: {
    // Path to the favicon/logo shown in browser tabs
    icon: "/logo.svg",
  },
  viewport: {
    // Make the layout responsive to device width
    width: "device-width",
    // Initial zoom level when page loads (1 = no zoom)
    initialScale: 1,
    // Maximum zoom level users can zoom in to
    maximumScale: 5,
    // Allow users to zoom/scale the page
    userScalable: true,
  },
};

// Root layout component - wraps all pages in the application
// This is required in Next.js App Router and defines the shared UI structure
export default function RootLayout({
  children, // Represents the content of nested pages (routes)
}: {
  children: React.ReactNode;
}) {
  return (
    // Set HTML language to English and apply the Inter font CSS variable
    <html lang="en" className={inter.variable}>
      <body>
        {/* QueryClientWrapper: Provides React Query context for data fetching, caching, and state management */}
        <QueryClientWrapper>
          {/* SessionProvider: Manages user authentication state across the app */}
          <SessionProvider>
            {/* Render the nested page content (e.g., page.tsx, about/page.tsx, etc.) */}
            {children}
            {/* ToastProvider: Renders toast notifications container - typically positioned fixed */}
            <ToastProvider />
          </SessionProvider>
        </QueryClientWrapper>
      </body>
    </html>
  );
}
