import Vue from "vue";

import "./styles/quasar.sass";
import iconSet from "quasar/icon-set/fontawesome-v5.js";
import lang from "quasar/lang/es.js";
import "@quasar/extras/roboto-font/roboto-font.css";
import "@quasar/extras/fontawesome-v5/fontawesome-v5.css";
import Quasar from "quasar";

Vue.use(Quasar, {
  config: {},
  plugins: {},
  lang: lang,
  iconSet: iconSet,
});
