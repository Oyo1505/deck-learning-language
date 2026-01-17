import prisma from "@/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { tanstackStartCookies } from "better-auth/tanstack-start";
export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),
	user: {
		deleteUser: {
			enabled: true,
		},
	},
	emailAndPassword: {
		enabled: true,
		async sendResetPassword(data, request) {
			// Send an email to the user with a link to reset their password
			console.log("Reset password link:", data, request);
		},
		autoSignIn: false,
	},
	plugins: [tanstackStartCookies()],
	trustedOrigins: [process.env.BASE_URL as string],
	session: {
		expiresIn: 604800, // 7 days
		updateAge: 86400, // 1 day
		cookieCache: {
			enabled: true,
			maxAge: 1800, // 30 minutes
		},
	},
});
