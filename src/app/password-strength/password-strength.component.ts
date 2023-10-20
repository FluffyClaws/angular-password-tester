import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
})
export class PasswordStrengthComponent {
  password: string = '';
  section1Color: string = 'grey';
  section2Color: string = 'grey';
  section3Color: string = 'grey';

  checkPasswordStrength() {
    if (this.password.length === 0) {
      this.section1Color = 'grey';
      this.section2Color = 'grey';
      this.section3Color = 'grey';
    } else if (this.password.length < 8) {
      this.section1Color = 'red';
      this.section2Color = 'red';
      this.section3Color = 'red';
    } else if (/^([a-zA-Z]+|[!@#$%^&+=]+|[\d]+)$/.test(this.password)) {
      this.section1Color = 'red';
      this.section2Color = 'grey';
      this.section3Color = 'grey';
    } else {
      const hasLetters = /[a-zA-Z]/.test(this.password);
      const hasSymbols = /[!@#$%^&+=]/.test(this.password);
      const hasNumbers = /[\d]/.test(this.password);

      if (hasLetters && hasSymbols && hasNumbers) {
        this.section1Color = 'green';
        this.section2Color = 'green';
        this.section3Color = 'green';
      } else if (
        (hasLetters && hasSymbols) ||
        (hasLetters && hasNumbers) ||
        (hasSymbols && hasNumbers)
      ) {
        this.section1Color = 'yellow';
        this.section2Color = 'yellow';
        this.section3Color = 'grey';
      } else {
        this.section1Color = 'red';
        this.section2Color = 'grey';
        this.section3Color = 'grey';
      }
    }
  }
}
