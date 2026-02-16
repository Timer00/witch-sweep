import typography from "@tailwindcss/typography";

module.exports = {
  content: ["index.html", "./src/**/*.{js,jsx,ts,tsx,vue,html}"],
  theme: {
    extend: {
      backgroundImage: {
        room: "url('src/assets/images/room.png')",
      },
      scale: {
        "-100": "-1",
      },
      fontFamily: {
        pixel: "3by3",
      },
      fontSize: {
        "2xs": "0.625rem",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0) rotate(0deg)" },
          "25%": { transform: "translateX(-2px) rotate(-1deg)" },
          "75%": { transform: "translateX(2px) rotate(1deg)" },
        },
      },
      animation: {
        shake: "shake 0.3s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
};
