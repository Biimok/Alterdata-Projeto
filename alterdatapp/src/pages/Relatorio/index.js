import React, {useState} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {withStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Button, Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '../../components/Menu';


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
  
    const [empresas, setEmpresas] = useState('EUR');
    const [produtos , setProdutos] = useState('');


  const handleChange = (event) => {
    setEmpresas(event.target.value);
    };

  const handleChange_ = (event) => {
    setProdutos(event.target.value);
    };


  function createData(name, produto, quantidade, data) {
    return { name, produto, quantidade, data};
  }

    const listaEmpresa = [
        {
          id: '1',
          nome: 'A',
        },
        {
          id: '2',
          nome: 'B',
        },
        {
          id: '3',
          nome: 'C',
        },
        {
          id: '4',
          nome: 'D',
        },
      ];

      const listaProdutos = [
          {
              id: '13',
              nome: 'banana',
          },
          {
              id: '14',
              nome: 'maça'
          }
      ];

      //aqui fazer a função que irá trazer as informações do banco de dados
      const rows = [
        createData('A', 'banana', 13, '24/06/2019'),
        createData('A', 'banana', 13, '24/06/2019'),
        createData('A', 'banana', 13, '24/06/2019'),
        
      ];

     const classes = useStyles();
     // aqui código que deverá conectar com o firebase
    // const [empresas , setEmpresas] = useState("");
    // const [produtos, setProdutos] = useState("");

    // //codigo para buscar as empresas no Firebase
    // const buscarEmpresas = (snap) => {
    //     const listaEmpresas = snap.docs.map((doc) => {
    //       return {
    //         id: doc.id,
    //         ...doc.data()
    //       }
    //     })
    //     setEmpresas(listaEmpresas)
    //   }
    

    // Utilizar somente o get no firebase
    //   useEffect(() => {
    //     const listen = firebase.firestore().collection('Nome da collection').onSnapshot(buscarEmpresas)
    
    //     return () => listen();
    //   }, [])

    // //pensando uma maneira de buscar os produtos 
    //             const buscarProdutos = (snap) => {
    //                 const listaProdutos = snap.docs.map((doc) => {
    //                 return {
    //                     id: doc.id,
    //                     ...doc.data()
    //                 }
    //                 })
    //                 setEmpresas(listaProdutos)
    //             }
                
    //             useEffect(() => {
    //                 const listen = firebase.firestore().collection('Nome da collection').onSnapshot(buscarProdutos)
                
    //                 return () => listen();
    //             }, [])

   


// aqui estou fazendo o teste com o map para as empresas
  return (
    <>
      <Menu/>
      <Container fixed>
          <Grid container spacing={3}>
              <Grid item xs={6}>
              
                  <Paper className={classes.paper}>
                      <form className={classes.root} noValidate autoComplete="off">
                      <TextField
                      id="standard-select-empresas"
                      select
                      value={empresas}
                      onChange={handleChange}
                      helperText="Please select your empresas"
                      >  
                          {listaEmpresa.map((option) => (
                              <MenuItem key={option.value} value={option.nome}>
                              {option.nome}
                              </MenuItem>
                          ))}
                      </TextField>
                      </form>
                  </Paper>
                  
              </Grid>
              <Grid item xs={6}>
                  <Paper className={classes.paper}>DATA</Paper>
              </Grid>
              <Grid item xs={6}>
                  <Paper className={classes.paper}>
                      <form className={classes.root} noValidate autoComplete="off">
                          <TextField
                          id="standard-select-produtos"
                          select
                          value={produtos}
                          onChange={handleChange_}
                          helperText="Please select your produtos"
                          >  
                              {listaProdutos.map((option) => (
                                  <MenuItem key={option.value} value={option.nome}>
                                  {option.nome}
                                  </MenuItem>
                              ))}
                      </TextField>
                      </form>
                  </Paper>
              </Grid>
              <Grid item xs={6}>
                  <Paper className={classes.paper}>DATA</Paper>
              </Grid>
              <Grid item xs={10}>
                
              </Grid>
              
              <Grid item xs={2}>
                <Button variant="contained" color="primary">FILTRAR</Button>
              </Grid>
                  
          </Grid>

        <TableContainer component={Paper}>
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
                <StyledTableCell align="right">{row.q8antidade}</StyledTableCell>
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
