import "./globals.css";

export const metadata = {
  title: "Exis-OS — an operating policy for agentic coders",
  description:
    "An operating policy for OpenHands + Devstral. Three environments. One discipline. Zero fabricated return codes.",
  openGraph: {
    title: "Exis-OS",
    description:
      "An operating policy for OpenHands + Devstral. Three environments. One discipline. Zero fabricated return codes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Exis-OS",
    description:
      "An operating policy for OpenHands + Devstral. Three environments. One discipline. Zero fabricated return codes.",
  },
};

export const viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;600;700;800&family=Archivo+Black&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>{children}</body>
    </html>
  );
}
