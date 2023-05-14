import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClickOutside from 'vue-click-outside';

// vue-js-modal
import VModal from 'vue-js-modal';
Vue.use(VModal);

// Directive
Vue.directive('click-outside', ClickOutside);

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
});

// i18n
import VueI18n from 'vue-i18n';

Vue.use(VueI18n);

const messages = {
  en: require('@/locales/en.json'),
  ja: require('@/locales/ja.json')
};

const locale = localStorage.getItem('language') || 'en';

const i18n = new VueI18n({
  locale,
  messages
});

import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  duration: 3000,
});

Vue.config.productionTip = false;

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faTriangleExclamation, faTrashArrowUp, faGlobe, faWandSparkles, faGlasses, faDownload, faFloppyDisk, faRotateLeft, faPlus, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faCircleXmark as WhiteXmark, faClipboard } from '@fortawesome/free-regular-svg-icons';
import { } from '@fortawesome/fontawesome-free-regular';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const icons = [
  faTrash,
  faGlobe,
  faTrashArrowUp,
  faTriangleExclamation,
  faGithub,
  faGlasses,
  faCircleXmark,
  WhiteXmark,
  faClipboard,
  faWandSparkles,
  faDownload,
  faRotateLeft,
  faPlus,
  faFloppyDisk
];
library.add(icons);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');
