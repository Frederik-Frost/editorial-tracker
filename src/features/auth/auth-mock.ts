import type { UserWithCredentials } from "./auth";

export const users: UserWithCredentials[] = [
  {
    id: "editor-1",
    name: "Anja Andersen",
    role: "Editor",
    email: "editor@frihedsbrevet.dk",
    password: "Cedar!Orbit7-Fable",
  },
  {
    id: "contributor-1",
    name: "Anders Andersen",
    role: "Contributor",
    email: "contributor@frihedsbrevet.dk",
    password: "Velvet#Harbor42-Mint",
  },
];
