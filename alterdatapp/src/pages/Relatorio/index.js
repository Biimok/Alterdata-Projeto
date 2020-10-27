import React, { useState, useCallback, useEffect } from 'react';
import {useTheme} from '@material-ui/core/styles';
import {
  Divider, 
  Container , 
  Typography,
  TextField, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableFooter, 
  TablePagination,
  TableRow,
  TableHead,
  Paper,
  IconButton,
  Grid
} from '@material-ui/core';
import Menu from '../../components/Menu';
import 'firebase/firestore';
import firebase from 'firebase/app';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Botao , StyledTableCell, Empresa, Root } from './styles';
import PropTypes from 'prop-types';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Footer from '../../components/Footer';



function TablePaginationActions(props) {
  
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Root>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Root>
  );
}
TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};
function createData(name, produto, quantidade, data) {
  return { name, produto, quantidade, data};
}

//aqui fazer a função que irá trazer as informações do banco de dados
    const rows = [
      createData('A', 'banana', 13, '24/06/2019'),
      createData('B', 'banana', 13, '24/06/2019'),
      createData('C', 'banana', 13, '24/06/2019'),
      createData('D', 'banana', 13, '24/06/2019'),
      createData('E', 'banana', 13, '24/06/2019'),
      createData('F', 'banana', 13, '24/06/2019'),
      createData('G', 'banana', 13, '24/06/2019'),
      createData('H', 'banana', 13, '24/06/2019'),
    
    ];

export default function Relatorio() {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [empresas, setEmpresas] = useState([]);
  const [produtosVinculados , setProdutosVinculados] = useState([]);
  const [dataInicial , setDataInicial] = useState(Date);
  const [dataFinal , setDataFinal] = useState(Date);
  const [empresaSelec, setEmpresaSelec] = useState('');
  const [produtoSelec, setProdutoSelec] = useState('');
  const [relatFiltrado, setRelatFiltrado] = useState([]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
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
      if(empresa) {
        const resposta = await firebase.firestore().collection('empresas').doc(empresa.id).collection('produtosVinculados').get();
      
        const resp = [];
        
        resposta.forEach(doc => {
          resp.push({id: doc.id, ...doc.data()});
        })
        setEmpresaSelec(`${empresa.id}_${empresa.razaoSocial}`);
        console.log(resp)
        setProdutosVinculados(resp);
      }

      
    } catch (error) {
      console.log('error ao recuperar produtos', error);
    }
  },[]);

  useEffect(() => {
    pegarEmpresas();
    pegarProdutos();
  },[pegarEmpresas, pegarProdutos])
  
  const filtrarProdutos = async () => {
    try {
    const response = await firebase.firestore().collection("relatorios")
    .where("empresaEntrada", "==", `${empresaSelec}`)
    .orderBy("dataRealizada").startAt(dataInicial).endAt(dataFinal).limit(25).get();

    const resp = [];
    response.forEach(doc => {
      resp.push({id: doc.id, ...doc.data()});
    });

    setRelatFiltrado(resp);


    } catch(error) {
      console.log('erro no filtro', error);
    }
    
   
 };

  return (
    <>
    <Menu/>
    <Empresa>
    <Container>
      <Typography className="textoRegistro" variant="h5">
        Filtro
      </Typography>
      <Divider style={{paddingTop: "5px", marginBottom: "25px"}}/>
        <Grid container spacing={3}>
            <Grid container item xs={6}>
                    <Autocomplete
                            id="empresa"
                            options={empresas}
                            getOptionLabel={(option) => option.razaoSocial}
                            onChange={(event,option) => option ? pegarProdutos (option) : ''}
                            style={{ width: 580 }}
                            renderInput={(params) => <TextField {...params} label="Selecione a empresa" variant="outlined" />}
                    />
            </Grid>

            <Grid container item xs={4}/>

            <Grid  container item xs={2}>
                <TextField
                  label="Data Inicial"
                  type="date"
                  onChange={(date)=> setDataInicial(date.target.valueAsDate)}
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </Grid>

            <Grid  container item xs={6}>     
                    <Autocomplete
                            id="produto-vinculado"
                            options={produtosVinculados}
                            getOptionLabel={(option) => option.nome}
                            onChange={(event,option) => option ? setProdutoSelec(option.id) : ''}
                            style={{ width: 580 }}
                            renderInput={(params) => <TextField {...params} label="Selecione o produto" variant="outlined" />}
                    />
            </Grid>

            <Grid container item xs={4}/>

            <Grid container item xs={2}>             
                <TextField
                  label="Data Final"
                  type="date"
                  onChange={(date)=> setDataFinal(date.target.valueAsDate)}
                  fullWidth={true}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
            </Grid>

            <Grid container item xs/>            
            
            
            <Grid  container item xs={2} justify="flex-end">     
               <Botao
               onClick={() => filtrarProdutos()}
               >FILTRAR
               </Botao>
            </Grid>
                
        </Grid>     
          <Typography className="textoRegistro" variant="h5">
            Resultado
          </Typography>
          <Divider style={{paddingTop: "5px", marginBottom: "25px"}}/>
          <TableContainer  component={Paper}>
           <Table  aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Empresas</StyledTableCell>
                <StyledTableCell align="left">Quantidade</StyledTableCell>
                <StyledTableCell align="left">Data de Entrada</StyledTableCell>
                <StyledTableCell align="right">Data de Entrega</StyledTableCell>
              </TableRow>
            </TableHead>
            {(relatFiltrado.length < 1 ? 
              <TableBody></TableBody>
            : (
              <TableBody>
            {(rowsPerPage > 0
            ? relatFiltrado.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : relatFiltrado
            ).map((rows) => (
              <TableRow key={rows.id}>
                <TableCell component="th" scope="row">
                  {rows.empresaEntrada.slice(rows.empresaEntrada.indexOf("_")+1)}
                </TableCell>
                <TableCell style={{ width: 400 }} align="left">
                  {rows.produtos.length}
                </TableCell>
                <TableCell style={{ width: 200}} align="left">
                {new Date(rows.dataRealizada.seconds*1000).toLocaleDateString('pt-BR')}
                </TableCell>
                <TableCell style={{ width: 160 }} align="right">
                  {new Date(rows.dataEntrega.seconds*1000).toLocaleDateString('pt-BR')}
                </TableCell>
              </TableRow>
              ))}
              {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
              )}
            </TableBody>
            )
            
            )
            }
            
            <TableFooter>
          <TableRow>
            <TablePagination
              labelRowsPerPage={'Linhas por página'}
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
          </TableFooter>
           </Table>
         </TableContainer>
    </Container>
    </Empresa>
    <Footer/>
    </>
  );
}

