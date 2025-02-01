import { NextApiRequest, NextApiResponse } from 'next';
import { ControleLivros } from '@/classes/controle/ControleLivros'; 


export const controleLivro = new ControleLivros();

export default (req: NextApiRequest, res: NextApiResponse) => {
    try {
        if (req.method === 'GET') {
            
            const livros = controleLivro.getLivros();
            res.status(200).json(livros);
        } else if (req.method === 'POST') {
            
            const livro = req.body;
            controleLivro.incluir(livro);
            res.status(200).json({ mensagem: 'Adicionado com sucesso!' });
        } else if (req.method === 'DELETE') {
            
            const { codigo } = req.query;
            controleLivro.excluir(Number(codigo));
            res.status(200).json({ message: 'Excluído com sucesso' });
        } else {
            
            res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};
