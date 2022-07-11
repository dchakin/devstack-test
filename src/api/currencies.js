import axios from 'axios';

const baseURL = 'https://cors-anywhere.herokuapp.com/https://appstest.dev-stack.ru/test_frontender/hs/api'

const getCursCanSale = () => {
  return axios.get(`${baseURL}/curs_can_sale`).then(response => response.data.data)
}

const getCursCanBuy = () => {
  return axios.get(`${baseURL}/curs_can_buy`).then(response => response.data.data)
}

const calcExRate = (c1, c2) => {
  return axios.get(`${baseURL}/calc_ex_rate?c1=${c1}&c2=${c2}`).then(response => response.data.data)
}

const calcGetCurr = (c1, c2, s1) => {
  return axios.get(`${baseURL}/calc_c2?c1=${c1}&c2=${c2}&s1=${s1}`).then(response => response.data.data)
}

//
export default {
  getCursCanBuy,
  getCursCanSale,
  calcExRate,
  calcGetCurr
}
