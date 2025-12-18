import { formOptions } from "@tanstack/react-form-start";

interface ISignUpForm {
	email: string;
	name: string;
	password: string;
	confirmPassword: string;
}
const defaultValues: ISignUpForm = {
	email: "",
	name: "",
	password: "",
	confirmPassword: "",
};
export const formOpts = formOptions({
	defaultValues: defaultValues,
});
