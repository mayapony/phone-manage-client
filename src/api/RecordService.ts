import { CreateRecordsDto } from '../dto/createRecordsDto';
import { request } from '../utils/axios';
import { SearchRecordsDto } from '../dto/searchRecordsDto';

export class RecordService {
  static createRecords(createRecordsDto: CreateRecordsDto) {
    return request('record/create-records', createRecordsDto);
  }

  static findRecords(searchRecordsDto: SearchRecordsDto) {
    return request('record/find-records', searchRecordsDto, 'POST');
  }
}
