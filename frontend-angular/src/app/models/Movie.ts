// const moment = require('moment');
import { Transform } from 'class-transformer';
import * as moment from 'moment';

export class Movie {
	id!: number;
	name!: string;
	year?: number;
	lenght?: number;
	description?: string;
	posterUrls: string[];
	trailerUrls?: string[];
	directors?: number[];
	writers?: number[];
	cast?: number[];
	
	@Transform(({ value }) => value.some((v: any) => Object.hasOwnProperty.call(v, 'genre')) ? value.map((v: any) => v.genre.id, { toClassOnly: true }) : value)
	genres?: number[];
	createdAt!: Date;
	updatedAt!: Date;
	
	get lengthHumanized() {
		return moment.duration(this.lenght).humanize();
	}
}
