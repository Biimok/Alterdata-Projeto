import React, { useCallback, useEffect, useState } from 'react';
import Grafico from '../../components/Graficos/graficos';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { useAuth } from '../../hooks/auth';
// import { Container } from './styles';

function Dashboard() {

const { signOut } = useAuth();

const [ listaEmpresas, setListaEmpresas ] = useState([]);
const [ qtdProdutos, setQtdProdutos ] = useState(null);
const [ qtdRelatorios, setQtdRelatorios] = useState([]);

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
    const response = await firebase.firestore().collectionGroup('produtos').get();

    const temp = response.length - 1;


    setQtdProdutos(temp);
  } catch (error) {
    console.log('error getProdutos', error);
  }
},[]);

const getRelatorios = useCallback(async () => {
  try {
    const response = await firebase.firestore().collection('relatorios').get();

    listaEmpresas.map((empresa) => {
      let temp = {nomeEmpresa: '', produtos: 0, quantidade: 0};

      response.forEach(doc => {
        const data = doc.data();
        if (data.empresa.id === empresa.id) {
          temp = {nomeEmpresa: empresa.nome, produtos: empresa.produtosVinculados.length-1, quantidade: temp.quantidade + (data.produtos.length -1)}
        }
      })
      setQtdRelatorios([...qtdRelatorios, temp]);
    })
  } catch (error) {
    console.log('error getRelatorios', error);
  }
},[listaEmpresas, qtdRelatorios]);

useEffect(() => {
  getEmpresas();
  getProdutos();
  getRelatorios();
},[])


  return (
    <>
    <button onClick={signOut}>SAIR</button>
    <Grafico/>
    </>
  );
}

export default Dashboard;