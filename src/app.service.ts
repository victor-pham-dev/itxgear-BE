import { Injectable } from '@nestjs/common'

@Injectable()
export class AppService {
  getHello(): string {
    return 'Itx gear BE --> go to /api to read the docs'
  }
}
