import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { User } from '../User'
import { UserService } from '../user.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  angForm: FormGroup;

  loginbtn:boolean;
  logoutbtn:boolean;

  navbarOpen = false;

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }

  loggedUser:string;

  constructor(private fb: FormBuilder,private dataService: UserService,private router:Router) {

    this.angForm = this.fb.group({

      email: ['', [Validators.required,Validators.minLength(1), Validators.email]],

      name: ['', Validators.required],
      
      password: ['', Validators.required]
      
      });

    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    if(this.dataService.isLoggedIn())
    {
    console.log("loggedin");
    this.loginbtn=false;
    this.logoutbtn=true
    }
    else{
    this.loginbtn=true;
    this.logoutbtn=false
    }
    
    }

  ngOnInit(): void {
  }

  postsignindata(angForm1)
{
this.dataService.userlogin(angForm1.value.email,angForm1.value.password)

.pipe(first())
.subscribe(
data => {
const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';
this.router.navigate([redirect]);
},
error => {
alert("User name or password is incorrect")
});
}
get email() { return this.angForm.get('email'); }
get password() { return this.angForm.get('password'); }


  private changeName(name: boolean): void {
    this.loggedUser = this.dataService.getToken.name
    this.logoutbtn = name;
    this.loginbtn = !name;
    }
    logout()
    {
    this.dataService.deleteToken();
    window.location.href = window.location.href;
    }



    postdata(angForm2)
    {
    this.dataService.userregistration(angForm2.value.name,angForm2.value.password)
    .pipe(first())
    .subscribe(
    data => {
      // alert("Sign Up Successfully");
    const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';
    this.router.navigate([redirect]);
    
    },
    
    error => {
      // alert(`Sign Up Failed due to:  ${error}`);
      const redirect = this.dataService.redirectUrl ? this.dataService.redirectUrl : '/home';
      this.router.navigate([redirect]);
    });
    }

}
