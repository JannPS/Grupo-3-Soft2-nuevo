import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  form: FormGroup;
  mensaje: string = '';
  error: string = '';  // ✅ Se añade esta línea

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required],
    });
  }

  login() {
    if (this.form.invalid) return;

    this.authService.login(this.form.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.router.navigate(['/home']); // Cambia '/home' según tu ruta principal
      },
      error: (err) => {
        this.error = 'Credenciales inválidas'; // Mensaje mostrado si falla el login
      }
    });
  }

  irARegistro() {
    this.router.navigate(['/registro']);
  }

  irARecuperar() {
    this.router.navigate(['/recuperar']);
  }
}
