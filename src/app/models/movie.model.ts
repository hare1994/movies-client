export interface Movie {
  Id: string,
  Title: string,
  ImageUrl?: string,
  Description?: string,
  Rating?: number,
  Year?: number,
  Runtime?: string,
  Genres: string[],
  isFavorite?: boolean
}
