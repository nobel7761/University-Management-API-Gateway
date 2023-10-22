import axios, { AxiosInstance } from 'axios';
import config from '../config';

const HttpService = (mainUrl: string): AxiosInstance => {
  const instance = axios.create({
    baseURL: mainUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  });

  //! using this instance we will do our request and response. so we have to create request interceptors and response interceptors

  instance.interceptors.request.use(
    // when we send something on request there might be some data in body/params/query. we will get these data into config. will get error in the error
    (config) => {
      return config;
    },
    (error) => {
      return error;
    }
  );

  instance.interceptors.response.use(
    // for response, we will get data from database
    (response) => {
      return response.data;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  return instance;
};

//! connect with auth and core service
const AuthService = HttpService(config.authServiceUrl);
const CoreService = HttpService(config.coreServiceUrl);

export { HttpService, AuthService, CoreService };
