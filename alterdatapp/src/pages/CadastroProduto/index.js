import React, { useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';
import { Form } from '@unform/web';
import Input from '../../components/Form/input';
import * as Yup from 'yup';

// import { Container } from './styles';

function CadastroProduto() {
  const formRef = useRef(null);

  const setProduto = async (data, { reset }) => {

    try {

      const schema = Yup.object().shape({
        nome: Yup.string().lowercase().required(),
        valor: Yup.number().required(),
        quantidade: Yup.number().required(),
        categoria: Yup.string().lowercase().required(),
        descricao: Yup.string().lowercase().required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);


      await firebase.firestore().collection('produtos').add({
        nome: data.nome,
        valor: data.valor,
        quantidade: data.quantidade,
        categoria: data.categoria,
        descricao: data.descricao
      })

      reset();
      
    } catch(error) {
      console.log('error setProduto', error);
    } 
  };

  return (
    <>
      <Menu/>
      <Form onSubmit={setProduto} ref={formRef}>
        <Input type="text" name="nome" placeholder="Nome"/>
        <Input type="number" name="valor" placeholder="Valor"/>
        <Input type="number" name="quantidade" placeholder="Quantidade"/>
        <Input type="text" name="categoria" placeholder="Categoria"/>
        <Input type="text" name="descricao" placeholder="Descrição"/>
        <button type="submit" >Cadastrar</button>
      </Form>
    </>
  )
}

export default CadastroProduto;