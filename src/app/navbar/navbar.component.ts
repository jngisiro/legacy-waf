import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../User';
import { UserService } from '../user.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  angForm: FormGroup;
  angForm1: FormGroup;

  loginbtn: boolean;
  logoutbtn: boolean;

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  loggedUser: string;
  isloading = false;
  isRegistered = false;
  registeredEmail = '';
  user;
  cart = [];

  loginError = '';
  registrationError = '';

  constructor(
    private fb: FormBuilder,
    private dataService: UserService,
    private productService: ProductService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],

      name: ['', Validators.required],

      password: ['', Validators.required],
      passwordConfirm: ['', Validators.required],
    });

    this.angForm1 = this.fb.group({
      email: [
        '',
        [Validators.required, Validators.minLength(1), Validators.email],
      ],

      password: ['', Validators.required],
    });

    // dataService.getLoggedInName.subscribe((name) => this.changeName(name));
    // if (this.dataService.isLoggedIn()) {
    //   console.log('loggedin');
    //   this.loginbtn = false;
    //   this.logoutbtn = true;
    // } else {
    //   this.loginbtn = true;
    //   this.logoutbtn = false;
    // }
  }

  ngOnInit(): void {
    this.dataService.user.subscribe((user) => {
      this.user = user;
    });

    this.productService.cart.subscribe((cart) => {
      if (cart) {
        this.cart = cart;
      } else {
        cart = [];
      }
    });
  }

  postsignindata(angForm1) {
    this.isloading = true;
    this.dataService
      .userlogin(angForm1.value.email, angForm1.value.password)

      .pipe(first())
      .subscribe(
        (data) => {
          this.isloading = false;
          // const redirect = this.dataService.redirectUrl
          //   ? this.dataService.redirectUrl
          //   : '/home';
          // this.router.navigate([redirect]);
        },
        (error) => {
          this.isloading = false;
          // alert('User name or password is incorrect');
          this.loginError = error.error.error;
          console.log(error);
        }
      );
  }
  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }

  logout() {
    this.dataService.logOut();
  }

  postdata(angForm2) {
    this.isloading = true;
    this.dataService
      .userregistration(angForm2.value)
      .pipe(first())
      .subscribe(
        (data) => {
          this.isloading = false;
          this.isRegistered = true;
          this.registeredEmail = angForm2.value.email;
          // alert("Sign Up Successfully");
          // const redirect = this.dataService.redirectUrl
          //   ? this.dataService.redirectUrl
          //   : '/home';
          // this.router.navigate([redirect]);
        },

        (error) => {
          this.isloading = false;
          console.log(error);
          // alert(`Sign Up Failed due to:  ${error}`);
          // const redirect = this.dataService.redirectUrl
          //   ? this.dataService.redirectUrl
          //   : '/home';
          // this.router.navigate([redirect]);
        }
      );
  }
}
