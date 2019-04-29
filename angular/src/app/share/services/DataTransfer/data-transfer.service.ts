import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
@Injectable()
export class DataTransferService {
  private a = 'Customer';
  private abc = new BehaviorSubject(this.a);
  constructor() { }
  change(x) {
    this.abc.next(x);
  }
  getTittle() {
    return this.abc.asObservable();
  }
}
