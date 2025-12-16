/** @type {import('jest').Config} */
module.exports = {
	displayName: "deck-learning-language",
	testEnvironment: "jsdom",
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],

	// Module resolution
	moduleDirectories: ["node_modules", "utils", __dirname],
	moduleNameMapper: {
		"^@/(.*)$": "<rootDir>/src/$1",
		"\\.(css|less|scss|sass)$": "identity-obj-proxy",
		"\\.(jpg|jpeg|png|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js",
	},

	// Transform files with ts-jest
	transform: {
		"^.+\\.(ts|tsx)$": [
			"ts-jest",
			{
				tsconfig: {
					jsx: "react-jsx",
					esModuleInterop: true,
					allowSyntheticDefaultImports: true,
					module: "ESNext",
					moduleResolution: "node",
					verbatimModuleSyntax: false,
				},
			},
		],
	},

	// Test patterns
	testMatch: [
		"**/__tests__/**/*.{test,spec}.{ts,tsx}",
		"**/*.{test,spec}.{ts,tsx}",
	],

	// Coverage configuration
	collectCoverageFrom: [
		"src/**/*.{ts,tsx}",
		"!src/**/*.d.ts",
		"!src/routeTree.gen.ts",
		"!src/generated/**",
		"!src/**/__tests__/**",
		"!src/**/*.stories.{ts,tsx}",
	],
	coverageThreshold: {
		global: {
			statements: 80,
			branches: 80,
			functions: 80,
			lines: 80,
		},
	},
	coverageReporters: ["text", "lcov", "html"],

	// Ignore patterns
	testPathIgnorePatterns: ["/node_modules/", "/dist/", "/.next/", "/.tanstack/"],
	transformIgnorePatterns: [
		"node_modules/(?!(@tanstack|@radix-ui|react-i18next|i18next)/)",
	],

	// Performance
	clearMocks: true,
	resetMocks: true,
	restoreMocks: true,
};
