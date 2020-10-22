import React, { useCallback, useEffect, useState } from 'react';
import Grafico from '../../components/Graficos/graficos';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';
//import Footer from '../../components/Footer';
// import { Container } from './styles';

function Dashboard() {



  return (
    <>
    <Menu/>
    <Grafico/>
   
    </>
  );
}

export default Dashboard;