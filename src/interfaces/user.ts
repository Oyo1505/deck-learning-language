import type { User } from "better-auth";

interface IUser extends User {
	isActive: boolean;
}
export type { IUser };
