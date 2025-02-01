import { NextApiRequest, NextApiResponse } from 'next';
import { controleLivro } from './index';

export default (req: NextApiRequest, res: NextApiResponse) => {
    const { codigo } = req.query;

    try {
        if (req.method === 'DELETE') {
            
            controleLivro.excluir(Number(codigo));
            res.status(200).json({ mensagem: 'Livro excluído com sucesso!' });
        } else {
            
            res.setHeader('Allow', ['DELETE']);
            res.status(405).end(`Método ${req.method} não permitido`);
        }
    } catch (error) {
        
        console.error(error);
        res.status(500).json({ mensagem: 'Erro no servidor' });
    }
};
