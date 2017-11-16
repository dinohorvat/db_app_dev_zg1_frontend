import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-transaction',
  templateUrl: './create-transaction.component.html',
  styleUrls: ['./create-transaction.component.scss']
})
export class CreateTransactionComponent implements OnInit {

  hiddenStep:boolean = true;
  constructor() { }

  ngOnInit() {
  }

  showHidden(){
    if(this.hiddenStep){
      this.hiddenStep = false;
    }else {
      this.hiddenStep = true;
    }
  }
  public onStep1Next(event){
    console.log("bla")
  }

  public onStep2Next(event){
    console.log("bla")
  }
}
