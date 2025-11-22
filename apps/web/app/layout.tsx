export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Scripters - Digital Marketplace</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
