// app/layout.tsx
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import Script from "next/script"; // <-- 추가
import "./globals.css";
import Providers from "./providers";
import { AuthProvider } from "@/context/AuthContext";

const notoSansKr = Noto_Sans_KR({
  display: "swap",
  style: "normal",
  subsets: ["latin"],
  variable: "--noto-sans_KR",
  fallback: ["system-ui"],
});

export const metadata: Metadata = {
  title: "KurlyKelly",
  description: "Feless proudly presents KurlyKelly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <Script
          src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"
          strategy="beforeInteractive"
        />
      </head>
      <body className={`${notoSansKr.className} antialiased`}>
        <Providers>
          <AuthProvider>{children}</AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
