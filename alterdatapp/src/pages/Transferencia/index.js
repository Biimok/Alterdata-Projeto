import React, { useState, useCallback, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// import { Container } from './styles';

function Transferencia() {

const [listaEmpresas, setListaEmpresas] = useState([]);
const [listaProdutos, setListaProdutos] = useState([]);
const [produtosSelec, setProdutosSelec] = useState([]);

const getEmpresas = useCallback(async () => {
  try {
    const response = await firebase.firestore().collection('empresas').get();

    const temp = [];

    response.forEach(doc => {
      temp.push({id: doc.id, ...doc.data()});
    })

    setListaEmpresas(temp);
  } catch (error) {
    console.log('error getEmpresas', error);
  }
}, []);

const getProdutos = useCallback(async () => {
  try {
    const response = await firebase.firestore().collection('produtos').get();

    const temp = [];

    response.forEach(doc => {
      temp.push({id: doc.id, ...doc.data()});
    })

    setListaProdutos(temp);
  } catch (error) {
    console.log('error getProdutos', error);
  }
}, []);

const upRelatorios = async (empresaEntrada, empresaSaida, dataEntrega, desc) => {
  try {
    await firebase.firestore().collection('relatorios').add({
      empresaEntrada: {
        nome: empresaEntrada.nome,
        id: empresaEntrada.id
      },
      empresaSaida: {
        nome: empresaSaida.nome,
        id: empresaSaida.id
      },
      dataEntrega: dataEntrega,
      // dataRealizada: data do dia realizado (procurar funcao)
      descricao: desc,
      produtos : [
        produtosSelec
      ]
    })
  } catch(error) {

  }
};

const selecProduto = (produto, quantidade) => {
  setProdutosSelec([...produtosSelec, {nome: produto.nome, id: produto.id, quantidade: quantidade}])
}

useEffect(() => {
  getEmpresas();
  getProdutos();
})















  return <div />;
}

export default Transferencia;