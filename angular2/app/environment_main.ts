import {bootstrap} from "angular2/platform/browser"
import {AppComponent} from "./environment_app.component"

bootstrap(AppComponent);
/*
The environment_main.ts file tells Angular to load the component.

To launch the application, we need to import both Angular's browser bootstrap function and root component of the application.

After importing, the bootstrap is called by passing the root component type i.e. AppComponent.
*/