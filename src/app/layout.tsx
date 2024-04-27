import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header/Header";
import StoreProvider from "./StoreProvider";

export const metadata: Metadata = {
  title: "diplom",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body id="appElement" style={{ background: "#fff", color: "black" }}>
        <Header />
        <StoreProvider>
          <section>{children}</section>
        </StoreProvider>
      </body>
    </html>
  );
}
