import { Global, Module } from '@nestjs/common';
import { HashingServiceProcol } from './hash/hashing.service';
import { BcryptService } from './hash/bcrypt.service';
@Global() // pode ser usado na app inteira 
@Module({
  providers:[
    {
      provide: HashingServiceProcol,
      useClass: BcryptService
    }
  ],
  exports:[
    HashingServiceProcol
  ]

})
export class AuthModule {}
