import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';
import { Subject } from 'rxjs';

export interface IUser {
  id?: number;
  username: string;
  password: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: IUser = {username: '', password: ''};
  currentUser: IUser = null;

  constructor(private router: Router, private toastService: ToastService) {
  }

  ngOnInit() {

  }
  login(user: IUser) {
    console.log('from login user: ', user);
    const defaultUser: IUser = {username: 'brandon', password: 'brandon123' };
    if (user.username !== '' && user.password !== '') {
      if (user.username === defaultUser.username && user.password === defaultUser.password) {
          // log user in, store in local storage, navigate to contacts page
          // this.localStorageService.saveItemsToLocalStorage(user);
          this.router.navigate(['cart', user]);
          // ^ navigates to the contacts page, specified in routes.
      } else {
        this.toastService.showToast('warning', 2000, 'Login failed! Please check username/password.',);
      }
      } else {
        this.toastService.showToast('warning', 2000, 'Login failed! Please enter a username and password.');
      }
    }
}
