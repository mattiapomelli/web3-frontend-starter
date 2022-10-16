import { ApiService } from "./api-service";
import { Entity } from "./types";

export interface User extends Entity {
  name: string;
  surname: string;
  email: string;
  username: string;
  isAdmin: boolean;
  verified: boolean;
}

interface UserCreateBody
  extends Pick<User, "name" | "surname" | "email" | "username"> {
  terms: boolean;
  password: string;
  confirmPassword: string;
}

const nonUpdatableFields = [
  "_id",
  "createdAt",
  "updatedAt",
  "isAdmin",
  "email",
  "verified",
] as const;

type UserUpdateBody = Omit<User, typeof nonUpdatableFields[number]>;

export const getUpdatableFields = (user: User) => {
  const updatableUser = { ...user };

  for (const key of Object.keys(updatableUser)) {
    if ((nonUpdatableFields as ReadonlyArray<string>).includes(key)) {
      delete updatableUser[key as keyof UserUpdateBody];
    }
  }

  return updatableUser;
};

export class UserService extends ApiService {
  async create(data: UserCreateBody) {
    return await this.http.post(this.baseUrl, data);
  }

  async read(username: string) {
    return await this.http.get(`${this.baseUrl}/${username}`);
  }

  async me() {
    return await this.http.get<User>(`${this.baseUrl}/me`);
  }

  async update(data: UserUpdateBody) {
    return await this.http.put<UserUpdateBody, User>(
      `${this.baseUrl}/me`,
      data,
    );
  }
}
