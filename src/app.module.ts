import { join } from 'path';

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';

import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { EnvConfiguration } from './config/env.config';
//forRoots únicamente se deben hacer en el módulo raíz
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [ EnvConfiguration ]
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.MONGO_DB),
    CommonModule,
    SeedModule,
    PokemonModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
