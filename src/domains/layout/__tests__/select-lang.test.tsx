import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import SelectLang from "../components/select-lang";

// Mock react-i18next
const mockChangeLanguage = jest.fn();
jest.mock("react-i18next", () => ({
	useTranslation: () => ({
		i18n: {
			language: "en",
			changeLanguage: mockChangeLanguage,
		},
		t: (key: string) => key,
	}),
}));

describe("Select Language Component", () => {
	it("should render SelectLang component", () => {
		render(<SelectLang />);
	});

	it("should have SelectLang text", () => {
		render(<SelectLang />);
		const select = screen.getByTestId("select-lang");
		expect(select).toBeInTheDocument();
	});

	it("should have three language options", () => {
		render(<SelectLang />);
		const options = screen.getAllByRole("option");
		expect(options).toHaveLength(3);
	});

	it("should change language on selection", () => {
		mockChangeLanguage.mockClear();
		render(<SelectLang />);
		const select = screen.getByTestId("select-lang");
		fireEvent.change(select, { target: { value: "ja" } });
		expect(mockChangeLanguage).toHaveBeenCalledWith("ja");
	});

	it("should not change language on selection", () => {
		mockChangeLanguage.mockClear();
		render(<SelectLang />);
		const select = screen.getByTestId("select-lang");
		fireEvent.change(select, { target: { value: "de" } });
		expect(mockChangeLanguage).not.toHaveBeenCalled();
	});
});
