import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui/sonner';
import "./globals.css";
import { ExitModal } from "@/components/modals/exit-modal";
import { HeartsModal } from "@/components/modals/hearts-modal";
import { PracticeModal } from "@/components/modals/practice-modal";
import { CourseModal } from "@/components/course modal/course-modal";

const font = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dalawika", //Create Next App
  description: "Generated by Group 6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
        <link href="https://fonts.cdnfonts.com/css/hobo-bt" 
        rel="stylesheet"/>
        <link href="https://fonts.googleapis.com/css2?family=Dongle&display=swap" rel="stylesheet"/>
        </head>
        <body className={font.className}>
          <Toaster />
          <ExitModal />
          <HeartsModal />
          <PracticeModal />
          <CourseModal />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}