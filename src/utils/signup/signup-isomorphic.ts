import { formOptions } from "@tanstack/react-form-start";

interface ISignUpForm {
	email: string;
	password: string;
	confirmPassword: string;
}
const defaultValues: ISignUpForm = {
	email: "",
	password: "",
	confirmPassword: "",
};
export const formOpts = formOptions({
	defaultValues: defaultValues,
});
