import { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.hocusfocus.app",
  appName: "HocusFocus",
  webDir: "dist",
  server: {
    url: "http://192.168.1.102:5173/",
    cleartext: true,
    androidScheme: "https",
  },
};

export default config;
