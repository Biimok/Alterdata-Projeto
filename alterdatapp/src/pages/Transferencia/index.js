import React, { useState, useCallback, useEffect } from 'react';
import firebase, { firestore } from 'firebase/app';
import 'firebase/firestore';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Menu from '../../components/Menu';
import { Transf } from './styles';

// import { Container } from './styles';

function Transferencia() { 
const batch = firebase.firestore().batch();

const [listaEmpresas, setListaEmpresas] = useState([]);
const [listaProdutos, setListaProdutos] = useState([]);
const [produtosSelec, setProdutosSelec] = useState([]);
const [empresaEntrada, setEmpresaEntrada] = useState({nome: '', id: ''});
const [empresaSaida, setEmpresaSaida] = useState({nome: '', id: ''});
const [dataEntrega, setDataEntrega] = useState(Date);
const [descricao, setDescricao] = useState('');
const [produto, setProduto] = useState({});
const [qtdSelecionada, setQtdSelecionada] = useState(0);



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

    setListaProdutos(temp);
  } catch (error) {
    console.log('error getProdutos', error);
  }
}, []);

const upRelatorios = async () => {

  
    await firestore().collection('relatorios').add({
      empresaEntrada: {
        nome: empresaEntrada.nome,
        id: empresaEntrada.id
      },
      empresaSaida: {
        nome: empresaSaida.nome,
        id: empresaSaida.id
      },
      dataEntrega: dataEntrega.toLocaleDateString('pt-BR'),
      dataRealizada: new Date().toLocaleDateString('pt-BR'),
      descricao: descricao,
      produtos : produtosSelec
    }).then(() => {
      console.log('sucess relatorio')
    })
      .catch((error) => {
        console.log('error relatorio', error)
      });

      produtosSelec.forEach( async (doc) => {
        let docEntRef =  firestore()
                         .collection('empresas')
                         .doc(empresaEntrada.id)
                         .collection('produtosVinculados')
                         .doc(doc.id) || {};
        
        let docSaiRef = 
                        firestore()
                        .collection('empresas')
                        .doc(empresaSaida.nome)
                        .collection('produtosVinculados')
                        .doc(doc.id) || {};

                        batch.update(docSaiRef, {quantidade: (docSaiRef.quantidade) - doc.qtdSelecionada})
        
      })
      
    
    
};

const addProduto = () => {
  let check = false;
  if(produtosSelec.length > 0) {
    produtosSelec.forEach((item) => {
      if (item.id === produto.id) {
          check = true;
      } 
    });
  }
  
  if (!check) {
    setProdutosSelec([...produtosSelec, {...produto, qtdSelecionada: qtdSelecionada}]);
  } else {
    setProdutosSelec(produtosSelec.filter((item) => (item.id === produto.id ? item.qtdSelecionada = qtdSelecionada : item)))
  }
  // [...produtosSelec, {...produto, qtdSelecionada: qtdSelecionada}]
  
  
}



useEffect(() => {
  getEmpresas();
  getProdutos();
},[getEmpresas, getProdutos])

// const selecProduto = (produto, quantidade) => {
//   setProdutosSelec([...produtosSelec, {nome: produto.nome, id: produto.id, quantidade: quantidade}])
// }

  return (
    <Transf>
      <Menu/>
      
        <Autocomplete
          id="empresa-entrada"
          options={listaEmpresas}
          getOptionLabel={(option) => option.nome}
          onChange={(value, text) => setEmpresaEntrada({nome: text.nome, id: text.id})}
          style={{ width: 300 }}
          disableClearable
          renderInput={(params) => <TextField {...params} label="Empresa de entrada" variant="outlined" />}
        />
        <Autocomplete
          id="empresa-saida"
          options={listaEmpresas}
          onChange={(value, text) => setEmpresaSaida({nome: text.nome, id: text.id})}
          getOptionLabel={(option) => option.nome}
          style={{ width: 300 }}
          disableClearable
          renderInput={(params) => <TextField {...params} label="Empresa de saída" variant="outlined" />}
        />
        <TextField 
          type="date"
          label="Data de Entrega"
          variant="outlined"
          onChange={(date) => setDataEntrega(date.target.valueAsDate)}
        />
        <TextField 
          label="Descrição"
          multiline
          rowsMax={5}
          variant="outlined"
          onChange={(text) => setDescricao(text.target.value)}
        />
        
        <Autocomplete
          id="produto"
          options={listaProdutos}
          onChange={(value, text) => setProduto(text)}
          getOptionLabel={(option) => option.nome}
          style={{ width: 300 }}
          disableClearable
          renderInput={(params) => <TextField {...params} label="Produto" variant="outlined" />}
        />
        <TextField 
          type="number" 
          inputProps={{max:produto.quantidade || 0, min:0}} 
          defaultValue={0}
          onChange={(number) => setQtdSelecionada(number.target.value)}
        />
        <p>Max: {produto.quantidade > 0 ? produto.quantidade : "N/A"}</p>
        <button onClick={addProduto}>Adicionar</button>
       
        <div> 
          {produtosSelec.map(produto => (
            
            <div key={produto.id}>
            <p>Nome: {produto.nome}</p>
            <p>Quantidade: {produto.qtdSelecionada}</p>
            </div>
          ))}
        </div>

        <button onClick={upRelatorios}>Finalizar</button>
        <button>Cancelar</button>
      
        
   </Transf>
    );
}

export default Transferencia;