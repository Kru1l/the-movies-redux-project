interface IGenre {
    id: number,
    name: string
}

interface IGenreData {
    genres: IGenre[]
}

export type {
    IGenre,
    IGenreData
};