export const debounce = <T>(callback: (e: T) => void, timeout: number) => {
  let timer: number | undefined;

  return (args: T) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(args);
    }, timeout);
  };
};
