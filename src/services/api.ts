import axios from "axios";
import { BookProps } from "components/modules";
import { User } from "./auth";

export const booksAPI = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL_API,
  params: {
    key: import.meta.env.VITE_API_KEY,
  },
});

export type AddFavoritesProps = {
  username?: string;
  book: BookProps;
};

export const addFavorite = ({ book, username }: AddFavoritesProps) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(
        window.localStorage.getItem("users") || "[]"
      ) as User[];

      const isValid = users.some((user) => user.data.username === username);
      if (!isValid || !username) {
        return reject("User not found.");
      }

      const newState = users.map((user) => {
        const isUser = user.data.username === username;
        if (isUser) {
          const isAdded = user.data.favoriteBooks.some(
            (dbBook) => dbBook.id === book.id
          );
          if (isAdded) {
            const newUserData = {
              ...user,
              data: {
                ...user.data,
                favoriteBooks: user.data.favoriteBooks.filter(
                  (dbBook) => dbBook.id !== book.id
                ),
              },
            } as User;
            return newUserData;
          } else {
            const newUserData = {
              ...user,
              data: {
                ...user.data,
                favoriteBooks: [...user.data.favoriteBooks, book],
              },
            } as User;
            return newUserData;
          }
        } else {
          return user;
        }
      });

      window.localStorage.setItem("users", JSON.stringify(newState));
      resolve("afa");
    }, 500);
  });

export const getFavorites = (username: string) =>
  new Promise<User["data"]["favoriteBooks"]>((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(
        window.localStorage.getItem("users") || "[]"
      ) as User[];

      const userData = users.find((user) => user.data.username === username);

      if (!userData) {
        return reject("User not found on database");
      }

      return resolve(userData.data.favoriteBooks);
    }, 300);
  });
