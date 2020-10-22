import React, { useState, useCallback, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Menu from '../../components/Menu';
import 'firebase/firestore';
import firebase from 'firebase/app';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Botao } from './styles';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    borderTop: '2px solid white',
    borderTopWidth: '4px',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);




export default function Relatorio() {


  const [empresas, setEmpresas] = useState([]);
  const [produtosVinculados , setProdutosVinculados] = useState([]);
  
  const pegarEmpresas = useCallback(async () => {
  
    try {
      const resposta = await firebase.firestore().collection('empresas').get();
      const resp = [];
  
      resposta.forEach(doc => {
        resp.push({id: doc.id, ...doc.data()});
      })
  
      setEmpresas(resp);
    } catch (error) {
      console.log('error ao selecionar Empresas', error);
    }
  },[]);


  
  const pegarProdutos = useCallback(async (empresa) => {
    
    try {
      const resposta = await firebase.firestore().collection('empresas').doc(empresa.id).collection('produtosVinculados').get();
      console.log(resposta)
  
      const resp = [];
  
      resposta.forEach(doc => {
        resp.push({id: doc.id, ...doc.data()});
      })
  
      setProdutosVinculados(resp);
    } catch (error) {
      console.log('error ao recuperar produtos', error);
    }
  },[]);


  
  useEffect(() => {
    pegarEmpresas();
    pegarProdutos();
  },[pegarEmpresas, pegarProdutos])
  


  function createData(name, produto, quantidade, data) {
    return { name, produto, quantidade, data};
  }


  //função de datas

  // const filtrarRelatorio = async () => {
  //   try{
  //     const resposta = await firebase.firestore().collection('produtos').where('data' , 'beetween' , 'dataSelecionada')
  //   }
  //   catch (error){
  //     console.log('error nas datas', error)
  //   }
  //      }

  
      //aqui fazer a função que irá trazer as informações do banco de dados
      const rows = [
        createData('A', 'banana', 13, '24/06/2019'),
        createData('B', 'banana', 13, '24/06/2019'),
        createData('C', 'banana', 13, '24/06/2019'),
        
      ];

     const classes = useStyles();


  return (
    <>
    <Menu/>
    <Container>
        <Grid container spacing={3}>
            <Grid  item xs={6}>
                    <Autocomplete
                            id="empresa"
                            options={empresas}
                            getOptionLabel={(option) => option.nome}
                            onChange={(event,option) => pegarProdutos (option)}
                            style={{ width: 580 }}
                            disableClearable
                            renderInput={(params) => <TextField {...params} label="Selecione a empresa" variant="outlined" />}
                    />
            </Grid>

            <Grid item xs={4}></Grid>

            <Grid  item xs={2}>
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Data Inicial"
                  type="date"
                  defaultValue=""
                  fullWidth={true}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </Grid>

            <Grid  item xs={6}>     
                    <form className={classes.root} noValidate autoComplete="off">
                    <Autocomplete
                            id="produto-vinculado"
                            options={produtosVinculados}
                            getOptionLabel={(option) => option.nome}
                            style={{ width: 580 }}
                            disableClearable
                            renderInput={(params) => <TextField {...params} label="Selecione o produto" variant="outlined" />}
                    />
                    </form>
            </Grid>

            <Grid item xs={4}></Grid>

            <Grid item xs={2}>
              
              <form className={classes.container} noValidate>
                <TextField
                  id="date"
                  label="Data Final"
                  type="date"
                  defaultValue=""
                  fullWidth={true}
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>

            </Grid>

            <Grid item xs>            
            </Grid>
            
            <Grid  container item xs={2} justify="flex-end">     
               <Botao>FILTRAR</Botao>
            </Grid>
                
        </Grid>     
          <TableContainer className={classes.container} component={Paper}>
           <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Empresas</StyledTableCell>
                <StyledTableCell align="right">Nome do Produto</StyledTableCell>
                <StyledTableCell align="right">Quantidade</StyledTableCell>
                <StyledTableCell align="right">Data</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.produto}</StyledTableCell>
                  <StyledTableCell align="right">{row.quantidade}</StyledTableCell>
                  <StyledTableCell align="right">{row.data}</StyledTableCell>
                  
                </StyledTableRow>
              ))}
            </TableBody>
           </Table>
         </TableContainer>
    </Container>
    </>
  );
}

