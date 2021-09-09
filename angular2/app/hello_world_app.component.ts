import {Component, View} from "angular2/core";

@Component({
   selector: 'my-app'
})

@View({ // new sintaxe:   `text` -> quotes not end of line sensitive
  template: `
          <h2>Hello World App</h2>
          interpolation: {{interpolation_var}}<br>
          initialization: {{initialization}}<br>
            <ul>
              <li
              *ngFor="#Item of Items"
              (click)="onItemClicked(Item)">
                  {{ Item.name }}
              </li>
           </ul>
           <input type="text" [(ngModel)]="clickedItem.name"><BR>
           <input type="text" placeholder="digite o item a ser adicionado" #Item (keyup)="0"> 
           <button (click)="addItem(Item)">adicionar (#Item faz o databinding)</button>
           {{Item.value}}<br>
           exemplo de event binding
           <input (keyup)="onKey($event)">
           {{foo}}<br>
           exemplo apertando tecla especifica(enter)<input #val (keyup.enter)="values=val.value">{{values}} 
           <br>
           exemplo com blur(perda do foco)<input (blur)="blured=val_blur.value" #val_blur>{{blured}}
          `
}) 
// new: repair in *ngFor="#foo in array" sintax
// new: (click)="someFunction(foo)" sintax
// new: [(ngModel)]="someDataBinded.someProperty"

export class MyHelloWorldClass {
  interpolation_var: "This is a interpolation";


  //template for initialization
  initialization: string;
  constructor(){//seems constructor is a special world in TS  
    this.initialization = "this is a initialization";
  }

  public Items = [
    {name:"Banana"},
    {name:"Apple"},
    {name:"Boomelon"}
  ];
  public clickedItem = {name:""};

  onItemClicked(item){
    this.clickedItem = item;
  }

  addItem(itemfoo){//usando data binding com #variable
    this.Items.push({name:itemfoo.value});//nao esquecer do burocrata do value
  }
  
  foo="";
  onKey(event:KeyboardEvent) {//eventos do teclado no objeto input fazem acionar onKey(mesmo shift ou capslock)
    console.log(event.target);
    this.foo += (event.target).value + ' | ';
  }
}