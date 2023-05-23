import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Capacitor } from '@capacitor/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class ResetPasswordComponent  implements OnInit {

  @Output() focus: EventEmitter<any> = new EventEmitter();
  @Output() blur: EventEmitter<any> = new EventEmitter();

  model: any = {
    email: '',
    new_password: ''
  };
  flag: number;

  constructor() { }

  ngOnInit() {}

  inputFocus(event) {
    console.log('focus: ', event);
    if(Capacitor.getPlatform() == 'web') this.focus.emit(true);
  }

  inputBlur(event) {
    console.log('blur: ', event);
    if(Capacitor.getPlatform() == 'web') this.blur.emit(true);
  }

  getData() {
    let data: any = {};
    if(this.model?.email == '' && this.model?.new_password == '') {
      data = {
        title: 'Forgot password', 
        subTitle: 'Enter your email for the verification process.', 
        button: 'VERIFY'
      };
      this.flag = 1;
    } else {
      data = {
        title: 'Reset password', 
        subTitle: 'Enter your new password, must be atleast 8 characters long.', 
        button: 'SAVE'
      };
      this.flag = 2;
    }
    console.log(data);
    return data;
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.model = {
      email: form.value.email || '',
      new_password: form.value.new_password || ''
    };
  }

}
