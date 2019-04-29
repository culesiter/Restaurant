import { Idish } from './../../share/entities/idish';
import { DishserviceService } from './../../share/services/dishservice.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-example',
  templateUrl: './dish-example.component.html',
  styleUrls: ['./dish-example.component.scss']
})
export class DishExampleComponent implements OnInit {
private dishs:Idish[]=[]
  constructor(private dishservice:DishserviceService) { }

  ngOnInit() {
this.hienThiMon();
  }
  hienThiMon()
  {
this.dishservice.laydanhsachmonan().subscribe(response=>{
  for(let i=0;i<=3;i++)
  {
    this.dishs.push(response[i]);
  }

})

  }

}
