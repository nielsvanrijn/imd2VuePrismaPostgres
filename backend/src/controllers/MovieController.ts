import { Request, Response } from 'express';

import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create a single Movie
// export const createMovie = async (req: Request<core.ParamsDictionary, any, MovieWithRelations>, res: Response) => {
export const createMovie = async (req: Request, res: Response) => {
    const { name, year, length, description, posterUrls, trailerUrls, directors, writers, cast, genres } = req.body;

    try {
        const movie = await prisma.movie.create({
            data: {
                name, 
                year,
                length,
                description,
                posterUrls,
                trailerUrls,
                directors: {
                    createMany: {
                        skipDuplicates: true,
                        data: directors ? directors.map((personId: number) => ({personId})) : []
                    }
                },
                writers: {
                    createMany: {
                        skipDuplicates: true,
                        data: writers ? writers.map((personId: number) => ({personId})) : []
                    }
                },
                cast: {
                    createMany: {
                        skipDuplicates: true,
                        data: cast ? cast.map((personId: number) => ({personId})) : []
                    }
                },
                genres: {
                    createMany: {
                        skipDuplicates: true,
                        data: genres ? genres.map((genreId: number) => ({genreId})) : []
                    }
                }
            }
        });
        
        return res.json(movie);
    } catch(e) {
        console.log(e);
        return res.status(500).send({ ok: false});
    }
};


// Get all Movies
export const getMovies = async (req: Request, res: Response) => {

    try {
        const movies = await prisma.movie.findMany({
            include: {
                directors: true,
                writers: true,
                cast: true,
                genres: true,
            }
        });
        return res.json(movies);
    } catch(e) {
        console.log(e);
        return res.status(500).send({ ok: false});
    }
};

// Get a single Movie
export const getMovie = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const movie = await prisma.movie.findUnique({
            where: { id: Number(id) },
            include: {
                directors: {
                    select: {
                        person: {
                            select: {
                                id: true,
                            }
                        }
                    }
                },
                writers: {
                    select: {
                        person: {
                            select: {
                                id: true,
                            }
                        }
                    }	
                },
                cast: {
                    select: {
                        characterId: true,
                        movieId: true,
                        personId: true,
                        person: {
                            select: {
                                id: true,
                                firstName: true,
                                lastName: true,
                                avatarUrl: true,
                            }
                        }
                    }
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                id: true,
                            }
                        }
                    }
                },
            }
        });

        if (!movie) {
            return res.status(404).send('Not Found');
        }

        return res.json(movie);
    } catch(e) {
        console.log(e);
        return res.status(500).send({ ok: false});
    }
};

// Update a single Movie
export const updateMovie = async (req: Request, res: Response) => {
    const { name, year, length, description, directors, writers, cast, genres, person, character } = req.body;
    const { id } = req.params;

    try {
        const [movie, person] = await prisma.$transaction([
            prisma.movie.update({
                where: {
                    id: +id
                },
                data: {
                    name,
                    year,
                    length,
                    description,
                    directors: {
                        createMany: {
                            skipDuplicates: true,
                            data: directors ? directors.map((directorsObj: {id: number}) => ({personId: directorsObj.id})) : []
                        }
                    },
                    writers: {
                        createMany: {
                            skipDuplicates: true,
                            data: writers ? writers.map((writersObj: {id: number}) => ({personId: writersObj.id})) : []
                        }
                    },
                    cast: {
                        upsert: cast ? cast.map((castObj: any) => ({
                            where: {
                                movieId_personId: {
                                    movieId: castObj.movieId,
                                    personId: castObj.personId
                                }
                            },
                            update: {
                                personId: castObj.personId,
                                // person: castObj.person,
                                characterId: castObj.character.id,
                                // character: castObj.character,
                            },
                            create: {
                                personId: castObj.personId,
                                // person: castObj.person,
                                characterId: castObj.character.id,
                                // character: castObj.character,
                            }
                        })) : [],
                        // connectOrCreate: cast ? cast.map((castObj: any) => ({
                        //     where: {
                        //         movieId_personId: {
                        //             movieId: castObj.movieId,
                        //             personId: castObj.personId
                        //         }
                        //     },
                        //     create: {
                        //         personId: castObj.personId,
                        //         characterId: castObj.character.id
                        //     }
                        // })) : [],
                        // updateMany: cast ? cast.map((castObj: any) => ({
                        //     where: {movieId: castObj.movieId, personId: castObj.personId, characterId: castObj.character.id},
                        //     data:  {personId: castObj.personId, characterId: castObj.character.id}
                        // })) : [],
                        // createMany: {
                        //     data: cast ? cast.map((castObj: {personId: 3, character: {id: number}}) => ({personId: castObj.personId, characterId: castObj.character.id})) : []
                        // }
                    },
                    genres: {
                        createMany: {
                            skipDuplicates: true,
                            data: genres ? genres.map((genreObj: {id: number}) => ({genreId: genreObj.id})) : []
                        }
                    }
                }
            }),
            ...cast.map((castObj: any) => prisma.person.update({
                where: { id: castObj.personId },
                data: {
                    character: {
                        upsert: [{
                            where: { personId_characterId: {personId: castObj.personId, characterId: castObj.character.id} },
                            create: {
                                characterId: castObj.character.id
                            },
                            update: {
                                characterId: castObj.character.id
                            },
                        }]
                    }
                }
            }))
        ]);
        // const movie = await prisma.movie.update({
        //     where: {
        //         id: +id
        //     },
        //     data: {
        //         name,
        //         year,
        //         length,
        //         description,
        //         directors: {
        //             createMany: {
        //                 skipDuplicates: true,
        //                 data: directors ? directors.map((directorsObj: {id: number}) => ({personId: directorsObj.id})) : []
        //             }
        //         },
        //         writers: {
        //             createMany: {
        //                 skipDuplicates: true,
        //                 data: writers ? writers.map((writersObj: {id: number}) => ({personId: writersObj.id})) : []
        //             }
        //         },
        //         cast: {
        //             upsert: cast ? cast.map((castObj: any) => ({
        //                 where: {
        //                     movieId_personId: {
        //                         movieId: castObj.movieId,
        //                         personId: castObj.personId
        //                     }
        //                 },
        //                 update: {
        //                     personId: castObj.personId,
        //                     // person: castObj.person,
        //                     characterId: castObj.character.id,
        //                     // character: castObj.character,
        //                 },
        //                 create: {
        //                     personId: castObj.personId,
        //                     // person: castObj.person,
        //                     characterId: castObj.character.id,
        //                     // character: castObj.character,
        //                 }
        //             })) : [],
        //             // connectOrCreate: cast ? cast.map((castObj: any) => ({
        //             //     where: {
        //             //         movieId_personId: {
        //             //             movieId: castObj.movieId,
        //             //             personId: castObj.personId
        //             //         }
        //             //     },
        //             //     create: {
        //             //         personId: castObj.personId,
        //             //         characterId: castObj.character.id
        //             //     }
        //             // })) : [],
        //             // updateMany: cast ? cast.map((castObj: any) => ({
        //             //     where: {movieId: castObj.movieId, personId: castObj.personId, characterId: castObj.character.id},
        //             //     data:  {personId: castObj.personId, characterId: castObj.character.id}
        //             // })) : [],
        //             // createMany: {
        //             //     data: cast ? cast.map((castObj: {personId: 3, character: {id: number}}) => ({personId: castObj.personId, characterId: castObj.character.id})) : []
        //             // }
        //         },
        //         genres: {
        //             createMany: {
        //                 skipDuplicates: true,
        //                 data: genres ? genres.map((genreObj: {id: number}) => ({genreId: genreObj.id})) : []
        //             }
        //         }
        //     }
        // });
        
        return res.json(movie);
    } catch(e) {
        console.log(e);
        return res.status(500).send({ ok: false});
    }
};

// Delete a single Movie
export const deleteMovie = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        await prisma.movie.delete({
            where: {
                id: +id
            }
        });
    
        return res.json({ ok: true });
    } catch(e) {
        console.log(e);
        return res.status(500).send({ ok: false});
    }
};


// Test
export const test = async (req: Request, res: Response) => {
    try {
        const movie = await prisma.movie.findUnique<Prisma.MovieFindUniqueArgs>({
            where: {
                id: 1
            },
            include: {
                directors: true,
                writers: true,
                cast: {
                    select: {
                        person: {
                            select: {
                                firstName: true,
                                lastName: true,
                            }
                        },
                        character: {
                            select: {
                                firstName: true,
                                lastName: true,
                            }
                        }
                    }
                },
                genres: {
                    select: {
                        genre: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });
    
        return res.json(movie);
    } catch(e) {
        console.log(e);
        return res.status(500).send({ ok: false});
    }
};