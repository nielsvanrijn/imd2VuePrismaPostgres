import { Expose, Transform } from 'class-transformer';
import { Cast } from './Cast';
import { Genre } from './Genre';

export class Movie {
	id!: number;
	name!: string;
	year?: number;
	length?: number;
	description?: string;
	posterUrls: string[];
	trailerUrls?: string[];

	@Transform(({ value }) => value.some((v: any) => Object.hasOwnProperty.call(v, 'person')) ? value.map((v: any) => v.person, { toClassOnly: true }) : value)
	directors?: number[];

	@Transform(({ value }) => value.some((v: any) => Object.hasOwnProperty.call(v, 'person')) ? value.map((v: any) => v.person, { toClassOnly: true }) : value)
	writers?: number[];

	cast: Cast[];

	@Transform(({ value }) => value.some((v: any) => Object.hasOwnProperty.call(v, 'genre')) ? value.map((v: any) => v.genre, { toClassOnly: true }) : value)
	genres?: Genre[];
	
	createdAt!: Date;
	updatedAt!: Date;

	get hasPoster(): boolean {
		return this.posterUrls && this.posterUrls.length > 0;
	}
}
