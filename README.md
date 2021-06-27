# Clase2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.2.10.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Setup angular testing with Hest

- Uninstall karma dependencies:
  `npm uninstall karma karma-chrome-launcher karma-coverage-istanbul-reporter karma-jasmine karma-jasmine-html-reporter`
- Install jest dependendencies:
  `npm install -D jest jest-preset-angular @types/jest jest-jasmine2`
- Configure `setup-test.ts` and `jest.config.js`

```
//setup-test.ts
import 'jest-preset-angular/setup-jest';

//jest.config.js
module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  coverageDirectory: "coverage",
  collectCoverageFrom: ["<rootDir>/src/app/**/*.ts"],
  coverageReporters: ["text", "text-summary", "html"],
  testRunner: "jest-jasmine2",
};
```

- Change package-json test task to use jest
  `"test": "jest",`
- Create a coverage task
  `"test:coverage": "jest --coverage",`
