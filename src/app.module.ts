import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    JogadoresModule,
    MongooseModule.forRoot('mongodb+srv://admin:nGRoUQkQLm2zr2N3@cluster0.fqkjv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
