module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-pink": "#e324bf",
        "custom-orange": "#b37812",
        "custom-light-pink": "#e4237b",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-linear":
          "linear-gradient(90deg, rgba(227,36,191,1) 0%, rgba(228,35,123,1) 50%, rgba(179,120,18,1) 100%)",
      },
      boxShadow: {
        custom:
          "0 4px 6px -1px rgba(227, 36, 191, 0.1), 0 2px 4px -2px rgba(228, 35, 123, 0.1)",
      },
      transitionProperty: {
        height: "height",
        spacing: "margin, padding",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
    },
  },
  plugins: [],
};
