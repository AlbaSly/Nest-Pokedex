import * as https from "https";

import { Injectable } from '@nestjs/common';

import { PokemonService } from "src/pokemon/pokemon.service";
import { CreatePokemonDto } from "src/pokemon/dto/create-pokemon.dto";

import { PokeapiResponse } from "./interfaces/pokeapi-response.interface";
import { AxiosAdapter } from "src/common/httpadapters/axios.adapter";

@Injectable()
export class SeedService {
  
  private httpsAgent = new https.Agent({ rejectUnauthorized: false });

  public constructor(
    private readonly pokemonService: PokemonService,
    private readonly http: AxiosAdapter
  ) {}

  public async executeSeed() {
    this.pokemonService.fullRemove();

    const pokemons: CreatePokemonDto[] = [];

    const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon?limit=650', {httpsAgent: this.httpsAgent});

    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      
      const newPokemon: CreatePokemonDto = {
        name, 
        no: +segments[segments.length - 2]
      }
      
      pokemons.push(newPokemon);
    })

    await this.pokemonService.hardCreate(pokemons);

    return 'Seed executed sucessfully';
  }

}