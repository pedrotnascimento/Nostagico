import {Component, View} from "angular2/core";

@Component({
   selector: 'my-app'
})

@View({ // new sintaxe:   `text` -> quotes not end of line sensitive
  template: `
          <h2>My First Angular 2 App</h2>
            <ul>
              <li
              *ngFor="#Item of Items"
              (click)="onItemClicked(Item)">
                  {{ Item.name }}
              </li>
           </ul>
           <input type="text" [(ngModel)]="clickedItem.name">
          `
}) 
// new: repair in *ngFor="#foo in array" sintax
// new: (click)="someFunction(foo)" sintax
// new: [(ngModel)]="someDataBinded.someProperty"

export class AppComponent {
  public Items = [
    {name:"Banana"},
    {name:"Apple"},
    {name:"Boomelon"}
  ];
  public clickedItem = {name:""};

  onItemClick(item){
    this.clickedItem = item;
  }
}
/*
The above code will import the Component and View package from angular2/core.

The @Component is an Angular 2 decorator that allows you to associate metadata with the component class.

The my-app can be used as HTML tag to injecting and can be used as a component.

The @view contains a template that tells Angular how to render a view.

The export specifies that, this component will be available outside the file.
*/