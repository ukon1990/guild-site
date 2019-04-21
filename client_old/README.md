# GuildSite

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.1.2.
The project is mainly created for the sake of making something. You may feel free to use the code as you wish and alter it in any way you'd like. It allows you to browse your guild data, available through blizzards API. Currently it's set to a spesific realm and guild.


## To get started using the app for your guild
You first need to create a file with the name private.ts in the `app/models/` directory.
This file should look something like this:

```
export class Private {
	public static guildName = 'Cannon Fodder';
	public static realm = 'the realm name';
	public static region = 'eu';
	public static blizzardApiKey = 'your key';
	public static warcraftLogsApiKey = 'your public key';
}

```

To get Warcraft logs API key:
* Log in to their site
* Follow this link: `https://www.warcraftlogs.com/accounts/changeuser`
* Look for `public key` and copy it

To get a API key from Blizzard:
* Make a user or log in to `https://dev.battle.net/`
* Go to your account page and either get a existing key or make a new one.

## To set the guild rank names
go to `app/models/guild-ranks.ts` and change the ranks there.
Index 0 [the first element] is rank 0 (GM) and so forth.

## Defining what ranks are displayed in the "raiders" page
Open the `app/components/raid-tool/raid-tool.component.ts` file, and change it in the `updateCharacterList()` function. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
