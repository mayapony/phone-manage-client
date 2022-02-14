import { request } from '../utils/axios';
import { StockInFormInterface } from '../interface/stock-in-form.interface';

export class PhoneService {
  static findAll() {
    return request('phone/findAll', {}, 'GET');
  }

  static findBrandName() {
    return request('phone/find-brand-name', {}, 'GET');
  }

  static findMedal(stockInForm: StockInFormInterface) {
    return request('phone/find-model', stockInForm);
  }

  static findColor(stockInForm: StockInFormInterface) {
    return request('phone/find-color', stockInForm);
  }
}
