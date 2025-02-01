import { Livro } from "../modelo/Livro";

export class ControleLivros {
    private livros: { codigo: number; codEditora: number; titulo: string; resumo: string; autores: string[] }[];
  
    constructor() {
      
      this.livros = [
        { codigo: 1, codEditora: 1, titulo: 'Titânic', resumo: 'Um belo famoso navio que afundou', autores: ["Tinn Carl"] },
        { codigo: 2, codEditora: 1, titulo: 'The Walking Dead', resumo: 'O mundo foi dominado pelos zumbis, como sobreviver?', autores: ["Jhon Capeg"] },
        { codigo: 3, codEditora: 2, titulo: 'O Advogado', resumo: 'Um advogado viciado é pelgo de surpresa ao pegar casos complexos de seu amigo que morreu assassinado', autores: ["Tina Havec"] },
      ];
    }
  
    
    getLivros(): { codigo: number; codEditora: number; titulo: string; resumo: string; autores: string[] }[] {
      return this.livros;
    }

    
    incluir(livro: Livro):void {
      livro.codigo = this.livros.length > 0 ? Math.max(...this.livros.map(l => l.codigo)) + 1 : 1;
      this.livros.push(livro);
      console.log('Livro a ser incluído:', livro);
    }

    
    excluir(codigo: number): void {
        const indice = this.livros.findIndex(livro => livro.codigo === codigo);
        if (indice !== -1) {
            this.livros.splice(indice, 1);
        }
    }
}