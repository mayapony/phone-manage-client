import { CreateRecordsDto } from '../dto/createRecordsDto';
import { request } from '../utils/axios';

export class RecordService {
  static createRecords(createRecordsDto: CreateRecordsDto) {
    return request('record/create-records', createRecordsDto);
  }

  static findRecords() {
    return request('record/find-records', {}, 'GET');
  }
}
