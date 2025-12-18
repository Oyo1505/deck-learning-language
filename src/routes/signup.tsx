import { authClient } from "@/lib/auth-client";
import { formOpts } from "@/utils/signup/signup-isomorphic";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

function RouteComponent() {
	const form = useForm({
		defaultValues: formOpts.defaultValues,
		onSubmit: async ({ value }) => {
			// Do something with form data

			const { data, error } = await authClient.signUp.email(
				{
					email: value.email, // user email address
					name: value.name,
					password: value.password, // user password -> min 8 characters by default
					callbackURL: "/", // A URL to redirect to after the user verifies their email (optional)
				},
				{
					onRequest: (_ctx) => {
						//show loading
						console.log("Signup request started");
					},
					onSuccess: (_ctx) => {
						console.log("Signup successful");
						redirect({ to: "/signin", throw: true });
					},
					onError: (ctx) => {
						// display the error message

						alert(ctx.error.message);
					},
				},
			);
			console.log(data, error);
		},
	});

	return (
		<div>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
			>
				<label htmlFor="name">Name:</label>
				<form.Field name="name">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<div>
								<input
									aria-invalid={isInvalid}
									type="text"
									required
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</div>
						);
					}}
				</form.Field>
				<br />
				<label htmlFor="email">Email:</label>
				<form.Field name="email">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<div>
								<input
									aria-invalid={isInvalid}
									type="email"
									required
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</div>
						);
					}}
				</form.Field>

				<label htmlFor="email">Email:</label>
				<form.Field name="email">
					{(field) => {
						const isInvalid =
							field.state.meta.isTouched && !field.state.meta.isValid;
						return (
							<div>
								<input
									aria-invalid={isInvalid}
									type="email"
									required
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</div>
						);
					}}
				</form.Field>
				<br />
				<form.Field name="password">
					{(field) => (
						<label>
							<div>Password</div>
							<input
								value={field.state.value}
								type="password"
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</label>
					)}
				</form.Field>
				<form.Field
					name="confirmPassword"
					validators={{
						onChangeListenTo: ["password"],
						onChange: ({ value, fieldApi }) => {
							if (
								value !== fieldApi.form.getFieldValue("password") &&
								value.length
							) {
								return "Passwords do not match";
							}
							return undefined;
						},
					}}
				>
					{(field) => (
						<div>
							<label>
								<div>Confirm Password</div>
								<input
									required
									type="password"
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</label>
							{field.state.meta.errors.map((err) => (
								<div key={err} className="text-red-500">
									{err}
								</div>
							))}
						</div>
					)}
				</form.Field>
				<br />
				<button type="submit">Sign Up</button>
			</form>
		</div>
	);
}
