import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import { Menu } from '../components/Menu';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { useRouter } from 'next/router'; 

const controleEditora = new ControleEditora();
const baseURL = "http://localhost:3000/api/livros";

const LivroDados = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
    const router = useRouter(); 

    
    useEffect(() => {
        const editoras = controleEditora.getEditoras().map(editora => ({
            value: editora.codEditora,
            text: editora.nome,
        }));
        setOpcoes(editoras);
    }, []);

    
    const incluirLivro = async (livro: any) => {
        const response = await fetch(baseURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(livro),
        });
        return response.ok; 
    };

    
    const tratarCombo = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value)); 
    };

    
    const incluir = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); 
        const livro = {
            codigo: 0, 
            codEditora,
            titulo,
            resumo,
            autores: autores.split('\n'), 
        };

        const sucesso = await incluirLivro(livro);
        if (sucesso) {
            router.push('/livrolista?added=true'); 
        } else {
            alert('Erro ao incluir.');
        }
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Incluir Livro</title>
                <meta name="description" content="Inclusão nova" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Menu />

            <main className={styles.main}>
                <h1 className={styles.title}>Incluir Livro</h1>
                <form onSubmit={incluir} className={styles.form}>
                    <div className="mb-3">
                        <label htmlFor="input1" className="form-label">Título:</label>
                        <input
                            id="input1"
                            type="text"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="textarea1" className="form-label">Resumo:</label>
                        <textarea
                            id="textarea1"
                            value={resumo}
                            onChange={(e) => setResumo(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="textarea2" className="form-label">Autores (um por linha):</label>
                        <textarea
                            id="textarea2"
                            value={autores}
                            onChange={(e) => setAutores(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="select1" className="form-label">Editora:</label>
                        <select id="select1" value={codEditora} onChange={tratarCombo} className="form-select">
                            {opcoes.map((opcao) => (
                                <option key={opcao.value} value={opcao.value}>
                                    {opcao.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Incluir Livro</button>
                </form>
            </main>
        </div>
    );
};

export default LivroDados;