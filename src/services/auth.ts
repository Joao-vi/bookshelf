type Props = {
  username: string;
  password: string;
};

type User = {
  username: string;
  password: string;
};

export const login = ({ username, password }: Props) =>
  new Promise<User>((resolve, rejected) => {
    setTimeout(() => {
      const users = JSON.parse(
        window.localStorage.getItem("users") || "[]"
      ) as User[];

      if (users.length === 0) {
        return rejected("Username not found.");
      }

      const authUser = users.find(
        (user) => user.password === password && user.username === username
      );

      if (!authUser) return rejected("Credentials provided are invalid.");

      resolve(authUser);
    }, 500);
  });

export const register = ({ username, password }: Props) =>
  new Promise((resolve, rejected) => {
    setTimeout(() => {
      const users = JSON.parse(
        window.localStorage.getItem("users") || "[]"
      ) as User[];

      const isUsernameAvailable = !users.some(
        (user) => user.username === username
      );
      const isPasswordAvailable = !users.some(
        (user) => user.password === password
      );

      if (!isUsernameAvailable) {
        return rejected("Username provided was already taken.");
      }

      const newUsers = [...users, { username, password }];
      window.localStorage.setItem("users", JSON.stringify(newUsers));
      resolve("Done");
    }, 500);
  });
