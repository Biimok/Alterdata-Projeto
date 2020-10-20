import React, { useCallback, useEffect, useState } from 'react';
import Grafico from '../../components/Graficos/graficos';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';
import Footer from '../../components/Footer';
import { Grid } from '@material-ui/core';
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
    console.log(temp, "getempresas")
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

    console.log(temp, "getprodutos")
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
  } finally {
    console.log('caiu')
  }
},[]);

useEffect(() => {
  getEmpresas();
  getProdutos();
  getRelatorios();
},[])

  return (
    <Grid>
    <Menu/>
    <p>{qtdProdutos}</p>
    <Grafico/>
    <Footer/>
    </Grid>
  );
}

export default Dashboard;