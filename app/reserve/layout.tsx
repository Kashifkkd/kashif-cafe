import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve a table — Kashif Café",
  description:
    "Book a table at Kashif Café. View reservation details, hours, and submit your request.",
};

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
