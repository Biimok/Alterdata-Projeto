import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Container } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));


export default function Relatorio() {
  
    const [empresas, setEmpresas] = useState('EUR');
    const [produtos , setProdutos] = useState('');

  const handleChange = (event) => {
    setEmpresas(event.target.value);
    };

  const handleChange_ = (event) => {
    setProdutos(event.target.value);
    };


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
                
        </Grid>
      
    </Container>
  );
}
