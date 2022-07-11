import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import '@/assets/scss/main.scss'

// PrimeVue
import PrimeVue from 'primevue/config'
import Dropdown from "primevue/dropdown";
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';

const app = createApp(App)

app
  .use(store)
  .use(router)
  .use(PrimeVue)
  .mount("#app");

app.component('Dropdown', Dropdown)
app.component('InputText', InputText)
app.component('Button', Button)
