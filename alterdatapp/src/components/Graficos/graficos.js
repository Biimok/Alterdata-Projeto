import React, { useState, useCallback, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { Grid, Container } from '@material-ui/core'
import { GrafStyle } from './styles';
import firebase from 'firebase/app';
import 'firebase/firestore';

function Graficos() {
  const [listaEmpresas, setListaEmpresas] = useState([]);
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [dia, setDia] = useState(`${new Date().getDate()}-${new Date().getMonth()}-${new Date().getFullYear()}`);

  const getEmpresas = useCallback(async () => {
    try {
      console.log(dia);
      const response = await firebase.firestore().collection('empresas').get();

      const finalArray = [['Empresa', 'QtdProduto']];
      const temp = [];
      response.forEach(async doc => {
        let countP = 0;
        const responseP = await firebase.firestore().collection('empresas').doc(doc.id).collection('produtosVinculados').get();
        responseP.forEach(prod => countP = countP + prod.data().quantidade)
        temp.push({id: doc.id, ...doc.data(), produtosVinculados: responseP.size || 0});
        finalArray.push([doc.data().nome, countP || 0]);
      })
      setListaEmpresas(temp);
      setPieData(finalArray)
      getRelatoriosFull(temp);
    } catch (error) {
      console.log('error getEmpresas', error);
    }
  }, []);

  const getRelatoriosFull = async (lista) => {
    const relatRef = firebase.firestore().collection('relatorios');
    try {
      const responseFull = await relatRef.get();
      // const responseFilter = await relatRef.where("dataRealizada", ">=", dia).orderBy("dataRealizada", "asc").get();
      

      const finalArray = [['Empresa', 'Em estoque', 'Movimentado']]
      lista.map(empresa => {
        let temp = [];
        let count = 0;
        responseFull.forEach(doc => {
          const data = doc.data();
          if (data.empresaEntrada.id === empresa.id || data.empresaSaida.id === empresa.id) {
            count++;
            temp = [empresa.nome, empresa.produtosVinculados, count]
          } else {
            temp = [empresa.nome, empresa.produtosVinculados, count]
          }
        })
        finalArray.push(temp); 
      })
      console.log(finalArray)
      setBarData(finalArray);
      // getRelatoriosFilter(responseFilter);
      
    } catch (error) {
      console.log('error getRelatorios', error);
    }
  };

  // const getRelatoriosFilter = (response) => {
  //   const lista = [];
  //   const data = [];

  //   response.forEach(doc => {
  //     lista.push({id: doc.id, ...doc.data()});
  //   });

  //     /*
  //       0:
  //         dataEntrega: "10/11/1111"
  //         dataRealizada: "21/10/2020"
  //         descricao: ""
  //         empresaEntrada: {id: "Estoque", nome: "estoque"}
  //         empresaSaida: {id: "", nome: ""}
  //         id: "0vdeX2mVlit4gb46FrIX"
  //         produtos: (2) [{…}, {…}] 
  //     */

  // }

  useEffect(() => {
    getEmpresas();
  }, [getEmpresas])

  return (

<GrafStyle>
  <Container fixed>
  <div className="root">
   <Grid container spacing={2}>
   <Grid item xs={12} sm={6}>
   <Chart className= "border"
          width={600}
          height={360}
          chartType = "BarChart"
          //loader={<div> Gerando  Gráficos... </div>}
          data= {barData}

          options={{
          title: 'Gráfico de Movimentação',
          chartArea: { width: '40%'},
          hAxis: {
            title: 'Movimentações',
            minValue: 0
            },
          vAxis: {
            title: 'Empresas',
            },
          }}
          />
         
    </Grid>
    <Grid item xs={12} sm={6}>
    <Chart className= "border"
           width={600}
           height={360}
           chartType="PieChart"
           data={pieData}
               options={{
               title: 'Estoque',
               pieHole: 0.4,
               pieSliceTextStyle: {
                color: 'black',
              },
               }}
               rootProps={{ 'data-testid': '7' }}

               //Problema com o Grid resolvido, preciso ainda  reposicionar o elemento na tela

               chartPackages={['corechart', 'controls']}
               controls={[
                 {
                   controlEvents: [
                     {
                       eventName: 'statechange',
                       callback: ({ chartWrapper, controlWrapper }) => {
                       },
                     },
                   ],
                   controlType: 'CategoryFilter',
                   options: {
                     filterColumnIndex: 0,
                     ui: {
                       labelStacking: 'vertical',
                       label: 'Filtrar Empresa:',
                       //allowTyping: false,
                       allowMultiple: true,
                     },
                   },
                 },
               ]}

             />
    </Grid>
    <Grid item xs={12}>
    <Chart className= "border"
          width={600}
          height={360}
          chartType="LineChart"
          data={[
              ['Dia', 'Movimentação'],
              [1,           0],
              [2,         110],
              [3,         223],
              [4,         137],
              [5,         158],
              [6,          97],
              [7,         191],
              [8,         271],
              [9,         338],
              [10,        404],
              [11,        324],
              [12,        353],
              [13,        232],
              [14,        110],
              [15,        239],
              [16,        171],
              [17,        189],
              [18,        900],
              [19,        1000],
              [20,        2700],
              [21,        3300],
              [22,        4000],
              [23,        4532],
              [24,        4735],
              [25,        7823],
              [26,        9042],
              [27,        10050],
              [28,        11118],
              [29,        12200],
              [30,        12250],
            ]}
            options={{
              hAxis: {
              title: 'Movimento dos últimos 30 dias',
              },
              vAxis: {
              title: 'Movimentação',
              },
            }}
            rootProps={{ 'data-testid': '1' }}
          />
 </Grid>
 </Grid>
 </div>
 </Container>
 </GrafStyle>
  )
}

export default Graficos;
