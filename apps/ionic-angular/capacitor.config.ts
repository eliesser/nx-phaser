import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'ionic-angular',
  webDir: '../../dist/apps/ionic-angular',
  bundledWebRuntime: false,
  server: {
    androidScheme: 'https',
  },
};

export default config;
