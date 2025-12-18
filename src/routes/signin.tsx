import { auth } from "@/lib/auth";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/signin")({
	component: RouteComponent,
});

async function RouteComponent() {
	const _signIn = async () => {
		await auth.api.signInEmail({
			body: {
				email: "user@email.com",
				password: "password",
			},
		});
	};
	return <div>Hello "/signin"!</div>;
}
