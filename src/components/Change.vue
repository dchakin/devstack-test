<template>
  <div class="change container">
    <div class="change__content">
      <div class="change__data">

        <div class="change__give">
          <div class="change__give-title">
            Отдаю
            <span v-show="selectedCurrCanSale && selectedCurrCanBuy" class="change__give-current">1 {{selectedCurrCanSale.title}} = {{(calcExRate*1).toFixed(5)}} {{selectedCurrCanBuy.title}}</span>
          </div>
          <div class="change__form">

            <InputText
              min=0
              v-model="giveCurrNum"
              type="number"
              class="change__input p-inputtext-sm"
              placeholder="0.00000"
            />
            <Dropdown
              class="change__dropdown"
              v-model="selectedCurrCanSale"
              :options="cursCanSale"
              optionLabel="name"
              placeholder="Выбери валюту"
            >
              <template #value="slotProps">
                <div class="change__dropdown-input" v-if="slotProps.value">
                  <img :src="slotProps.value.icon" class="change__dropdown-img" />
                  <span>{{ slotProps.value.title }}</span>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="change__dropdown-list">
                  <img :src="slotProps.option.icon" class="change__dropdown-img" />
                  <span>{{ slotProps.option.title }}</span>
                </div>
              </template>
            </Dropdown>

          </div>
          <div class="change__give-limits">
            <p>Min: 250.00</p>
            <p>Max: 5.000.00</p>
          </div>
        </div>

        <div class="change__get">
          <div class="change__get-title">
            Получаю
          </div>
          <div class="change__form">
            <Preloader v-if="isLoading"/>
            <InputText v-else
              disabled
              :value="getCurrNum"
              type="number"
              placeholder="0.00000"
              class="change__input p-inputtext-sm"
            />
            <Dropdown
              class="change__dropdown"
              v-model="selectedCurrCanBuy"
              :options="cursCanBuy"
              optionLabel="name"
              placeholder="Выбери валюту"
            >
              <template #value="slotProps">
                <div class="change__dropdown-input" v-if="slotProps.value">
                  <img :src="slotProps.value.icon" class="change__dropdown-img" />
                  <span>{{ slotProps.value.title }}</span>
                </div>
                <span v-else>
                    {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="change__dropdown-list">
                  <img :src="slotProps.option.icon" class="change__dropdown-img" />
                  <span>{{ slotProps.option.title }}</span>
                </div>
              </template>
            </Dropdown>
          </div>
          <div class="change__get-limits">
            <p>Min: 40.000.00</p>
            <p>Max: 5.000.000.00</p>
          </div>
        </div>

      </div>
      <Button @click="changeCurrency" class="change__button" label="Обменять"></Button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Preloader from "@/components/Preloader";

export default {
  name: "Change",
  components: {
    Preloader
  },
  data() {
    return {
      selectedCurrCanSale: "",
      selectedCurrCanBuy: "",
      giveCurrNum: null
    };
  },

  methods: {
    // "Обмен валюты" при нажатии по кнопке Обменять
    changeCurrency() {
      if (this.getCurrNum && this.selectedCurrCanBuy.title) {
        alert(`${this.getCurrNum} ${this.selectedCurrCanBuy.title} received successfully!`);
        this.getCurrNum = ''
        this.giveCurrNum = ''
      }
      else
        alert('Choose currency')
    },

    // Метод расчета суммы для получаемой валюты
    giveCurrNumFunc() { // maybe delete
      this.$store.dispatch("calcGetCurr", {
        c1: this.selectedCurrCanSale.id,
        c2: this.selectedCurrCanBuy.id,
        s1: this.giveCurrNum
      });
    }
  },

  // Диспатчим экшены, когда загрузилось дом-дерево
  mounted() {
    this.$store.dispatch("getCursCanSale");
    this.$store.dispatch("getCursCanBuy");
  },

  // Вытаскиваем состояния из хранилища
  computed: {
    ...mapState({
      isLoading: state => state.currencies.isLoading,
      cursCanSale: state => state.currencies.cursCanSale,
      cursCanBuy: state => state.currencies.cursCanBuy,
      calcExRate: state => state.currencies.calcExRate,
      getCurrNum: state => state.currencies.getCurrNum
    })
  },

  // Отслеживаем изменение выбранных валют
  watch: {
    selectedCurrCanSale() {
      this.$store.dispatch("getCalcExRate", {
        c1: this.selectedCurrCanSale.id,
        c2: this.selectedCurrCanBuy.id
      });
      this.giveCurrNumFunc()
    },
    selectedCurrCanBuy() {
      this.$store.dispatch("getCalcExRate", {
        c1: this.selectedCurrCanSale.id,
        c2: this.selectedCurrCanBuy.id
      });
      this.giveCurrNumFunc()
    },

    // Делаем диспатч для перерасчета получаемой суммы
    giveCurrNum() {
      // Проверка на отрицательное число
      if (this.giveCurrNum >= 0) {
        this.$store.dispatch("calcGetCurr", {
          c1: this.selectedCurrCanSale.id,
          c2: this.selectedCurrCanBuy.id,
          s1: this.giveCurrNum
        });
      } else {
        alert('Please enter a positive number')
      }
    }
  }
};
</script>

<style scoped lang="scss">

</style>
