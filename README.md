# PruebaPokemon
Esta prueba la he realizado utilizando el editor Visual Studio Code, en vez de el propuesto StackBlizt, ya que creando un proyecto Angular propio, tenía acceso a las rutas, el archivo app.module para poder importar módulos correctamente y para tener el código mejor ordenado, ya que StackBlizt es un editor muy básico.

Esta app utiliza la API de PokeApi y te muestra todos los pokémons disponibles en la API cada uno con su carta, todas estas cartas son un elemento card de Bootstrap y son responsive para todo tipo de dispositivos mediante el uso de Bootstrap y media queries en CSS. Cada carta de pokémon dispone de los elementos que se piden en la prueba como nombre, imagen, peso, altura tipo y estadísticas generales. Como hay algunos Pokémons que no disponen de imagen, he añadido una imagen genérica para que mantenga el mismo diseño.
Utilizando las opciones que nos da Angular, he hecho el buscador con un input normal y ngModel para que cada vez que se actualice la variable bindeada que es el texto introducido por el usuario, se haga una nueva busqueda en toda la lista. Si en la busqueda no se obtiene ningún resultado, se mostrará un mensaje en pantalla.

Para ejecutar la aplicación, escribir el comando ng serve en la consola como en la siguiente información.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

