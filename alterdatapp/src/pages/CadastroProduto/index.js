import React, { useRef } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import Menu from '../../components/Menu';
import { Form } from '@unform/web';
import Input from '../../components/Form/input';
import * as Yup from 'yup';
import Button from '../../components/Button';
import { Formul } from './styles';





// import { Container } from './styles';

function CadastroProduto() {
  const formRef = useRef(null);

  const setProduto = async (data, { reset }) => {

    try {

      const schema = Yup.object().shape({
        nome: Yup.string().lowercase().required(),
        valor: Yup.number().required(),
        categoria: Yup.string().lowercase().required(),
        descricao: Yup.string().lowercase().required()
      });

      await schema.validate(data, {
        abortEarly: false,
      });



      await firebase.firestore().collection('produtos').add({
        nome: data.nome,
        valor: data.valor,
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
      <Formul>
      <Form onSubmit={setProduto} ref={formRef}>
        <div className = "campos">
        <Input id="campoMaior" type="text" name="nome" label="Nome"/>
        </div>
        <div className = "campos">
        <Input id="campoMaior" type="number" name="valor" label="Valor"/>
        </div>
        <div className = "campos">
        <Input id="campoMaior" type="text" name="categoria" label="Categoria"/>
        </div>
        <div className = "campos">
        <Input id="campoDescricao" type="text" name="descricao" label="Descrição" multiline
          rows={4}/>
        </div>
        <div className = "campos">
        <Button>Cancelar</Button>
        <Button type="submit">Cadastrar</Button>
        </div>
      </Form>
      </Formul>
    </>
  )
}

export default CadastroProduto;


