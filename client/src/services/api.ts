import axios from 'axios';
import { IProduct, IProject, ITodo } from '../types';

const BASE_URL = 'http://localhost:3000';
const axiosInstance = axios.create({ baseURL: BASE_URL });

export const getTodosIds = async () => {
  return (await axiosInstance.get<ITodo[]>('todos')).data.map(
    (todo) => todo.id
  );
};

export const getTodo = async (id: number) => {
  return (await axiosInstance.get<ITodo>(`todos/${id}`)).data;
};

export const createTodo = async (data: ITodo) => {
  await axiosInstance.post('todos', data);
};

export const updateTodo = async (data: ITodo) => {
  await axiosInstance.put(`todos/${data.id}`, data);
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`todos/${id}`);
};

export const getProjects = async ({
  page = 1,
  limit = 3,
}: {
  page?: number;
  limit?: number;
}) => {
  return (
    await axiosInstance.get<IProject[]>(
      `projects?_page=${page}&_limit=${limit}`
    )
  ).data;
};

export const getProducts = async ({ pageParam }: { pageParam: number }) => {
  return (
    await axiosInstance.get<IProduct[]>(
      `products?_page=${pageParam + 1}&_limit=3`
    )
  ).data;
};

export const getProduct = async (id: number) => {
  return (await axiosInstance.get<IProduct>(`products/${id}`)).data;
};
