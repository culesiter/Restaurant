import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
declare var $:any;
@Component({
  selector: 'app-phong',
  templateUrl: './phong.component.html',
  styleUrls: ['./phong.component.scss']
})
export class PhongComponent implements OnInit {

  constructor() { }

  ngOnInit() {

   
    $(function () {
    
      $('#datetimepicker1').datetimepicker({
        
      }).data("DateTimePicker").viewDate()
      ;
      
  });
 
  }
  thushow()
  {
    console.log(1);
    var a=<HTMLInputElement>document.getElementById("time");
    
    console.log(Date.parse(a.value));
    
    
  }

}
