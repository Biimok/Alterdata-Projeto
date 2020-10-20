import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';

// import { Container } from './styles';

function CadastroProduto() {
  const [nome, setNome] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState(null);
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  const setProduto = async () => {
    
    if (nome === '' || valor === '' || quantidade === null || categoria === '' || descricao === '') {
      return console.log('Preencha os campos obrigatórios');
    }

    try {
      await firebase.firestore().collection('produtos').add({
        nome: nome,
        valor: valor,
        quantidade: quantidade,
        categoria: categoria,
        descricao: descricao
      })
      
      setNome('');
      setValor('');
      setQuantidade('');
      setCategoria('');
      setDescricao('');

    } catch(error) {
      console.log('error setProduto', error);
    }
  };









  return (
    <>
      <Menu/>
      <form onSubmit={setProduto}>
        <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(text) => setNome(text.target.value)}></input>
        <input type="number" name="valor" placeholder="Valor" value={valor} onChange={(text) => setValor(text.target.value)}></input>
        <input type="number" name="quantidade" placeholder="Quantidade" value={quantidade} onChange={(text) => setQuantidade(text.target.value)}></input>
        <input type="text" name="categoria" placeholder="Categoria" value={categoria} onChange={(text) => setCategoria(text.target.value)}></input>
        <input type="text" name="descricao" placeholder="Descrição" value={descricao} onChange={(text) => setDescricao(text.target.value)}></input>
        <button type="submit" >Cadastrar</button>
      </form>




    </>
  )
}

export default CadastroProduto;