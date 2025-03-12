export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: string;
  status: "active" | "injured" | "suspended" | "inactive";
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: "player" | "coach" | "admin";
  sex: "male" | "female";
  state: string;
  address: string;
  dob: string;
  phone: string;
  nickname?: string;
  picture?: string;
  positions?: string[];
  bio?: string;
}

export type SignUpData = Omit<User, "id">;
export type SignInData = Pick<User, "email"> & { password: string };
