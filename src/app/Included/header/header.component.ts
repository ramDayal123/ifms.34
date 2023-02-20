import { Component, HostListener, OnChanges, OnInit, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  showMenu:boolean=false;
  innerWidth: string | undefined;
  constructor() { }

  ngOnInit(): void {
    // document.getElementById("mySidenav1")!.style.display = "none";
  }

  // ngOnChanges(changes:SimpleChange):void{
  //   console.log(changes.previousValue);
  //   console.log(this.showMenu);
  //   if(changes){
  //     console.log(changes.previousValue);
  //   }
  // }

  // openMenu(){
  //   this.showMenu=true;
    
  // }
  openMenu():void {
    document.getElementById("mySidenav1")!.style.display = "block";
  }

 
  // closeMenu():void{
  //   this.showMenu=false;
  // }
  @HostListener('window:scroll', [])
onWindowScroll(event: Event) {
    //set up the div "id=nav"
    if (document.body.scrollTop > 40 ||
        document.documentElement.scrollTop > 40) {
        document.getElementById('myHeader')!.classList.add('sticky');
    }
    else {
        document.getElementById('myHeader')!.classList.remove('sticky');
        this.innerWidth = 'auto';
    }
}
}
