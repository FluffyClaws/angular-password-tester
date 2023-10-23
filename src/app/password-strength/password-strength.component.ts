import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';
import { PasswordStrengthService } from '../services/password-strength.service';

@Component({
  selector: 'app-password-strength',
  templateUrl: './password-strength.component.html',
  styleUrls: ['./password-strength.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordStrengthComponent),
      multi: true,
    },
  ],
})
export class PasswordStrengthComponent implements ControlValueAccessor {
  passwordControl = new FormControl('');
  sectionColors: string[] = ['grey', 'grey', 'grey'];

  constructor(private passwordStrengthService: PasswordStrengthService) {
    this.subscribeToPasswordChanges();
  }

  private subscribeToPasswordChanges(): void {
    this.passwordControl.valueChanges.subscribe((value: string | null) => {
      if (value) {
        this.checkPasswordStrength(value);
      } else {
        this.sectionColors = ['grey', 'grey', 'grey'];
      }
      this.onChange(value);
    });

    this.passwordControl.statusChanges.subscribe((status) => {
      if (status === 'INVALID' && !this.passwordControl.value) {
        this.sectionColors = ['grey', 'grey', 'grey'];
      }
    });
  }

  onChange: any = () => {};
  onTouched: any = () => {};

  writeValue(value: any): void {
    this.passwordControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.passwordControl.disable() : this.passwordControl.enable();
  }

  private checkPasswordStrength(value: string): void {
    const [section1, section2, section3] =
      this.passwordStrengthService.checkPasswordStrength(value);
    this.sectionColors = [section1, section2, section3];
  }

  get section1Color(): string {
    return this.sectionColors[0];
  }

  get section2Color(): string {
    return this.sectionColors[1];
  }

  get section3Color(): string {
    return this.sectionColors[2];
  }
}
