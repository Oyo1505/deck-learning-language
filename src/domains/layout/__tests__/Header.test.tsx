// biome-ignore-all assist/source/organizeImports: false positive
import { render, screen, fireEvent } from "@/../test.utils";
import Header from "../components/Header";

// Mock react-i18next
jest.mock("react-i18next", () => ({
	useTranslation: () => ({
		i18n: {
			language: "en",
			changeLanguage: jest.fn(),
		},
		t: (key: string) => key,
	}),
}));

// Mock TanStack Router Link component
jest.mock("@tanstack/react-router", () => ({
	Link: ({ children, to, ...props }: { children: React.ReactNode; to: string; [key: string]: unknown }) => (
		<a href={to} {...props}>
			{children}
		</a>
	),
}));

// Mock TanChatAIAssistant component
jest.mock("@/domains/layout/components/example-AIAssistant", () => ({
	__esModule: true,
	default: () => <div>AI Assistant Mock</div>,
}));

describe("Header Component", () => {
	it("should render the header with TanStack logo", () => {
		render(<Header />);

		const logo = screen.getByAltText("TanStack Logo");
		expect(logo).toBeInTheDocument();
		expect(logo).toHaveAttribute("src", "/tanstack-word-logo-white.svg");
	});

	it("should render language selector with default value", () => {
		render(<Header />);

		const selector = screen.getByRole("combobox");
		expect(selector).toBeInTheDocument();
		expect(selector).toHaveValue("en");
	});

	it("should toggle mobile menu when menu button is clicked", () => {
		render(<Header />);

		const menuButton = screen.getByLabelText("Open menu");
		const aside = screen.getByRole("complementary");

		// Menu should be hidden initially
		expect(aside).toHaveClass("-translate-x-full");

		// Click to open
		fireEvent.click(menuButton);
		expect(aside).toHaveClass("translate-x-0");

		// Click close button to close
		const closeButton = screen.getByLabelText("Close menu");
		fireEvent.click(closeButton);
		expect(aside).toHaveClass("-translate-x-full");
	});

	it("should render navigation links", () => {
		render(<Header />);

		// Open menu to see navigation
		const menuButton = screen.getByLabelText("Open menu");
		fireEvent.click(menuButton);

		expect(screen.getByText("Home")).toBeInTheDocument();
		expect(screen.getByText("Start - Server Functions")).toBeInTheDocument();
		expect(screen.getByText("Prisma")).toBeInTheDocument();
		expect(screen.getByText("Simple Form")).toBeInTheDocument();
	});

	it("should close menu when navigation link is clicked", () => {
		render(<Header />);

		const menuButton = screen.getByLabelText("Open menu");
		fireEvent.click(menuButton);

		const aside = screen.getByRole("complementary");
		expect(aside).toHaveClass("translate-x-0");

		const homeLink = screen.getByText("Home");
		fireEvent.click(homeLink);

		expect(aside).toHaveClass("-translate-x-full");
	});

	it("should toggle grouped navigation items", () => {
		render(<Header />);

		const menuButton = screen.getByLabelText("Open menu");
		fireEvent.click(menuButton);

		// Initially, sub-items should not be visible
		expect(screen.queryByText("SPA Mode")).not.toBeInTheDocument();

		// Find and click the SSR Demo expand button
		const ssrDemoSection = screen.getByText("Start - SSR Demos");
		const expandButton = ssrDemoSection.parentElement?.querySelector("button");

		if (expandButton) {
			fireEvent.click(expandButton);
			expect(screen.getByText("SPA Mode")).toBeInTheDocument();
			expect(screen.getByText("Full SSR")).toBeInTheDocument();
			expect(screen.getByText("Data Only")).toBeInTheDocument();
		}
	});

	it("should render AI Assistant component", () => {
		render(<Header />);

		const menuButton = screen.getByLabelText("Open menu");
		fireEvent.click(menuButton);

		expect(screen.getByText("AI Assistant Mock")).toBeInTheDocument();
	});
});
