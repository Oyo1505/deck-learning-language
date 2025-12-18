import {
	createServerValidate,
	getFormData,
	ServerValidateError,
} from "@tanstack/react-form-start";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { formOpts } from "./signup-isomorphic";

const serverValidate = createServerValidate({
	...formOpts,
	onServerValidate: ({ value }) => {
		console.log("Server validating", value);
		if (value.password !== value.confirmPassword) {
			return "Server validation: Passwords do not match";
		}
	},
});

export const handleForm = createServerFn({ method: "POST" })
	.inputValidator((data: unknown) => {
		if (!(data instanceof FormData)) {
			throw new Error("Invalid form data");
		}
		return data;
	})
	.handler(async (ctx) => {
		try {
			const validatedData = await serverValidate(ctx.data);
			console.log("validatedData", validatedData);
		} catch (e) {
			if (e instanceof ServerValidateError) {
				// Log form errors or do any other logic here
				return e.response;
			}

			setResponseStatus(500);
			return "There was an internal error";
		}

		return "Form has validated successfully";
	});

export const getFormDataFromServer = createServerFn({ method: "GET" }).handler(
	async () => {
		return getFormData();
	},
);
