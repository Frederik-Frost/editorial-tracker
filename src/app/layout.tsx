import type { Metadata } from "next";
import "./globals.css";
import { QueryProvider } from "@/components/QueryProvider";

export const metadata: Metadata = {
  title: "Frihedsbrevet — Editorial Tracker",
  description: "Internal editorial workflow tracker",
};

const RootLayout = ({ children }: LayoutProps<"/">) => {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-page text-text">
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
