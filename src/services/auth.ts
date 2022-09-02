import { BookProps } from "components/modules";

export type Props = {
  username: string;
  password: string;
};

export type Note = {
  bookId: string;
  notes: string;
};

export type UserData = {
  username: string;
  favoriteBooks: BookProps[];
  notes: Note[];
};

export type User = {
  password: string;
  token: string | undefined;
  data: UserData;
};

export const login = ({ username, password }: Props) =>
  new Promise<UserData>((resolve, rejected) => {
    setTimeout(() => {
      const users = JSON.parse(
        window.localStorage.getItem("users") || "[]"
      ) as User[];

      if (users.length === 0) {
        return rejected("Username not found.");
      }

      const isValid = users.some(
        (user) => user.password === password && user.data.username === username
      );

      if (!isValid) return rejected("Credentials provided are invalid.");

      const authToken = String(Math.random());

      const newStateUsers = users.map((user) => {
        if (user.data.username === username) {
          return {
            ...user,
            token: authToken,
          };
        } else return user;
      });

      const authUser = newStateUsers.find(
        (user) => user.data.username === username && user.password === password
      )!;

      window.localStorage.setItem("session", authToken);
      window.localStorage.setItem("users", JSON.stringify(newStateUsers));
      resolve(authUser.data);
    }, 500);
  });

export const register = ({ username, password }: Props) =>
  new Promise((resolve, rejected) => {
    setTimeout(() => {
      const users = JSON.parse(
        window.localStorage.getItem("users") || "[]"
      ) as User[];

      const isUsernameAvailable = !users.some(
        (user) => user.data.username === username
      );

      if (!isUsernameAvailable) {
        return rejected("Username provided was already taken.");
      }

      const newUsers = [
        ...users,
        { password, data: { username, favoriteBooks: [], notes: [] } },
      ];
      window.localStorage.setItem("users", JSON.stringify(newUsers));
      resolve("Done");
    }, 500);
  });

export const autoLogin = () =>
  new Promise<UserData>((resolve, reject) => {
    const userToken = window.localStorage.getItem("session");

    setTimeout(() => {
      const users = JSON.parse(
        window.localStorage.getItem("users") || "[]"
      ) as User[];

      const authUser = users.find((token) => token.token === userToken);

      if (!!authUser) {
        return resolve(authUser.data);
      }

      return reject("Your session has expired. Please relogin.");
    }, 500);
  });

export const updateNotes = (username: string, newNotes: Note) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem("users") || "[]") as User[];
      const userDb = users.find((user) => user.data.username === username);

      if (users.length <= 0 || !userDb)
        return reject("User not found on Database");

      const hasBookId = !!userDb.data.notes.some(
        (note) => note.bookId === newNotes.bookId
      );
      let newState: Note[];

      if (hasBookId) {
        newState = userDb.data.notes.map((note) => {
          if (note.bookId === newNotes.bookId) {
            return {
              ...note,
              notes: newNotes.notes,
            };
          }
          return note;
        });
      } else {
        newState = [
          ...userDb.data.notes,
          { bookId: newNotes.bookId, notes: newNotes.notes },
        ];
      }

      const newUsers = users.map((user) => {
        if (user.data.username === username) {
          return { ...user, data: { ...user.data, notes: newState } };
        }

        return user;
      });

      window.localStorage.setItem("users", JSON.stringify(newUsers));
      resolve(newState.find((note) => note.bookId === newNotes.bookId));
    }, 250);
  });
