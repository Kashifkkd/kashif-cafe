import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reserve a table — Heritage Café",
  description:
    "Book a table at Heritage Café. View reservation details, hours, and submit your request.",
};

export default function ReserveLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
