import { formatCurrency } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthAdminGuard } from '../authGuard/auth-admin.guard';
import { AuthAdminService } from '../Services/auth-admin.service';
import { restaurant } from '../Models/restaurant';
import { RestaurantService } from '../Services/restaurant.service';
import iziToast from 'izitoast';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  registrationData: restaurant;
  selectedFile: any;
  constructor(
    private resService: RestaurantService,
    private http: HttpClient,
    private auth: AuthAdminGuard,
    private router: Router
  ) {}
  message: any;
  ngOnInit(): void {}

  restaurantform = new FormGroup({
    resturantName: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    pincode: new FormControl('', [Validators.required]),
    rating: new FormControl('', [Validators.required]),
    emailid: new FormControl('', [Validators.required]),
  });

  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  registerRestaurant() {
    console.log(this.restaurantform.value);
    const formData = new FormData();
    this.registrationData = this.restaurantform.value;
    // console.log("data"+this.signupdata);
    formData.append(
      'profile',
      new Blob([JSON.stringify(this.registrationData)], {
        type: 'application/json',
      })
    );
    formData.append('imageFile', this.selectedFile);
    console.log('log is' + formData);

    let reqHeader = new HttpHeaders().set(
      'Authorization',
      'Bearer ' + window.localStorage.getItem('token')
    );
    this.http
      .post('http://localhost:9000/admin/addrestaurant', formData, {
        headers: reqHeader,
      })
      .subscribe(
        (res) => {
          console.log(res);
          iziToast.success({
            message: 'Added Successfully',
            position: 'topCenter',
          });
          this.restaurantform.reset();
        },
        (error) => {
          iziToast.error({
            message: 'Something Went Wrong',
            position: 'topCenter',
          });
        }
      );
  }
}
