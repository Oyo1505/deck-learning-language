# Configuration des Tests Unitaires avec Jest

## 📋 Vue d'ensemble

Configuration complète de Jest pour le projet TanStack Start avec support pour:
- **React 19** avec React Testing Library
- **TypeScript** via ts-jest
- **TanStack Query** avec providers de test
- **react-i18next** pour l'internationalisation
- **Coverage** avec seuils de qualité à 80%

## 🗂️ Structure des fichiers

```
projet/
├── jest.config.cjs          # Configuration principale Jest
├── jest.setup.ts            # Setup de l'environnement de test
├── test.utils.tsx           # Utilitaires et providers personnalisés
├── __mocks__/
│   └── fileMock.js          # Mock pour les fichiers statiques
└── src/
    └── domains/
        └── layout/
            ├── components/
            │   └── Header.tsx
            └── __tests__/
                └── Header.test.tsx
```

## ⚙️ Configuration Jest ([jest.config.cjs](../jest.config.cjs))

### Résolution des modules

```javascript
moduleDirectories: ["node_modules", "utils", __dirname]
moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/src/$1",                              // Path alias @/
  "\\.(css|less|scss|sass)$": "identity-obj-proxy",            // CSS modules
  "\\.(jpg|jpeg|png|gif|svg|webp)$": "<rootDir>/__mocks__/fileMock.js" // Images
}
```

### Transformation TypeScript

```javascript
transform: {
  "^.+\\.(ts|tsx)$": ["ts-jest", {
    tsconfig: {
      jsx: "react-jsx",
      esModuleInterop: true,
      allowSyntheticDefaultImports: true
    }
  }]
}
```

### Coverage

- **Seuils**: 80% pour statements, branches, functions, lines
- **Formats**: text, lcov, html
- **Exclusions**: fichiers générés, tests, stories

## 🔧 Setup de l'environnement ([jest.setup.ts](../jest.setup.ts))

### Mocks automatiques

```typescript
// Window.matchMedia pour les media queries
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn()
  }))
});

// IntersectionObserver pour le lazy loading
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() { return []; }
  unobserve() {}
};

// ResizeObserver pour les composants responsives
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
};
```

### Cleanup automatique

```typescript
afterEach(() => {
  cleanup();                // Nettoie le DOM après chaque test
  jest.clearAllMocks();     // Reset tous les mocks
});
```

## 🧩 Utilitaires de test ([test.utils.tsx](../test.utils.tsx))

### Provider TanStack Query

```typescript
const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,    // Pas de retry en test
        gcTime: 0        // Pas de cache
      },
      mutations: {
        retry: false
      }
    }
  });
```

### Fonction de render personnalisée

```typescript
import { render } from "@/../test.utils";

// Utilisation dans les tests
render(<MonComposant />, {
  queryClient: customQueryClient  // Optionnel
});
```

## 📝 Scripts NPM

```json
{
  "test": "jest",                               // Exécute tous les tests
  "test:watch": "jest --watch",                 // Mode watch
  "test:coverage": "jest --coverage",           // Avec coverage
  "test:ci": "jest --ci --coverage --maxWorkers=2"  // Pour CI/CD
}
```

## 🧪 Exemple de test

### Test basique ([Header.test.tsx](../src/domains/layout/__tests__/Header.test.tsx))

```typescript
import { render, screen, fireEvent } from "@/../test.utils";
import Header from "../components/Header";

// Mock des dépendances
jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    i18n: {
      language: "en",
      changeLanguage: jest.fn()
    },
    t: (key: string) => key
  })
}));

jest.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, ...props }: any) => (
    <a href={to} {...props}>{children}</a>
  )
}));

describe("Header Component", () => {
  it("should render the header with logo", () => {
    render(<Header />);

    const logo = screen.getByAltText("TanStack Logo");
    expect(logo).toBeInTheDocument();
  });

  it("should toggle mobile menu", () => {
    render(<Header />);

    const menuButton = screen.getByLabelText("Open menu");
    const aside = screen.getByRole("complementary");

    expect(aside).toHaveClass("-translate-x-full");

    fireEvent.click(menuButton);
    expect(aside).toHaveClass("translate-x-0");
  });
});
```

## 🎯 Bonnes pratiques

### 1. Organisation des tests

```
src/domains/[domain]/
├── components/
│   └── MonComposant.tsx
└── __tests__/
    └── MonComposant.test.tsx
```

### 2. Naming conventions

- **Fichiers**: `*.test.tsx` ou `*.spec.tsx`
- **Describe blocks**: Nom du composant/fonction
- **Test cases**: Description claire de ce qui est testé

### 3. Structure d'un test

```typescript
describe("ComponentName", () => {
  // Mocks en haut du fichier
  jest.mock("...");

  // Setup/teardown si nécessaire
  beforeEach(() => {});
  afterEach(() => {});

  // Tests groupés par fonctionnalité
  describe("Feature A", () => {
    it("should do something", () => {
      // Arrange
      const props = { ... };

      // Act
      render(<Component {...props} />);
      const element = screen.getByRole("button");
      fireEvent.click(element);

      // Assert
      expect(element).toHaveClass("active");
    });
  });
});
```

### 4. Testing Library queries (par ordre de préférence)

1. **getByRole**: `screen.getByRole("button", { name: /submit/i })`
2. **getByLabelText**: `screen.getByLabelText("Email")`
3. **getByPlaceholderText**: `screen.getByPlaceholderText("Enter email")`
4. **getByText**: `screen.getByText("Submit")`
5. **getByTestId**: `screen.getByTestId("submit-btn")` (dernier recours)

### 5. Assertions courantes

```typescript
// Présence dans le DOM
expect(element).toBeInTheDocument();
expect(element).not.toBeInTheDocument();

// Visibilité
expect(element).toBeVisible();
expect(element).not.toBeVisible();

// Classes CSS
expect(element).toHaveClass("active");
expect(element).toHaveClass("btn", "btn-primary");

// Attributs
expect(element).toHaveAttribute("href", "/home");
expect(element).toHaveValue("test@example.com");

// Contenu
expect(element).toHaveTextContent("Hello World");
```

## 🔍 Debugging

### Voir le HTML rendu

```typescript
import { render, screen } from "@/../test.utils";
import { debug } from "@testing-library/react";

render(<Component />);
screen.debug();  // Affiche tout le DOM
screen.debug(screen.getByRole("button"));  // Affiche un élément spécifique
```

### Mode verbose

```bash
pnpm test -- --verbose
```

### Exécuter un seul test

```bash
pnpm test Header.test.tsx
pnpm test -- -t "should toggle mobile menu"
```

## 📊 Coverage

### Générer le rapport

```bash
pnpm test:coverage
```

### Visualiser le HTML

```bash
# Le rapport est généré dans coverage/lcov-report/index.html
open coverage/lcov-report/index.html  # macOS
start coverage/lcov-report/index.html # Windows
```

### Seuils configurés

- **Statements**: 80%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 80%

## 🚀 CI/CD

### GitHub Actions exemple

```yaml
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          cache: 'pnpm'
      - run: pnpm install
      - run: pnpm test:ci
      - uses: codecov/codecov-action@v3
        with:
          files: ./coverage/lcov.info
```

## 🐛 Troubleshooting

### "Cannot find module '@/...'"

Vérifier que le path alias est bien configuré dans [jest.config.cjs](../jest.config.cjs:10):

```javascript
moduleNameMapper: {
  "^@/(.*)$": "<rootDir>/src/$1"
}
```

### "jest-environment-jsdom not found"

```bash
pnpm add -D jest-environment-jsdom
```

### Tests TypeScript ne sont pas exécutés

Vérifier que ts-jest est installé:

```bash
pnpm add -D ts-jest @types/jest
```

### Mocks ne fonctionnent pas

1. Vérifier que le mock est déclaré **avant** le describe
2. Utiliser `jest.mock()` et non `vi.mock()`
3. Vérifier le chemin du module mocké

## 📚 Ressources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [TanStack Query Testing](https://tanstack.com/query/latest/docs/framework/react/guides/testing)

## ✅ Checklist pour nouveaux tests

- [ ] Fichier dans `__tests__/` ou `*.test.tsx`
- [ ] Imports des utilitaires depuis `@/../test.utils`
- [ ] Mocks des dépendances externes
- [ ] Tests suivent le pattern Arrange-Act-Assert
- [ ] Queries privilégient getByRole
- [ ] Assertions claires et explicites
- [ ] Coverage maintenu > 80%
