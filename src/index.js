import App from './App';
import common_ar from "./translations/ar/common.json";
import common_en from "./translations/en/common.json";
import common_fr from "./translations/fr/common.json";
import i18next from 'i18next';
import React from 'react';
import ReactDOM from 'react-dom';
import store from 'store';
import { I18nextProvider } from 'react-i18next';
import './index.scss';


i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    framework: "react-i18next",
    lng: store.get('current_langue') || "en",
    resources: {
        ar: {
            common: common_ar    // 'common' is our custom namespace
        },
        en: {
            common: common_en    // 'common' is our custom namespace
        },
        fr: {
            common: common_fr    // 'common' is our custom namespace
        },
    },
});


ReactDOM.render(
  <I18nextProvider i18n={i18next}>
    <App/>
  </I18nextProvider>,
  document.getElementById('root')
);
