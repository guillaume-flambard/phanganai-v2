import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.phanganai.app',
  appName: 'PhanganAI',
  webDir: 'out',
  server: {
    androidScheme: 'https',
  },
  ios: {
    contentInset: 'automatic',
    backgroundColor: '#102216',
  },
  android: {
    backgroundColor: '#102216',
  },
};

export default config;
