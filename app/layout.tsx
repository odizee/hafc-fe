import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Sidebar } from "@/components/sidebar";
import { Toaster } from "sonner";
import AppProvider from "@/redux/provider";
import { NuqsAdapter } from "nuqs/adapters/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Team Manager",
  description: "Football team management application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {" "}
            <div className="flex h-screen overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto bg-background">
                <NuqsAdapter>{children}</NuqsAdapter>
              </main>
            </div>
            <Toaster position="top-right" richColors closeButton />
          </ThemeProvider>
        </AppProvider>
      </body>
    </html>
  );
}
