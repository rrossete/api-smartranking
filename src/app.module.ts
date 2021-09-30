import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot('mongourl',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
