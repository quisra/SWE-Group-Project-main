import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />

      <meta content="Unofficial App for University of North Florida, located in Jacksonville. Nationally ranked academics. Matching students to debt. Afforadable tuition. Division I athletics. " name="description"></meta>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Merriweather:wght@400;700;900&family=Open+Sans:wght@500;600;800&family=Red+Hat+Display:wght@400;600;700;800&display=swap"
        rel="stylesheet"
      />

      <link
        href="https://www.unf.edu/images/logos/favicon.ico"
        rel="SHORTCUT ICON"
      />
      <body className="dx-viewport">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
