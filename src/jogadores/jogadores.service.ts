import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateJogadorDto } from './dtos/create-jogador.dtos';
import { Jogador } from './interfaces/jogador.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    private jogadores: Jogador[] = [];

    private logger = new Logger(JogadoresService.name)

    async deleteJogadorByEmail(email: string): Promise<any> {
       const jogador = await this.jogadorModel.findOne({email}).exec();

        this.validateJogadore(jogador, email);
        this.logger.log(`Delete Jogador: ${JSON.stringify(jogador)}`)
        return await this.jogadorModel.deleteOne({email}).exec();
    }



    async createUpdateJogador(jogadorDto: CreateJogadorDto): Promise<Jogador> {

        const { email } = jogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        if (jogadorEncontrado) {
           return await this.update(jogadorDto);
        } else {

           return await this.create(jogadorDto);
        }
    }

    private async update( jogadorDto: CreateJogadorDto): Promise<any> {
        this.logger.log(`Update jogador: ${JSON.stringify(jogadorDto)}`)
        return await this.jogadorModel.findOneAndUpdate({email: jogadorDto.email}, {$set: jogadorDto}).exec();
    }

    async getJogadores(email: string): Promise<Jogador[] | Jogador> {
        if (email) {
            return await this.getByEmail(email);
        }
        return await this.jogadorModel.find().exec();
    }
    private async getByEmail(email: string): Promise<Jogador> {
       
        return await this.jogadorModel.findOne({email}).exec();

    }
    private validateJogadore(jogador: Jogador, email: string) {
        if (!jogador) {

            throw new NotFoundException(`Jogador com e-mail: ${email}, não encontrado`);
        }
    }

    private async create(jogadorDto: CreateJogadorDto): Promise<Jogador> {

        const jogador = new this.jogadorModel(jogadorDto);
        this.logger.log(`createUpdateJogador(): Jogador:  ${JSON.stringify(jogador)}`);

        return await jogador.save();

    }

}
