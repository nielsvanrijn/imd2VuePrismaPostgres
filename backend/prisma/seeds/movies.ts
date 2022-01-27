export const movies = [
    {
        name: 'The Man With The Golden Code',
        year: 2020,
        lenght: 94,
        description: 'Bond is back in this new movie!',
        genres: {
            createMany: {
                skipDuplicates: true,
                data: [{genreId: 1}, {genreId: 2}, {genreId: 4}]
            }
        },
        posterUrls: ['https://upload.nielsapps.com/uploads/domains/localhost/8.jpg'],
		
    },
    {
        name: 'The Man With The Golden Code 2',
        year: 2021,
        lenght: 91,
        description: 'Bond is captured by the man with the golden code.',
        genres: {
            createMany: {
                skipDuplicates: true,
                data: [{genreId: 1}, {genreId: 2}, {genreId: 4}]
            }
        },
        posterUrls: ['https://upload.nielsapps.com/uploads/domains/localhost/8.jpg'],
		
    }
];