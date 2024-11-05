import { Component } from '@angular/core';

@Component({
  selector: 'app-cuadricula',
  templateUrl: './cuadricula.component.html',
  styleUrl: './cuadricula.component.css'
})
export class CuadriculaComponent {
  tamanoCuadricula: number = 0;
  matrix: number[][] = [];
  openedButtons: {row: number, col: number}[] = [];

  creacionCuadricula(): void {
      this.matrix = [];
      const totalCuadritos = this.tamanoCuadricula * this.tamanoCuadricula;
      const cantidadMinas = Math.floor(totalCuadritos / 2);
      const cuadritos = new Array(totalCuadritos).fill(0);

      for (let i = 0; i < cantidadMinas; i++) {
        cuadritos[i] = -1; 
      }

      this.shuffleArray(cuadritos);

      for (let i = 0; i < this.tamanoCuadricula; i++) {
          const row = cuadritos.slice(i * this.tamanoCuadricula, (i + 1) * this.tamanoCuadricula);
          this.matrix.push(row);
      }

      this.calculateAdjacentMines();  
      this.openedButtons = [];
  }

  toggleMostrar(row: number, col: number): void {
    const value = this.matrix[row][col];
    if (value === -1) {
        alert('Has presionado una mina! Game over');
        this.mostrarTodasMinas();
        return;
    }
    const isAlreadyOpened = this.openedButtons.some(btn => btn.row === row && btn.col === col);
    if (!isAlreadyOpened) {
        this.openedButtons.push({row, col});
    }
}


  mostrarValor(row: number, col: number): boolean {
      return this.openedButtons.some(btn => btn.row === row && btn.col === col);
  }

  shuffleArray(array: number[]): void {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
  }

  calculateAdjacentMines(): void {
      for (let row = 0; row < this.tamanoCuadricula; row++) {
          for (let col = 0; col < this.tamanoCuadricula; col++) {
              if (this.matrix[row][col] === -1) {
                  continue;  
              }
              const cantidadMinas = this.contarMinas(row, col);
              this.matrix[row][col] = cantidadMinas; 
          }
      }
  }

  contarMinas(row: number, col: number): number {
      let count = 0;
      for (let r = row - 1; r <= row + 1; r++) {
          for (let c = col - 1; c <= col + 1; c++) {
              if (r >= 0 && r < this.tamanoCuadricula && c >= 0 && c < this.tamanoCuadricula) {
                  if (this.matrix[r][c] === -1) {
                      count++;  
                  }
              }
          }
      }
      return count;
  }
  mostrarTodasMinas(): void {
    this.openedButtons = [];
    for (let row = 0; row < this.tamanoCuadricula; row++) {
        for (let col = 0; col < this.tamanoCuadricula; col++) {
            this.openedButtons.push({ row, col });
        }
    }
}
}


