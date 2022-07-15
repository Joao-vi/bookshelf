export type Props = {
  username: string;
  password: string;
};

export type UserData = {
  username: string;
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

      const newUsers = [...users, { password, data: { username } }];
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
