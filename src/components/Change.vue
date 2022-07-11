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
      this.$store.dispatch("calcGetCurr", {
        c1: this.selectedCurrCanSale.id,
        c2: this.selectedCurrCanBuy.id,
        s1: this.giveCurrNum
      });
    }
  }
};
</script>

<style scoped lang="scss">

.container {
  max-width: 1230px;
  padding: 0 30px;
  min-height: 90vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Mulish', sans-serif;
}

.change {
  &__content {
    box-shadow: 0 0 10px 1px lightgray;
    border-radius: 15px;
    padding: 2rem;
    width: 100%;
  }

  &__data {
    grid-gap: 2rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  &__give, &__get {
    &-title {
      font-weight: 900;
      font-size: 1.25rem;
      display: flex;
      grid-gap: 1rem;
      align-items: center;
    }

    &-current {
      font-size: .75rem;
      background-color: rgb(61, 148, 169, .1);;
      padding: .25rem .5rem;
      border-radius: 5px;
    }

    &-limits {
      display: flex;
      grid-gap: 1rem;
      color: gray;
      font-size: .75rem;
    }
  }

  &__form {
    margin-top: 1rem;
    padding: .25rem;
    border: 1px solid lightgray;
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__input {
    font-weight: 700;
    border: none;
    margin-right: .25rem;
    height: 2.75rem;
    width: 100%;
    font-size: 1rem;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }

    &:disabled {
      opacity: 1;
    }
  }

  &__dropdown {
    height: 2.75rem;
    align-items: center;
    background-color: rgba(61, 148, 169, 0.1);
    border: none;
    font-weight: 700;
    font-size: 0.875rem;

    &-list, &-input {
      display: flex;
      align-items: center;
      font-weight: 700;
      font-family: 'Mulish', sans-serif;
    }

    &-img {
      margin-right: .75rem;
      width: 30px;
    }
  }

  &__button {
    display: flex;
    width: 100%;

  }
}

@media screen and (max-width: 768px) {
  .change {
    &__content {
      padding: 20px;
    }

    &__data {
      display: block;
    }

    &__form {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      border: none;
    }

    &__input {
      border: 1px solid lightgray;
      margin: 1rem 0 0 0;
    }

    &__dropdown {
      width: 100%;
    }
  }
}

@media screen and (max-width: 340px) {
  .change__give-current {
    font-size: .6rem;
  }
}

</style>
