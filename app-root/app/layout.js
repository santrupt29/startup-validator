import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "AI Startup Validator",
  description: "Startup validating web app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <nav className="p-4 border-b flex gap-4">
  <a href="/" className="font-semibold">Submit Idea</a>
  <a href="/dashboard" className="font-semibold">Dashboard</a>
</nav>
        {children}
        
      </body>
    </html>
  );
}
