import { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.technyks.uberEatsCloneApp',
  appName: 'uber-eats-clone-app',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins: {
    Keyboard: {
      resize: KeyboardResize.Native,
      // style: KeyboardStyle.Dark,
      // resizeOnFullScreen: true,
    },
  },
};

export default config;
