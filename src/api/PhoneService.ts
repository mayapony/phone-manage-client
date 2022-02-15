import { request } from '../utils/axios';
import { StockInFormInterface } from '../interface/stock-in-form.interface';
import { PageState } from '../interface/page-state';

export class PhoneService {
  static findAll(pageState: PageState) {
    return request('phone/findAll', pageState);
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
