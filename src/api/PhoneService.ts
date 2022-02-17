import { request } from '../utils/axios';
import { StockInFormInterface } from '../interface/stock-in-form.interface';
import { PageState } from '../interface/page-state';
import { FindCondition } from '../interface/phone/find-condition';

export class PhoneService {
  static findAll(findCondition: any) {
    return request('phone/findAll', findCondition);
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
