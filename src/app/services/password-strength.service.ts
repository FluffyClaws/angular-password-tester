import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PasswordStrengthService {
  private hasLetters(password: string): boolean {
    return /[a-zA-Z]/.test(password);
  }

  private hasSymbols(password: string): boolean {
    return /[!@#$%^&+=]/.test(password);
  }

  private hasNumbers(password: string): boolean {
    return /\d/.test(password);
  }

  private getTypeCount(password: string): number {
    const checks = [
      this.hasLetters(password),
      this.hasSymbols(password),
      this.hasNumbers(password),
    ];
    return checks.filter(Boolean).length;
  }

  checkPasswordStrength(password: string): string[] {
    if (!password || password.trim().length === 0) {
      return ['grey', 'grey', 'grey'];
    }

    if (password.length < 8) {
      return ['red', 'red', 'red'];
    }

    const typeCount = this.getTypeCount(password);

    switch (typeCount) {
      case 1:
        return ['red', 'grey', 'grey'];
      case 2:
        return ['yellow', 'yellow', 'grey'];
      case 3:
        return ['green', 'green', 'green'];
      default:
        return ['grey', 'grey', 'grey'];
    }
  }
}
