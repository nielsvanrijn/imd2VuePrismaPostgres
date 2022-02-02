const https = require('https');
const fs = require('fs');
const stream = require('stream').Transform

// https://api.themoviedb.org/3/person/{person_id}?api_key=3cf4dec94433a30c9269c2739b12d77c
// https://api.themoviedb.org/3/person/popular?api_key=3cf4dec94433a30c9269c2739b12d77c
const url = 'https://api.themoviedb.org/3/';
const key = '3cf4dec94433a30c9269c2739b12d77c';

// firstName
// lastName
// birthday
// country
// bio
// avatarUrl

const download = function(uri, fileName){
	https.request(uri, function(response) { 
		var data = new stream();

		response.on('data', function(chunk) {
			data.push(chunk);
		});
		
		response.on('end', function() {
			fs.writeFileSync(`imgs${fileName}`, data.read());
		});
	}).end()
};

const imdbIds = ['nm0000138','nm0000093','nm0000354','nm0000206','nm0001618','nm0000136','nm0000288','nm0000158','nm0000226','nm0355910','nm1706767','nm3154303','nm0251986','nm0000437','nm0000375','nm0362766','nm0185819','nm0331516','nm0614165','nm3229685','nm0705356','nm0089217','nm0000120','nm0000151','nm0803889','nm0000129','nm0000128','nm0001557','nm0991810','nm0005458','nm0402271','nm0000190','nm0147147','nm1209966','nm0597388','nm0719637','nm1940449','nm0000154','nm0000228','nm0000134','nm0005351','nm0000255','nm0000353','nm0000197','nm0000216','nm0001570','nm0177896'];

imdbIds.forEach(imdbId => {
	// https://api.themoviedb.org/3/find/nm0000138?api_key=3cf4dec94433a30c9269c2739b12d77c&external_source=imdb_id
	https.get(`${url}find/${imdbId}?api_key=${key}&external_source=imdb_id`, (resp) => {
		let data = '';
		resp.on('data', (chunk2) => {
			data += chunk2;
		});
		resp.on('end', () => {
			const res = JSON.parse(data);
			console.log(res);
			// const avatarName = res.person_results[0].profile_path
			// download(`https://image.tmdb.org/t/p/original/${avatarName}`, avatarName);
			https.get(`${url}person/${res.person_results[0].id}?api_key=${key}`, (resp) => {
				let data2 = '';
				resp.on('data', (chunk2) => {
					data2 += chunk2;
				});
				resp.on('end', () => {
					const actor = JSON.parse(data2);
					console.log(actor);
					const placeOfBirth = /,\s([^,]*)$|,\s([^,]+),$/g.exec(actor.place_of_birth);
					const finalObj = {
						firstName: actor.name.split(' ')[0],
						lastName: actor.name.split(' ')[1] ? actor.name.split(' ').slice(1, actor.name.length).join(' ') : '',
						birthday: new Date(actor.birthday),
						country: placeOfBirth ? placeOfBirth[1] : '',
						bio: actor.biography,
						avatarUrl: `https://upload.nielsapps.com/uploads/domains/localhost${actor.profile_path}`
					};
					fs.appendFileSync('./res.txt', `${JSON.stringify(finalObj, null, 2)},\n`);
				});
			}).on('error', (err) => {
				console.log('Error: ' + err.message);
			});
		});
	}).on('error', (err) => {
		console.log('Error: ' + err.message);
	});
});

// [1,2,3,4,5,6,7,8,9,10].forEach(index => {
// 	// const index = 1;
// 	https.get(`${url}person/popular?page=${index}&api_key=${key}`, (resp) => {
// 		let data = '';
// 		let actors = [];
// 		resp.on('data', (chunk) => {
// 			data += chunk;
// 		});
// 		resp.on('end', () => {
// 			// console.log(JSON.parse(data, null, 2));
// 			const res = JSON.parse(data);
// 			res.results.forEach((result, i) => {
// 				// if (i === 0) {
// 					// console.log(result, i);
// 					// const avatarName = result.profile_path
// 					// download(`https://image.tmdb.org/t/p/original/${avatarName}`, avatarName);
// 					https.get(`${url}person/${result.id}?api_key=${key}`, (resp) => {
// 						let data2 = '';
// 						resp.on('data', (chunk2) => {
// 							data2 += chunk2;
// 						});
// 						resp.on('end', () => {
// 							const actor = JSON.parse(data2);
// 							console.log(actor);
// 							// ,\s([^,]*)$|,\s([^,]+),$
// 							// ,\s(?<country>[^,]*)$|,\s(?<country>[^,]+),$
// 							const placeOfBirth = /,\s([^,]*)$|,\s([^,]+),$/g.exec(actor.place_of_birth);
// 							const finalObj = {
// 								firstName: actor.name.split(' ')[0],
// 								lastName: actor.name.split(' ')[1] ? actor.name.split(' ').slice(1, actor.name.length).join(' ') : '',
// 								birthday: new Date(actor.birthday),
// 								country: placeOfBirth ? placeOfBirth[1] : '',
// 								bio: actor.biography,
// 								avatarUrl: `https://upload.nielsapps.com/uploads/domains/localhost${actor.profile_path}`
// 							};
// 							fs.appendFileSync('./res.txt', `${JSON.stringify(finalObj, null, 2)},\n`);
// 						});
					
// 					}).on('error', (err) => {
// 						console.log('Error: ' + err.message);
// 					});
// 				// }
// 			});
// 		});
	
// 	}).on('error', (err) => {
// 		console.log('Error: ' + err.message);
// 	});
// });