import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {
  loginForm!: FormGroup;
  loginError: boolean = false;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const login = this.loginForm.value.login;
      const password = this.loginForm.value.password;

      const user = this.userService.getUserByLogin(login);

      if (user && user.password === password) {
        // TODO: Store user session/token for authentication
        this.loginError = false;
        this.router.navigate(['/']); // Redirect to home page after successful login
      } else {
        this.loginError = true;
      }
    }
  }
}
