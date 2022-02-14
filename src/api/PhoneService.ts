import { request } from '../utils/axios';

export class PhoneService {
  static findAll() {
    return request('phone/findAll', {}, 'GET');
  }

  static findBrandName() {
    return request('phone/find-brand-name', {}, 'GET');
  }
}
