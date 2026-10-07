import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  username = '';
  password = '';

  @Output()
  loginSuccess = new EventEmitter<boolean>();

  login() {

    if (this.username === 'admin'
        && this.password === 'admin') {

      this.loginSuccess.emit(true);

    } else {

      alert('Invalid Credentials');
    }
  }
}
