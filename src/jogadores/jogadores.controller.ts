import { UpdateJogadorDto } from './dtos/update-jogador.dtos ';
import { JogadoresValidationParametersPipe } from './pipes/jogadores-validation-parameters.pipe';
import { Jogador } from './interfaces/jogador.interface';
import { JogadoresService } from './jogadores.service';
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dtos';

@Controller('/api/v1/jogadores')
export class JogadoresController {

    constructor(private readonly jogadoresService: JogadoresService){}

    @Post()
    @UsePipes(ValidationPipe)
    async createJogador(@Body() jogadorDto: CreateJogadorDto) : Promise<Jogador> {
        return await this.jogadoresService.createJogador(jogadorDto)
    }

    @Put("/:id")
    async updateJogador(@Param("id") id: string, @Body() jogadorDto: UpdateJogadorDto): Promise<void>{
         await this.jogadoresService.updateJogador(jogadorDto, id)
    }

    @Get() 
    async getJogadores(): Promise<Jogador[]>{
       return await this.jogadoresService.getJogadores();
    }

    @Get("/:id") 
    async getJogadoresByEmail(@Param('id') id: string): Promise< Jogador>{
        
       return await this.jogadoresService.getJogadoresById(id);
    }

    @Delete("/:id")
    async deleteJogadorByEmail(@Param('id') id: string) : Promise<void>{

       await this.jogadoresService.deleteJogadorByEmail(id);
    }
}
