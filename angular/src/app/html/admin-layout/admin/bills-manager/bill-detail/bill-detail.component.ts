import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss']
})
export class BillDetailComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  ngOnInit() {
  }
  getBill() {
    this.router.params.subscribe(params => {
      const id = params['id'];
      });
  }
}
