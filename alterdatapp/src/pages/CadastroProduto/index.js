import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

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









  return <div />;
}

export default CadastroProduto;