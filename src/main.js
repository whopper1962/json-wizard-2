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

import Toasted from 'vue-toasted';

Vue.use(Toasted, {
  duration: 3000,
});

Vue.config.productionTip = false;

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash, faTrashArrowUp,  } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
console.error(faGithub);
import { } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
const icons = [
  faTrash,
  faTrashArrowUp,
  faGithub
];
library.add(icons);
Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
