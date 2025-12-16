import { render, RenderOptions } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { ReactElement } from "react";

// Create a custom query client for tests
const createTestQueryClient = () =>
	new QueryClient({
		defaultOptions: {
			queries: {
				retry: false,
				gcTime: 0,
			},
			mutations: {
				retry: false,
			},
		},
	});

// Wrapper with all providers
interface AllTheProvidersProps {
	children: React.ReactNode;
	queryClient?: QueryClient;
}

const AllTheProviders = ({ children, queryClient }: AllTheProvidersProps) => {
	const testQueryClient = queryClient || createTestQueryClient();

	return (
		<QueryClientProvider client={testQueryClient}>
			{children}
		</QueryClientProvider>
	);
};

// Custom render function
const customRender = (
	ui: ReactElement,
	options?: Omit<RenderOptions, "wrapper"> & {
		queryClient?: QueryClient;
	},
) => {
	const { queryClient, ...renderOptions } = options || {};

	return render(ui, {
		wrapper: ({ children }) => (
			<AllTheProviders queryClient={queryClient}>{children}</AllTheProviders>
		),
		...renderOptions,
	});
};

// Export everything from @testing-library/react
export * from "@testing-library/react";

// Export custom utilities
export { customRender as render, createTestQueryClient };
