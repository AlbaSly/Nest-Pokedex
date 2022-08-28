import * as https from "https";

import { Injectable } from '@nestjs/common';

import axios, {AxiosInstance} from 'axios';
import { PokeapiResponse } from "./interfaces/pokeapi-response.interface";

@Injectable()
export class SeedService {
  private readonly axios: AxiosInstance = axios;

  private httpsAgent = new https.Agent({ rejectUnauthorized: false });

  public async executeSeed() {
    const { data } = await this.axios.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon?limit=650', {httpsAgent: this.httpsAgent});
    
    data.results.forEach(({name, url}) => {
      const segments = url.split('/');
      
      const newPokemon = {
        name, 
        no: segments[segments.length - 2]
      }
      
      console.log(newPokemon);
      
    })

    return data.results;
  }

}