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
    },
  },
  plugins: [],
};
