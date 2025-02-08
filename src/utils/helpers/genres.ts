import { Genre } from "@/types"

export function nestGenres(genres: Genre[]): Genre[] {
  const genreMap = new Map<number, Genre>();

  genres.forEach(genre => {
    genreMap.set(genre.databaseId, { ...genre, children: [] });
  });

  const nestedGenres: Genre[] = [];

  genres.forEach(genre => {
    if (genre.parentDatabaseId === null) {
      nestedGenres.push(genreMap.get(genre.databaseId)!);
    } else {
      const parentGenre = genreMap.get(genre.parentDatabaseId);

      if (parentGenre) {
        parentGenre.children!.push(genreMap.get(genre.databaseId)!);
      }
    }
  });

  return nestedGenres;
}
