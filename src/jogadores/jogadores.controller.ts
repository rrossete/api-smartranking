import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dtos';

@Controller('/api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    async createUpdateJogador(@Body() jogadorDto: CreateJogadorDto) {

        await this.jogadoresService.createUpdateJogador(jogadorDto)
    }

    @Get() 
    async getJogadores(@Query('email') email: string): Promise<Jogador[] | Jogador>{
       return await this.jogadoresService.getJogadores(email);
    }

    @Delete('/:email')
    async deleteJogadorByEmail(@Param('email') email: string){

       await this.jogadoresService.deleteJogadorByEmail(email);
    }
}
