import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Favourite } from '../Models/favourite';
import { Mail } from '../Models/mail';

@Component({
  selector: 'app-orderhistory',
  templateUrl: './orderhistory.component.html',
  styleUrls: ['./orderhistory.component.css'],
})
export class OrderhistoryComponent implements OnInit {
  [x: string]: any;
  data: any;
  msg: any;
  cart: Favourite;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {
    let reqHeader = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + window.localStorage.getItem('token')
    );
    this.http
      .get<any>(
        'http://localhost:9000/orderHistory/get/' +
          localStorage.getItem('loginemail'),
        { headers: reqHeader }
      )
      .subscribe((data) => {
        console.log(data);
        this.data = data;
      });
  }
  placeOrder(
    data: any,
    resturantName: any,
    dishName: any,
    quantity: any,
    price: any,
    discription: any,
    dishImage: any
  ) {
    this.msg =
      'This is Mail Generated for Testing purpose  ' +
      ' Thank you for ordering dinner from ' +
      resturantName +
      ' We hope you enjoyed your meal from ' +
      resturantName +
      ' You can write them a review by clicking';
    let object: Mail = {
      recipient: window.localStorage.getItem('loginemail'),
      msgBody: this.msg,
      subject: 'Your order',
    };
    console.log(object);
    this.http
      .post<any>('http://localhost:9000/sendMail', object)
      .subscribe((success) => {
        // console.log(success);
        alert(success);
      });
  }
  deleteCart(
    data: any,
    resturantName: any,
    dishName: any,
    quantity: any,
    price: any,
    discription: any,
    dishImage: any
  ) {
    return this.http
      .delete(
        'http://localhost:9000/addToCart/delete/cart/' +
          window.localStorage.getItem('loginemail') +
          '/' +
          data +
          '/' +
          dishName
      )
      .subscribe((success) => {
        alert('Iteams deleted');
        this.ngOnInit();
      });
  }
}
