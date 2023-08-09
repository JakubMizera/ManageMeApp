import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Role } from '../types';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {
  userForm!: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private router: Router) { }
  
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      role: [Role.DEVELOPER],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  };

  onRegister(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value);
      this.userForm.reset();
      // TODO - login created user?
      this.router.navigate(['/']);
    };
  };
}
