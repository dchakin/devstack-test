import CurrenciesApi from '@/api/currencies'

export const currencies = {
  state: {
    cursCanSale: null,
    cursCanBuy: null,
    calcExRate: null,
    isLoading: false,
    error: null,
    getCurrNum: null
  },

  getters: {
  },

  mutations: {
    getCursCanSaleStart(state) {
      state.isLoading = true;
      state.cursCanSale = null;
    },
    getCursCanSaleSuccess(state, payload) {
      state.isLoading = false;
      state.cursCanSale = payload;
    },
    getCursCanSaleFailure(state) {
      state.isLoading = false;
    },

    getCursCanBuyStart(state) {
      state.isLoading = true;
      state.cursCanBuy = null;
    },
    getCursCanBuySuccess(state, payload) {
      state.isLoading = false;
      state.cursCanBuy = payload;
    },
    getCursCanBuyFailure(state) {
      state.isLoading = false;
    },

    getCalcExRateStart(state) {
      state.isLoading = true;
      state.calcExRate = null;
    },
    getCalcExRateSuccess(state, payload) {
      state.isLoading = false;
      state.calcExRate = payload;
    },
    getCalcExRateFailure(state) {
      state.isLoading = false;
    },

    calcGetCurrStart(state) {
      state.isLoading = true;
      state.getCurrNum = null;
    },
    calcGetCurrSuccess(state, payload) {
      state.isLoading = false;
      state.getCurrNum = payload;
    },
    calcGetCurrFailure(state) {
      state.isLoading = false;
    },
  },

  actions: {
    async getCursCanSale (context) {
      try {
        context.commit('getCursCanSaleStart');
        const currencies = await CurrenciesApi.getCursCanSale()
        context.commit('getCursCanSaleSuccess', currencies)
      } catch (e) {
        context.commit('getCursCanSaleFailure');
      }
    },

    async getCursCanBuy (context) {
      try {
        context.commit('getCursCanBuyStart');
        const currencies = await CurrenciesApi.getCursCanBuy()
        context.commit('getCursCanBuySuccess', currencies)
      } catch (e) {
        context.commit('getCursCanBuyFailure');
      }
    },

    async getCalcExRate ({commit}, {c1, c2}) {
      try {
        commit('getCalcExRateStart');
        const currencies = await CurrenciesApi.calcExRate(c1, c2)
        commit('getCalcExRateSuccess', currencies)
      } catch (e) {
        commit('getCalcExRateFailure');
      }
    },

    async calcGetCurr ({commit}, {c1, c2, s1}) {
      try {
        commit('calcGetCurrStart');
        const currencies = await CurrenciesApi.calcGetCurr(c1, c2, s1)
        commit('calcGetCurrSuccess', currencies)
      } catch (e) {
        commit('calcGetCurrFailure');
      }
    },
  },

};
