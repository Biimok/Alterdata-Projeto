import React, { useCallback, useEffect, useState } from 'react';
import Grafico from '../../components/Graficos/graficos';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';
//import Footer from '../../components/Footer';
// import { Container } from './styles';

function Dashboard() {

const [ qtdProdutos, setQtdProdutos ] = useState(null);



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



  return (
    <>
    <Menu/>
    <p>{qtdProdutos}</p>
    <Grafico/>
   
    </>
  );
}

export default Dashboard;