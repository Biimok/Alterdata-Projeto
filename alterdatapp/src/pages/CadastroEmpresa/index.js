import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';

// import { Container } from './styles';

function CadastroEmpresa() {
  const [nome, setNome] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [ramo, setRamo] = useState('');

  const setEmpresa = async () => {
    
    if (nome === '' || cnpj === '' || ramo === '') {
      return console.log('Preencha os campos obrigatórios');
    }

    try {
      await firebase.firestore().collection('empresas').add({
        nome: nome,
        cnpj: cnpj,
        ramoAtividade: ramo
      })
      setNome('');
      setCnpj('');
      setRamo('');

    } catch(error) {
      console.log('error setEmpresa', error);
    }
  };

  return (
    <>
      <Menu/>
      <form onSubmit={setEmpresa}>
        <input type="text" name="nome" placeholder="Nome" value={nome} onChange={(text) => setNome(text.target.value)}></input>
        <input type="text" name="cnpj" placeholder="Cnpj" value={cnpj} onChange={(text) => setCnpj(text.target.value)}></input>
        <input type="text" name="ramo" placeholder="Ramo" value={ramo} onChange={(text) => setRamo(text.target.value)}></input>
       <button type="submit" >Cadastrar</button>
      </form>




    </>
)
}

export default CadastroEmpresa;