import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NotaDto } from '../../interfaces/nota-dto';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-formulario',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './formulario.component.html',
  styleUrl: './formulario.component.css',
})
export class FormularioComponent {
  _formGroup: FormGroup
  @Input() _estaCargando = false
  @Input() nota?: NotaDto
  @Output() _notaEventEmitter: EventEmitter<NotaDto> = new EventEmitter<NotaDto>()

  constructor(private formBuilder: FormBuilder) {
    this._formGroup = this.formBuilder.group({
      tags: ['', Validators.required],
      valor1: ['', Validators.required],
      valor2: '',
      valor3: '',
      valor4: '',
      encodedKey: this.generarGuid()
    });
  }

  guardar() {
    if (this._formGroup.valid) {
      let nota: NotaDto = {
        encodedKey: this._formGroup.value.encodedKey,
        tags: this._formGroup.value.tags,
        valor01: this._formGroup.value.valor1,
        valor02: this._formGroup.value.valor2,
        valor03: this._formGroup.value.valor3,
        valor04: this._formGroup.value.valor4,
      }
      //console.log(this._formGroup.value)
      this._notaEventEmitter.emit(nota)
    }
  }

  ngOnChanges() {
    if (this.nota) {
      this._formGroup.patchValue({
        tags: this.nota.tags,
        valor1: this.nota.valor01,
        valor2: this.nota.valor02,
        valor3: this.nota.valor03,
        valor4: this.nota.valor04,
        encodedKey: this.nota.encodedKey
      })
    }

    if (this._estaCargando) {
      if (this._estaCargando) {
        this._formGroup.get('tags')?.disable()
        this._formGroup.get('valor1')?.disable()
        this._formGroup.get('valor2')?.disable()
        this._formGroup.get('valor3')?.disable()
        this._formGroup.get('valor4')?.disable()
      } else {
        this._formGroup.get('tags')?.enable()
        this._formGroup.get('valor1')?.enable()
        this._formGroup.get('valor2')?.enable()
        this._formGroup.get('valor3')?.enable()
        this._formGroup.get('valor4')?.enable()
      }
    }
  }

  generarGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
      .replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }
}
