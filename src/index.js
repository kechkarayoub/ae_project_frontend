import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import common_fr from "./translations/fr/common.json";
import common_en from "./translations/en/common.json";
import store from 'store';
i18next.init({
    interpolation: { escapeValue: false },  // React already does escaping
    framework: "react-i18next",
    lng: store.get('current_langue') || "en",
    resources: {
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
