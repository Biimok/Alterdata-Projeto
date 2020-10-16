import { Chart } from "react-google-charts";
import React from 'react';

// import { Container } from './styles';

function Graficos() {
  return (
  <div style = {{display: 'flex'}}>
    <Chart
      width={720}
      height={400}
      chartType = "BarChart"
      loader={<div> Gerando  Gráficos </div>}
      data= {[
        ['Empresa', 'Em estoque', 'Movimentado'],
        ['empresa A',   2000,          250],
        ['empresa B',   5000,          900 ],
        ['empresa C',   4200,          3000],
        ['empresa D',   9000,          7500],
        ['empresa E',   2500,          550 ],
        ['empresa F',   1260,          490],
        ['empresa G',   1242,          250],
        ['empresa H',   650,          900 ],
        ['empresa I',   2750,          1500],

      ]}

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
      //legendToggle

      // Gráfico de linhas:
      />
      
      <Chart
  width={'600px'}
  height={'400px'}
  chartType="LineChart"
  data={[
    ['Dia', 'Movimentação'],
    [1, 0],
    [2, 110],
    [3, 223],
    [4, 137],
    [5, 158],
    [6, 97],
    [7, 191],
    [8, 271],
    [9, 338],
    [10, 404],
    [11, 324],
    [12, 353],
    [13, 232],
    [14, 110],
    [15, 239],
    [16, 171],
    [17, 189],
    [18, 900],
    [19, 1000],
    [20, 2700],
    [21, 3300],
    [22, 4000],
    [23, 4532],
    [24, 4735],
    [25, 7823],
    [26, 9042],
    [27, 10050],
    [28, 11118],
    [29, 12200],
    [30, 12250],
  ]}
  options={{
    hAxis: {
      title: 'Moviemento dos últimos 30 dias',
    },
    vAxis: {
      title: 'Movimentação',
    },
  }}
  rootProps={{ 'data-testid': '1' }}

  //Pizza
/>

      
      <Chart
        width={'720px'}
        height={'400px'}
        chartType="PieChart"
        data={[
          ['Empresa', 'Qntd.Produtos'],
          ['A',            3323],
          ['B',            2623],
          ['C',            2322],
          ['D',            2300], 
          ['E',             2219], 
          ['F',            2210],
          ['G',            4320],
          ['H',            2321],
          ['I',            2112]
        ]}
        options={{
          title: 'Estoque',
         //sliceVisibilityThreshold:   20%
        }}
        rootProps={{ 'data-testid': '7' }}
/>
    </div>)
}

export default Graficos;


