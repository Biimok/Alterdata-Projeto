import React, { useCallback, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

// import { Container } from './styles';

function CadastroEmpresa() {
  const [razaoSocial, setRazaoSocial] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ramo, setRamo] = useState('');

  const setEmpresa = async () => {
    
    if (razaoSocial === '' || cnpj === '' || ramo === '') {
      return console.log('Preencha os campos obrigatórios');
    }

    try {
      await firebase.firestore().collection('empresas').add({
        razaoSocial: razaoSocial,
        cnpj: cnpj,
        ramoAtividade: ramo
      })
      setRazaoSocial('');
      setCnpj('');
      setRamo('');

    } catch(error) {
      console.log('error setEmpresa', error);
    }
  };







  return <div />;
}

export default CadastroEmpresa;