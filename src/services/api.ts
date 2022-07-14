export interface Books {
  volumeInfo: {
    title: string;
    subtitle: string;
    authors: string[];
    publisher: string;
    publishedDate: string;
    description?: string;
    imageLinks: ImageLinks;
    language: string;
    categories: string[];
    pageCount: number;
  };
}

type ImageLinks = {
  smallThumbnail: string;
  thumbnail: string;
};

export interface ResponseAPI {
  kind: string;
  totalItems: number;
  items: Books[];
}

export const client = <T>(
  endpoint: string,
  customConfig?: RequestInit
): Promise<T> => {
  const config: RequestInit = {
    method: "GET",
    ...customConfig,
  };
  return window
    .fetch(
      `${import.meta.env.VITE_BASE_URL_API}/${endpoint}
    )}&key=${import.meta.env.VITE_API_KEY}`,
      config
    )
    .then(async (response) => {
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);
      }
    });
};
