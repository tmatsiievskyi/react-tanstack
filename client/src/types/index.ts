export interface ITodo {
  checked: boolean;
  title: string;
  description: string;
  id?: number;
}

export interface IProject {
  id: number;
  name: string;
}

export interface IProduct {
  id: number;
  name: string;
}
