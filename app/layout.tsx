import type { Metadata } from "next";
import {Geist, Inter} from "next/font/google";
import "../assets/styles/globals.css";
import {ThemeProvider} from "next-themes";
import {APP_DESCRIPTION, APP_NAME, SERVER_URL} from "@/lib/constants";
import {cn} from "@/lib/utils";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Rubinus",
    default: APP_NAME,
  },
  description: APP_DESCRIPTION,
  metadataBase: new URL(SERVER_URL),
  openGraph: {
    title: APP_NAME,
    description: APP_DESCRIPTION,
    type: "website",
    images: ["/logo.png"], // يمكنك إضافة رابط شعار المتجر هنا لاحقاً
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
          lang="en"
          className={cn(
              "antialiased",
              inter.className,
              "font-sans",
              geist.variable,
          )}
          suppressHydrationWarning
      >
      <body>
      <ThemeProvider
          attribute={"class"}
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
      </body>
      </html>
  );
}
