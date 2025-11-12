import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  getData() {
    return { message: 'API از Nest جواب داد' };
  }
}
