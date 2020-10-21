import React, { useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';
import { Form } from '@unform/web';
import Input from '../../components/Form/input';
import * as Yup from 'yup';
import Button from '../../components/Button';

// import { Container } from './styles';

function CadastroEmpresa() {
  const formRef = useRef(null);

  const setEmpresa = async (data, { reset }) => {

    try {
      const schema = Yup.object().shape({
        nome: Yup.string().lowercase().required(),
        cnpj: Yup.string().min(14).max(14).required(),
        ramo: Yup.string().lowercase().required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      console.log(data);

      await firebase.firestore().collection('empresas').add({
        nome: data.nome,
        cnpj: data.cnpj,
        ramoAtividade: data.ramo
      })

      reset();

    } catch(err) {
      console.log('error setEmpresa', err);
    }
  };

  return (
    <>
      <Menu/>
      <Form ref={formRef} onSubmit={setEmpresa}>
        <Input type="text" name="nome" label="Nome" />
        <Input type="text" name="cnpj" label="Cnpj"/>
        <Input type="text" name="ramo" label="Ramo"/>
        <Button>Cancelar</Button>
        <Button type="submit" >Cadastrar</Button>
       
      </Form>




    </>
)
}

export default CadastroEmpresa;