import { Module } from '@nestjs/common';
import { AxiosAdapter } from './httpadapters/axios.adapter';

@Module({
    providers: [AxiosAdapter],
    exports: [AxiosAdapter]
})
export class CommonModule {}
