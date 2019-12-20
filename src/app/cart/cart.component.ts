import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
interface IOrder {
  id: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  bikes: Array<IOrder> = [];
  nameInput = '';

  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    this.readFile();
  }

  async readFile() {
    const rows = await this.http.get('assets/inventory.json').toPromise();
    console.log('rows', rows.json());
    this.bikes = rows.json();
    return rows.json();
  }
  addItem(item: string) {
    switch (item) {
      case 'bike1':
        this.bikes.unshift({
          'id': '1',
          'image': 'assets/bike1.jpeg',
          'description': 'Bike Model 1',
          'price': 5000,
          'quantity': 1
        });
        break;
      case 'bike2':
        this.bikes.unshift({
          'id': '2',
          'image': 'assets/bike2.jpeg',
          'description': 'Bike Model 2',
          'price': 4000,
          'quantity': 1
        });
        break;
      case 'bike3':
        this.bikes.unshift({
          'id': '3',
          'image': 'assets/bike3.jpeg',
          'description': 'Bike Model 3',
          'price': 3000,
          'quantity': 1
        });
        break;
    }
  }
  delete(index: number) {
    console.log('index', index);
    this.bikes.splice(index, 1);
  }
  finalize() {
    const data = this.calculate();
    // this.router.navigate(['home', data]);
    // localStorage.setItem('data', JSON.stringify(data));
    localStorage.setItem('calculatedData', JSON.stringify(data));
    this.router.navigate(['invoice', data]);
  }
  calculate() {
    console.log('nameInput', this.nameInput);
    if (this.nameInput === '') {
      this.toastService.showToast('warning', 2000, 'Name must not be empty!');
    } else if (this.nameInput.indexOf(',') === -1) {
      this.toastService.showToast('warning', 2000, 'Must have a comma!');
    } else {
      let subTotal, total, taxAmt;
      total = this.bikes.reduce((acc, it, i, arr) => {
        acc += it.price * it.quantity;
        return acc;
      }, 0);
      taxAmt = total * .1;
      subTotal = total - taxAmt;
      console.log('From calculate() total: ', total, 'taxAmt', taxAmt, 'subTotal', subTotal);
      return {
        total: total,
        taxAmt: taxAmt,
        subTotal: subTotal
      };
    }
  }
}
