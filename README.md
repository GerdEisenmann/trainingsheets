# Training Sheets
A collection of written sheets and images on how to train on something

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.0.6.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## PWA

npx http-server -p 8080 -c-1 dist/notes/browser


## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```
This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## For Github pages:
```bash
npm run ng build -- --output-path docs --base-href /trainingsheets/browser/
```
push this into branch gh-pges and commit to github.
Wait a while. Then open
https://GerdEisenmann.github.io/trainingsheets/browser




## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## Generating an OpenAPI Server
Required: trainigsheets.yaml and for Logging: Winston (npm install winston)
First get OpenAPI jar:
curl -o openapi-generator-cli.jar https://repo1.maven.org/maven2/org/openapitools/openapi-generator-cli/7.6.0/openapi-generator-cli-7.6.0.jar

Generate Java/Spring Server:
java -jar openapi-generator-cli.jar generate -i trainigsheets.yaml -g spring -o ./generated-spring-server
Run Java Server:
mvn clean package
Start: mvn spring-boot:run
or Start (after building): java -jar target/*.jar 

Generate Node/Express Server:
java -jar openapi-generator-cli.jar generate -i trainigsheets.yaml -g nodejs-express-server -o ./generated-express-server
Run Node Server: node index.js