import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';



import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import CadastroProduto from '../pages/CadastroProduto';
import CadastroEmpresa from '../pages/CadastroEmpresa';
import Relatorio from '../pages/Relatorio';
import Transferencia from '../pages/Transferencia';


const Routes = () => ( 
  
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" exact component={Dashboard} isPrivate/>
      <Route path="/cadastroProduto" component={CadastroProduto} isPrivate/>
      <Route path="/cadastroEmpresa" component={CadastroEmpresa}isPrivate/>
      <Route path="/relatorio" component={Relatorio} isPrivate/>
      <Route path="/transferencia" component={Transferencia} isPrivate/>
    </Switch>
);

export default Routes;