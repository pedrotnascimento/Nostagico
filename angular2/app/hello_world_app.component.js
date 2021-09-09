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
    var MyHelloWorldClass;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            MyHelloWorldClass = (function () {
                function MyHelloWorldClass() {
                    this.Items = [
                        { name: "Banana" },
                        { name: "Apple" },
                        { name: "Boomelon" }
                    ];
                    this.clickedItem = { name: "" };
                    this.foo = "";
                    this.initialization = "this is a initialization";
                }
                MyHelloWorldClass.prototype.onItemClicked = function (item) {
                    this.clickedItem = item;
                };
                MyHelloWorldClass.prototype.addItem = function (itemfoo) {
                    this.Items.push({ name: itemfoo.value }); //nao esquecer do burocrata do value
                };
                MyHelloWorldClass.prototype.onKey = function (event) {
                    console.log(event.target);
                    this.foo += (event.target).value + ' | ';
                };
                MyHelloWorldClass = __decorate([
                    core_1.Component({
                        selector: 'my-app'
                    }),
                    core_1.View({
                        template: "\n          <h2>Hello World App</h2>\n          interpolation: {{interpolation_var}}<br>\n          initialization: {{initialization}}<br>\n            <ul>\n              <li\n              *ngFor=\"#Item of Items\"\n              (click)=\"onItemClicked(Item)\">\n                  {{ Item.name }}\n              </li>\n           </ul>\n           <input type=\"text\" [(ngModel)]=\"clickedItem.name\"><BR>\n           <input type=\"text\" placeholder=\"digite o item a ser adicionado\" #Item (keyup)=\"0\"> \n           <button (click)=\"addItem(Item)\">adicionar (#Item faz o databinding)</button>\n           {{Item.value}}<br>\n           exemplo de event binding\n           <input (keyup)=\"onKey($event)\">\n           {{foo}}<br>\n           exemplo apertando tecla especifica(enter)<input #val (keyup.enter)=\"values=val.value\">{{values}} \n           <br>\n           exemplo com blur(perda do foco)<input (blur)=\"blured=val_blur.value\" #val_blur>{{blured}}\n          "
                    }), 
                    __metadata('design:paramtypes', [])
                ], MyHelloWorldClass);
                return MyHelloWorldClass;
            }());
            exports_1("MyHelloWorldClass", MyHelloWorldClass);
        }
    }
});
//# sourceMappingURL=hello_world_app.component.js.map