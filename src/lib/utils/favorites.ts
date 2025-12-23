//Count Favorites by Type
export function countFavorites(
  list: { type: "movies" | "series" }[],
  type: "movies" | "series"
) {
  return list.filter((f) => f.type === type).length;
}