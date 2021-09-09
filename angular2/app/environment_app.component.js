System.register(["angular2/core"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.Items = [
                        { name: "Banana" },
                        { name: "Apple" },
                        { name: "Boomelon" }
                    ];
                    this.clickedItem = { name: "" };
                }
                AppComponent.prototype.onItemClick = function (item) {
                    this.clickedItem = item;
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'my-app'
                    }),
                    core_1.View({
                        template: "\n          <h2>My First Angular 2 App</h2>\n            <ul>\n              <li\n              *ngFor=\"#Item of Items\"\n              (click)=\"onItemClicked(Item)\">\n                  {{ Item.name }}\n              </li>\n           </ul>\n           <input type=\"text\" [(ngModel)]=\"clickedItem.name\">\n          "
                    }), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_1("AppComponent", AppComponent);
        }
    }
});
/*
The above code will import the Component and View package from angular2/core.

The @Component is an Angular 2 decorator that allows you to associate metadata with the component class.

The my-app can be used as HTML tag to injecting and can be used as a component.

The @view contains a template that tells Angular how to render a view.

The export specifies that, this component will be available outside the file.
*/ 
//# sourceMappingURL=environment_app.component.js.map