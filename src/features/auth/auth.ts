export type User = {
  id: string;
  name: string;
  role: "Editor" | "Contributor";
  email: string;
};

export type UserWithCredentials = User & {
  password: string;
};

export const toUser = ({ password: _password, ...user }: UserWithCredentials) =>
  user;
