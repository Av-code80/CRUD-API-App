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
        "gradient-linear":
          "linear-gradient(90deg, rgba(227,36,191,1) 0%, rgba(228,35,123,1) 50%, rgba(18,94,179,1) 100%)",
      },
      boxShadow: {
        custom:
          "0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        "form-group": "1rem",
      },
    },
  },
  plugins: [],
};
