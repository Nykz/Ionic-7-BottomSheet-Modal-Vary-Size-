import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonModal, IonicModule } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { Keyboard } from '@capacitor/keyboard';
import { Capacitor } from '@capacitor/core';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ReactiveFormsModule, ResetPasswordComponent]
})
export class SignInComponent implements OnInit {

  @ViewChild('forgot_pwd_modal') modal: IonModal;
  form: FormGroup;
  type = true;
  isLoading: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController
  ) { 
    this.initForm();
  }

  ngOnInit() {
    if(Capacitor.getPlatform() != 'web') {
      Keyboard.addListener('keyboardWillShow', info => {
        console.log('keyboard will show with height:', info.keyboardHeight);
        this.moveTo(0.9);
      });
      
      Keyboard.addListener('keyboardDidShow', info => {
        console.log('keyboard did show with height:', info.keyboardHeight);
      });
      
      Keyboard.addListener('keyboardWillHide', () => {
        console.log('keyboard will hide');
      });
      
      Keyboard.addListener('keyboardDidHide', () => {
        console.log('keyboard did hide');
        this.moveTo(0.5);
      });
    }
  }

  moveTo(breakpoint: number) {
    console.log('present');
    this.modal.setCurrentBreakpoint(breakpoint);
  }

  customCounterFormatter(inputLength: number, maxLength: number) {
    return `${maxLength - inputLength} characters remaining`;
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.required]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]})
    });
  }

  changeType() {
    this.type = !this.type;
  }

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
    this.authService.login(this.form.value).then((data) => {
      console.log(data);
      this.router.navigateByUrl('/tabs', {replaceUrl: true});
      this.isLoading = false;
      this.form.reset();
    })
    .catch(e => {
      console.log(e);
      this.isLoading = false;
      let msg = 'Could not sign you in, please try again';
      if(e.code == 'auth/user-not-found') {
        msg = 'Email Id could not be found';
      } else if(e.code == 'auth/wrong-password') {
        msg = 'Please enter correct password';
      }
      this.showAlert(msg);
    });
  }

  async showAlert(message) {
    const alert = await this.alertController.create({
      header: 'Authentication Failed',
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  reset(event) {

  }
}