import { Component, OnInit,Input, SimpleChange, EventEmitter, Output, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.css']
})
export class SidemenuComponent implements OnInit {
  hideMenu:boolean=false;
  panelOpenState = false;
  @Input() showSideMenu!:boolean;
  @Output() showSideMenuChange = new EventEmitter<boolean>();
  constructor() { }

  ngOnInit(): void {
    // this.showSideMenu=true;
  }
  // ngOnChanges(changes:SimpleChanges):void{
  //   console.log(changes['previousValue']);
  //   console.log(this.showSideMenu);
  //   if(changes){
  //     console.log(changes['previousValue']);
  //   }
  // }

  closeMenu() {
    document.getElementById("mySidenav1")!.style.display = "none";
  }
 
  // closeMenu():void{
  //   console.log("tushar");
  //   this.showSideMenu=false;
  //   console.log("menuFlag",this.showSideMenu);
  //   this.showSideMenuChange.emit(this.showSideMenu);  
  // }
}
