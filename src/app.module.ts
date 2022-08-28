import { join } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
//forRoots únicamente se deben hacer en el módulo raíz
@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest-pokemon'),
    CommonModule,
    SeedModule,
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
