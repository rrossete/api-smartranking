import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateJogadorDto } from './dtos/create-jogador.dtos';
import { UpdateJogadorDto } from './dtos/update-jogador.dtos ';
import { Jogador } from './interfaces/jogador.interface';

@Injectable()
export class JogadoresService {

    constructor(@InjectModel('Jogador') private readonly jogadorModel: Model<Jogador>) { }

    private logger = new Logger(JogadoresService.name)

    async deleteJogadorByEmail(_id: string): Promise<any> {

        const jogador = await this.jogadorModel.findById(_id).exec();
        this.validateJogador(jogador, _id);
        this.logger.log(`Delete Jogador: ${JSON.stringify(jogador)}`)
        return await this.jogadorModel.deleteOne({ _id }).exec();
    }



    async createJogador(jogadorDto: CreateJogadorDto): Promise<Jogador> {

        const { email } = jogadorDto;

        const jogadorEncontrado = await this.jogadorModel.findOne({ email }).exec();

        this.existJogadorWithEmail(jogadorEncontrado, email);
        return await this.create(jogadorDto);

    }
    private existJogadorWithEmail(jogadorEncontrado: Jogador & { _id: any; }, email: string) {
        if (jogadorEncontrado) {
            throw new BadRequestException(`A Jogador existent with this email ${email}`);
        }
    }

    async updateJogador(jogadorDto: UpdateJogadorDto, id: string): Promise<void> {

        const jogadorEncontrado = await this.jogadorModel.findById(id).exec();
        this.validateJogador(jogadorEncontrado, id);
        await this.update(jogadorDto, id);



    }

    private async update(jogadorDto: UpdateJogadorDto,_id: string): Promise<any> {
        this.logger.log(`Update jogador: ${JSON.stringify(jogadorDto)}`)
        await this.jogadorModel.findOneAndUpdate({ _id }, { $set: jogadorDto }).exec();
    }

    async getJogadores(): Promise<Jogador[]> {
        return await this.jogadorModel.find().exec();
    }

    async getJogadoresById(id: string): Promise<Jogador> {
        return await this.getById(id);

    }

    private async getById(id: string): Promise<Jogador> {

        return await this.jogadorModel.findById(id).exec();

    }
    private validateJogador(jogador: Jogador, id: string) {
        if (!jogador) {

            throw new NotFoundException(`Jogador com _id: ${id}, não encontrado`);
        }
    }

    private async create(jogadorDto: CreateJogadorDto): Promise<Jogador> {

        const jogador = new this.jogadorModel(jogadorDto);
        this.logger.log(`createUpdateJogador(): Jogador:  ${JSON.stringify(jogador)}`);

        return await jogador.save();
    }

}
