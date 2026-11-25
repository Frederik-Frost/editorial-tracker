export type User = {
  id: string;
  name: string;
  role: "Editor" | "Contributor";
  email: string;
};

export type UserWithCredentials = User & {
  password: string;
};

export function toUser({ password: _password, ...user }: UserWithCredentials) {
  return user;
}
