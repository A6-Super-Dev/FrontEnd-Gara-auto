import axios from 'axios';
import { BASE_URL, END_POINT } from './types';

export const sampleTestApi = async () => {
  const { data } = await axios.get(BASE_URL + END_POINT.sampleApi);
  return data;
};
