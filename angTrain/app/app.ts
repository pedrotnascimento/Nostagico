import { Component, ViewChild } from '@angular/core';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { HomePage } from './pages/home/home';
import {Tabs} from './pages/tabs/tabs';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
    @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{title: string, component: any}>;
  
  constructor(platform: Platform) {
      
      this.pages = [{
          title: 'Tabs', 
          component: Tabs
        }
      ];
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault(); 
    });
        
    
  }
  
  openPage() {
    // navigate to the new page if it is not the current page
    this.nav.setRoot(Tabs);
  }
  
}

ionicBootstrap(MyApp);
