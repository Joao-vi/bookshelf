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
