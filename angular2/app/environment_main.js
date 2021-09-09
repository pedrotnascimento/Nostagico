System.register(["angular2/platform/browser", "./environment_app.component"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var browser_1, environment_app_component_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (environment_app_component_1_1) {
                environment_app_component_1 = environment_app_component_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(environment_app_component_1.AppComponent);
        }
    }
});
/*
The environment_main.ts file tells Angular to load the component.

To launch the application, we need to import both Angular's browser bootstrap function and root component of the application.

After importing, the bootstrap is called by passing the root component type i.e. AppComponent.
*/ 
//# sourceMappingURL=environment_main.js.map