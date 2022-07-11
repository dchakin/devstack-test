import axios from '@/api/axios';

const getAvailableCurrencies = () => {
  return axios.get('/curs_can_buy')
}

export default {
  getAvailableCurrencies
}
