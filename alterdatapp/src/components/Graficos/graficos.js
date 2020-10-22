import React, { useState, useCallback, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { Grid, Container } from '@material-ui/core'
import { GrafStyle } from './styles';
import firebase from 'firebase/app';
import 'firebase/firestore';

function Graficos() {
  const [barData, setBarData] = useState([]);
  const [pieData, setPieData] = useState([]);
  const [grafData, setGrafData] = useState([]);

  const getEmpresas = useCallback(async () => {
    try {
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
      console.log(finalArray, 'getempresas Grafico');
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

      const finalArray = [['Empresa', 'Em estoque', 'Movimentado']]
      lista.map(empresa => {
        let temp = [];
        let count = 0;
        responseFull.forEach(doc => {
          const data = doc.data();
          if (data.empresaEntrada.id === empresa.id || data.empresaSaida.id === empresa.id) {
            count++;
            temp = [empresa.nome, empresa.produtosVinculados, count]
          }
        })
        if (count === 0) {
          temp = [empresa.nome, empresa.produtosVinculados, count]
        }
        finalArray.push(temp); 
      })
      console.log(finalArray, 'getRelatorios Grafico');
      setBarData(finalArray);
      getRelatoriosFilter();
      
    } catch (error) {
      console.log('error getRelatorios', error);
    }
  };

  const getRelatoriosFilter = async () => {
    let dia = new Date();
    dia.setDate(dia.getDate()-30);
    dia.setHours(0);
    dia.setMinutes(0);
    dia.setSeconds(0);
    const response = await firebase.firestore().collection('relatorios').where("dataRealizada", ">=", dia).orderBy("dataRealizada", "asc").get();
    const finalArray = [];
    let temp = [];
    let count = 0;
    let check = '';
    response.forEach(doc => {
      
      const data = doc.data();
      const newData = new Date(data.dataRealizada.seconds*1000);
      data.dataRealizada = `${newData.getDate()}/${newData.getMonth()+1}/${newData.getFullYear()}`;
      console.log(data.dataRealizada);
      if (temp.length === 0) {
        check = data.dataRealizada;
        count++;
        temp = [data.dataRealizada, count]
      } else if (data.dataRealizada === check) {
        count++;
        temp = [data.dataRealizada, count]
      } else {
        finalArray.push(temp);
        count = 1;
        temp = [data.dataRealizada, count]
      }
    });

    if (finalArray.length === 0) {
      finalArray.push(temp);
    }
    console.log(finalArray, 'getFilter Grafico');
    setGrafData(finalArray);
  }

  useEffect(() => {
    getEmpresas();
  }, [getEmpresas]);


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

          // Falta definir os options para customizar

          options={{
          title: 'Gráfico de Movimentação',
          chartArea: { width: '40%'},
          colors: ['#0f98ab', '#9c0707'], // cor das barras
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
               title: 'Estoque Por Empresa',
               pieHole: 0.4, // espaçamento central 
               colors: ['#0f98ab', '#a2c4c9', '#76a5af', '#45818e', '#134f5c', '#0c343d'], // Cores das fatias
               pieSliceTextStyle: {
                color: 'black', // Cor do texto que vai dentro do Gráfico
              },
               // pieSliceText: 'percentage', // Tipo de exibição do dado no gráfico (% ou nome)
                pieSliceBorderColor: 'rgb(12,52,61)', //Cor de contorno do gráfico
                //legend: 'labeled', //Define onde fica a Legenda do gráfico (labeled, none e direcionada)
               }}
               rootProps={{ 'data-testid': '7' }}

                //Filtro de pesquisa: 
               //Problema com o Grid parcialmente resolvido, preciso ainda  reposicionar o elemento na tela
               
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
              [2,         1103],
              [3,         2123],
              [4,         1337],
              [5,         158],
              [6,          9271],
              [7,         1912],
              [8,         2721],
              [9,         3318],
              [10,        4044],
              [11,        3224],
              [12,        3523],
              [13,        2332],
              [14,        1110],
              [15,        2319],
              [16,        1711],
              [17,        1819],
              [18,        9030],
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

            //Falta definir os Options para customização

            options={{
              colors:['#0f98ab'], // cor da linha
              hAxis: {
              title: 'Movimento dos últimos 30 dias',
              },
              //pointSize: 2, // Gera pontos visíveis em cada dia no gráfico, valor do tamanho
              lineSize: 2, // Espessura da linha
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
