import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        danger: "var(--color-danger)",

        background: "var(--color-background)",
        soft: "var(--color-background-soft)",
        card: "var(--color-background-card)",

        text: "var(--color-text)",
        muted: "var(--color-text-muted)",
        softtext: "var(--color-text-soft)",

        border: "var(--color-border)",

        btn: {
          primary: "var(--color-btn-primary)",
          "primary-hover": "var(--color-btn-primary-hover)",
          secondary: "var(--color-btn-secondary)",
          "secondary-hover": "var(--color-btn-secondary-hover)",
        },

        badge: {
          hot: "var(--color-badge-hot)",
          new: "var(--color-badge-new)",
        },
      },

      backgroundImage: {
        hero: "var(--gradient-hero)",
        overlay: "var(--gradient-overlay)",
      },
    },
  },
  plugins: [],
};

export default config;
