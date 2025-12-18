export type Episode = {
  _id: string;
  series: string;
  season: string;
  episodeNumber: number;
  title: string;
  overview: string;
  runtime?: number;
  videoUrl: string;
};
