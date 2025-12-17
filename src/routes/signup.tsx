import { formOpts } from "@/utils/signup/signup-isomorphic";
import { useForm } from "@tanstack/react-form";
import { createFileRoute } from "@tanstack/react-router";
import { signUpEmail } from "better-auth/api";

export const Route = createFileRoute("/signup")({
	component: RouteComponent,
});

async function RouteComponent() {
	const form = useForm({
		defaultValues: formOpts.defaultValues,
		onSubmit: async ({ value }) => {
			// Do something with form data
			console.log(value);
		},
	});
	signUpEmail();
	return (
		<div>
			<form>
				<label htmlFor="email">Email:</label>
				<form.Field name="email">
					{(field) => (
						<div>
							<input
								type="email"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.value)}
							/>
						</div>
					)}
				</form.Field>
				<br />
				<form.Field name="password">
					{(field) => (
						<label>
							<div>Password</div>
							<input
								value={field.state.value}
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
							if (value !== fieldApi.form.getFieldValue("password")) {
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
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
								/>
							</label>
							{field.state.meta.errors.map((err) => (
								<div key={err}>{err}</div>
							))}
						</div>
					)}
				</form.Field>
				<br />
				<button type="submit" onClick={form.handleSubmit}>
					Sign Up
				</button>
			</form>
		</div>
	);
}
