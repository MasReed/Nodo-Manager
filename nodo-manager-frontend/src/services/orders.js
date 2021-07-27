import axios from 'axios';

const baseUrl = '/api/orders';

//
let token = null;
const setToken = (newToken) => { // Called by currentUserReducer
  token = `${newToken}`;
};

//
const getAll = () => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    };

    const request = axios.get(baseUrl, config);
    return request.then((response) => response.data);
  } catch (err) {
    if (err.response) {
      const orderError = {
        type: 'Error Gathering Orders',
        message: err.response.data.message,
        variant: 'warning',
      };
      throw orderError;
    } else if (err.request) {
      console.log('err.req', err.request);
    } else {
      console.log(err);
    }
  }
};

//
const create = async (newObject) => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    };

    const response = await axios.post(baseUrl, newObject, config);
    return response.data;
  } catch (err) {
    if (err.response) {
      const orderError = {
        type: 'Error Creating Order',
        message: err.response.data.message,
        variant: 'warning',
      };
      throw orderError;
    } else if (err.request) {
      console.log('err.req', err.request);
    } else {
      console.log(err);
    }
  }
};

//
const update = async (id, updatedObject) => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    };

    const response = await axios.put(`${baseUrl}/${id}`, updatedObject, config);
    return response.data;
  } catch (err) {
    if (err.response) {
      const orderError = {
        type: 'Error Updating Order',
        message: err.response.data.message,
        variant: 'warning',
      };
      throw orderError;
    } else if (err.request) {
      console.log('err.req', err.request);
    } else {
      console.log(err);
    }
  }
};

//
const destroy = async (id) => {
  try {
    const config = {
      headers: { 'x-access-token': token },
    };

    const response = await axios.delete(`${baseUrl}/${id}`, config);
    return response.data;
  } catch (err) {
    if (err.response) {
      const orderError = {
        type: 'Error Removing Order',
        message: err.response.data.message,
        variant: 'warning',
      };
      throw orderError;
    } else if (err.request) {
      console.log('err.req', err.request);
    } else {
      console.log(err);
    }
  }
};

const exps = {
  setToken, getAll, create, update, destroy,
};

export default exps;
