import Vue from "vue";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faCheck,
  faTimes,
  faPalette,
  faPlus,
  faUserCog,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

library.add(faCheck, faTimes, faPalette, faPlus, faUserCog, faPen);

Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.config.productionTip = false;
