import React from 'react';
import axios, { AxiosError } from 'axios';

const instance: any = axios.create({
  baseURL: 'https://cookbook-300b5.firebaseio.com',
});
instance.CancelToken = axios.CancelToken;
instance.isCancel = axios.isCancel;

const getData = (
  source: any,
  token: string,
  setData: React.Dispatch<React.SetStateAction<any>>,
): void => {
  instance.get(`/.json`, {
    cancelToken: source.token,
  }).then((res: any) => {
    setData(res.data);
    console.log('GET: main data loaded');
  }).catch((error: AxiosError) => {
    if (instance.isCancel(error)) {
      console.log(error);
    } else {
      console.error(`Error loading main data: ${error}`);
    }
  });
};

export { instance, getData };
