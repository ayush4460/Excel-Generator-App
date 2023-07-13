import axios from 'axios';

export const createOperation = async (values) => {
  return await axios.post(`http://localhost:8000/api/create`, values);
};
