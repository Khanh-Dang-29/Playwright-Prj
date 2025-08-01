# Playwright Test Setup Guide

## 📦 1. Install Dependencies

Ensure you already installed Node.js >= 16

Install Playwright
```
npx playwright install
```

Install Typescript
```
npm install --save-dev typescript
npm install --save-dev ts-node
npx tsc --init
```

Install dotenv
```
npm install dotenv
```

## 📦 2. Create .env file with content

Example:
```
BASE_URL=(URL of AUT)
USER_NAME=(Your account username to login)
PASSWORD=(Your password account to login)
```

## 📦 3. How to run test

```
npx playwright test
```

## 📦 4. How to view HTML test report

```
npx playwright show-report
```

## 📦 5. How to run test in UI Mode

```
npx playwright test --ui
```

## 📦 6. Resources

Docs: [https://playwright.dev](https://playwright.dev)

CLI: [https://playwright.dev/docs/test-cli](https://playwright.dev/docs/test-cli)

Locators: [https://playwright.dev/docs/locators](https://playwright.dev/docs/locators)

## 📦 7. Extension for formatting the code

- Code Spell Checker
- Prettier - Code formatter

## 📦 8. Implement setting.json file

```
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "files.insertFinalNewline": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "non-relative",
  "cSpell.ignoreWords": ["spinbutton", "woocommerce", "Mavic"],

  "cSpell.ignorePaths": [
    "**/node_modules/**",
    "**/.vscode/**",
    "package.json",
    "tsconfig.json"
  ]
}
```