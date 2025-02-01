import { Editora } from "../modelo/Editora";

export class ControleEditora {
    private editoras: { codEditora: number; nome: string }[];
  
    constructor() {
      
      this.editoras = [
        { codEditora: 1, nome: 'Globo' },
        { codEditora: 2, nome: 'Alan Kardec' },
        { codEditora: 3, nome: 'O Astro' },
      ];
    }

    
    getNomeEditora(codEditora: number): string | undefined {
        const editora = this.editoras
        .filter(e => e.codEditora === codEditora)
        .map(e => e.nome)[0]; 

        return editora; 
    }
  
    
    getEditoras(): { codEditora: number; nome: string }[] {
      return this.editoras;
    }
}