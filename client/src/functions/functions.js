import axios from 'axios';

export const createOperation = async (values) => {
  return await axios.post(`http://localhost:8000/api/create`, values);
};

export const updateOperation = async ( id , values) => {
  return await axios.put(`http://localhost:8000/api/update/${id}`, values);
};

export const getOperationById = async ( id , values) => {
  return await axios.get(`http://localhost:8000/api/get/${id}`, values);
};

export const deleteOperation = async ( id ) => {
  return await axios.delete(`http://localhost:8000/api/delete/${id}`);
};
