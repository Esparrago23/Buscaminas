import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuadriculaComponent } from './cuadricula/cuadricula.component';
import { FormsModule } from '@angular/forms';
import { CuadritoComponent } from './cuadrito/cuadrito.component';



@NgModule({
  declarations: [
    CuadriculaComponent,
    CuadritoComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports:[
    CuadriculaComponent
  ]
})
export class BuscaminasModule { }
