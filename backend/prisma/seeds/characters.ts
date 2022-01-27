export const characters = [
    {
        firstName: 'James',
        lastName: 'Bond',
        birthday: new Date('1943-08-10'),
        bio: 'Shaken, not stirred',
        cast: {
            createMany: {
                skipDuplicates: true,
                data: [
                    {
                        movieId: 1,
                        personId: 1
                    },
                    {
                        movieId: 2,
                        personId: 2
                    },
                ]
            }
        },
        persons: {
            createMany: {
                skipDuplicates: true,
                data: [
                    {
                        personId: 1
                    },
                    {
                        personId: 2
                    },
                ]
            }
        }
    }
];