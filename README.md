# Next.js Digital Marketplace

This is a single-vendor digital marketplace solution built with Next.js and Material-UI. It is designed to be fully responsive, SEO-friendly, and easy to use, making it an excellent choice for anyone looking to launch a successful online store for high-quality digital products.

## Features

*   **Fully Responsive Design:** Ensures your marketplace looks professional and operates smoothly across all devices.
*   **SEO-Optimized:** Built with SEO best practices to enhance product visibility in search engine results, attract more visitors, and boost sales.
*   **User-Friendly:** Accessible to users of all levels, streamlining the setup and customization process.
*   **Material-UI:** A comprehensive suite of free UI tools to help you ship new features faster.

## Getting Started

### Installation

To get started, you'll need to install the project dependencies and then you can run the development server.

**1. Install Dependencies:**

```bash
npm install
```

**2. Run the Development Server:**

```bash
npm run dev
```

### Material-UI Installation

This project uses Material-UI. If you need to reinstall it or add it to a new project, follow these steps:

**1. Install Material-UI:**

Run one of the following commands to add Material-UI to your project:

```bash
npm install @mui/material @emotion/react @emotion/styled
```

**Peer Dependencies:**

Please note that `react` and `react-dom` are peer dependencies. Ensure they are installed before installing Material-UI.

```json
"peerDependencies": {
  "react": "^17.0.0 || ^18.0.0 || ^19.0.0",
  "react-dom": "^17.0.0 || ^18.0.0 || ^19.0.0"
}
```

**2. Install Roboto Font:**

Material-UI uses the Roboto font by default. Add it to your project via Fontsource:

```bash
npm install @fontsource/roboto
```

Then, import it in your entry point:

```javascript
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
```

**3. Install Material Icons:**

To use the font Icon component or the prebuilt SVG Material Icons, you must first install the Material Icons font:

```bash
npm install @mui/icons-material
```

### Globals

For a better user experience and developer experience, we recommend adding the following globals to your app.

**Responsive Meta Tag:**

Add the responsive viewport meta tag to your `<head>` element:

```html
<meta name="viewport" content="initial-scale=1, width=device-width" />
```

**CssBaseline:**

Material-UI provides an optional `CssBaseline` component. It fixes some inconsistencies across browsers and devices while providing resets that are better tailored to fit Material-UI.
