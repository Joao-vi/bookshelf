export interface APIResponse {
  title: string;
  subtitle: string;
  authors: any[];
  publisher: string;
  publishedDate: string;
  description: string;
  industryIdentifiers: any[];
  imageLinks: ImageLinks;
  language: string;
}

type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
};
