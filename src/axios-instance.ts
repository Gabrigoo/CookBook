import React from 'react';
import axios, { AxiosError } from 'axios';

interface IngredientProps {
  amount: string,
  unit: string,
  description: string
}

interface InstructionProps {
  description: string
}

interface RecipeInt {
  name: string,
  ingredients: IngredientProps[],
  instructions: InstructionProps[]
}

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
    console.log('GET: data loaded');
  }).catch((error: AxiosError) => {
    if (instance.isCancel(error)) {
      console.log(error);
    } else {
      console.error(`Error loading data: ${error}`);
    }
  });
};

const saveData = (object: RecipeInt[]) => {
  instance.put(`/recipes/.json`, object)
    .then(() => { console.log('PUT: data uploaded'); })
    .catch((error: AxiosError) => console.error(`Error uploading data: ${error}`));
};

export { instance, getData, saveData };
