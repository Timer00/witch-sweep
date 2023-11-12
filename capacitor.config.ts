import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.hocusfocus.app',
  appName: 'HocusFocus',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
