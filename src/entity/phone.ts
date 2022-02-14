import { Item } from './item';

export interface Phone {
  id: number;
  color: string;
  brandName: string;
  model: string;
  price: number;
  ram: number;
  rom: number;
  items: Item[];
}
