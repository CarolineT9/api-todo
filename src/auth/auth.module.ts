import { Module } from '@nestjs/common';
import { HashingServiceProcol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';

@Module({
  providers:[
    {
      provide: HashingServiceProcol,
      useClass: BcryptService
    }
  ]

})
export class AuthModule {}
