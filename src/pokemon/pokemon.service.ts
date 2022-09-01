import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { DeleteResult } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  public constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel: Model<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase().trim();
    
    try {
      const pokemonCreated = await this.pokemonModel.create<CreatePokemonDto>(createPokemonDto);
      return pokemonCreated;

    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async hardCreate(createPokemonDto: CreatePokemonDto[]) {
    try {
      await this.pokemonModel.insertMany(createPokemonDto);

      return 'Hard insert done';
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(paginationDto: PaginationDto) {

    const { limit = 10, offset = 0} = paginationDto;
  
    let pokemons: Pokemon[] = await this.pokemonModel.find().limit(limit).skip(offset).sort({no: 1}).select('-__v');

    return pokemons;
  }

  async findOne(term: string) {
    const searchDictionary: object = {
      ...(!isNaN(+term) && {no: term}),
      ...(isValidObjectId(term) && {_id: term}),
      ...(isNaN(+term) && !isValidObjectId(term) && {name: term})
    }

    const pokemonFound: Pokemon = await this.pokemonModel.findOne(searchDictionary);
 
    if (!pokemonFound) throw new NotFoundException(`Pokemon with ${JSON.stringify(searchDictionary)} not found`);
 
    return pokemonFound;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemonFound: Pokemon = await this.findOne(term);

    if (updatePokemonDto.name) updatePokemonDto.name = updatePokemonDto.name.toLowerCase().trim();  

    // Object.assign(pokemonFound, {...updatePokemonDto});

    // await pokemonFound.save();
    try {
      await pokemonFound.updateOne(updatePokemonDto, {new: true});
  
      //Si nos aseguramos que se encontró el pokemón a actualizar y ya se ha actualizado podemos mezclar la data del pokemón encontrado y unirla con los datos que modificamos
      return {
        ...pokemonFound.toJSON(),
        ...updatePokemonDto
      };
    } catch (error: any) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    let info: DeleteResult = await this.pokemonModel.deleteOne({_id: id});

    if (!info.deletedCount) throw new NotFoundException(`Pokemon with id "${id}" not found for deletion`);

    return info;
  }

  async fullRemove() {
    await this.pokemonModel.deleteMany({});

    return 'Pokemon Collection has been deleted successfully';
  }

  private handleExceptions(error: any): void {
    if (error.code == 11000) {
      throw new BadRequestException(`Pokemon exists in db ${ JSON.stringify( error.keyValue ) }`);
    }

    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`);
  }
}
