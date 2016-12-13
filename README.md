# WebProject1

## Starter project for preprocessing

### Requirements

* [Nodejs](https://nodejs.org/en/)
* [Git](https://git-scm.com/)

### Begin

run `npm install` in your terminal.

run `npm -g install gulp` in your terminal. This will install gulp globally on your machine to allow the next command to run.

run `gulp browserSync` to create an instance of the site. To stop running the site press `ctrl` and `c` and follow any instructions.

### CSS

#### [Less](http://lesscss.org/) Transpile

run `gulp less`.

You should see a `css` folder get created. Inside this folder you should see another folder called `less`. This folder contains the transpiled `css` `stylesheets`.

#### [Sass](http://sass-lang.com/) Transpile

run `gulp sass`.

You should see a `css` folder get created. Inside this folder you should see another folder called `scss`. This folder contains the transpiled `css` `stylesheets`.

### Javascript

#### [Coffeescript](http://coffeescript.org/) Transpile

run `gulp coffee`.

You should see a `javascript` folder get created. Inside this folder you should see another folder called `coffeescript`. This folder contains the transpiled `javascript` `scripts`.

#### [Typescript](https://www.typescriptlang.org/) Transpile

run `gulp typescript`.

You should see a `javascript` folder get created. Inside this folder you should see another folder called `typescript`. This folder contains the transpiled `javascript` `scripts`.