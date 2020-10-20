import React, { useCallback, useEffect, useState } from 'react';
import Grafico from '../../components/Graficos/graficos';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
// import { Container } from './styles';

function Dashboard() {


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
    const response = await firebase.firestore().collection('produtos').get();
    const temp = [];
    response.forEach(doc => {
      temp.push({id: doc.id, ...doc.data()});
    })

    
    setQtdProdutos(temp.length);
  } catch (error) {
    console.log('error getProdutos', error);
  }
},[]);

const getRelatorios = useCallback(async () => {
  
  try {
    const response = await firebase.firestore().collection('relatorios').get();
    listaEmpresas.map(empresa => {
      let temp = {nomeEmpresa: '', produtos: 0, quantidade: 0};
      response.forEach(doc => {
        const data = doc.data();
        if (data.id === empresa.id) {
          temp = {nomeEmpresa: empresa.nome, produtos: empresa.produtosVinculados.length-1, quantidade: temp.quantidade + (data.produtos.length -1)}
        }
      })
     
      return setQtdRelatorios([...qtdRelatorios, temp]);
    })
    
  } catch (error) {
    console.log('error getRelatorios', error);
  }
},[]);

useEffect(() => {
  getEmpresas();
  getProdutos();
  getRelatorios();
},[])

  return (
    <>
    <Menu/>
    <p>{qtdProdutos}</p>
    <Grafico/>
    <Footer/>
    </>
  );
}

export default Dashboard;