import { request } from '../utils/axios';
import { StockInFormInterface } from '../interface/stock-in-form.interface';
import { IResponse } from '../interface/IResponse';

export class ItemService {
  static stockIn(params: StockInFormInterface) {
    return request('item/stock-in', params) as Promise<IResponse>;
  }

  static findBySn(sn: string) {
    return request(`item/find-by-sn`, { sn }, 'POST');
  }
}
