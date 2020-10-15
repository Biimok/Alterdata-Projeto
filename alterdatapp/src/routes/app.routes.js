import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import CadastroProduto from '../pages/CadastroProduto';
import CadastroEmpresa from '../pages/CadastroEmpresa';
import Relatorio from '../pages/Relatorio';
import Transferencia from '../pages/Transferencia';

const AppRoutes = () => {
  return (
    <Switch>
      <Route path="/" component={Dashboard} exact/>
      <Route path="/cadastroProduto" component={CadastroProduto} exact/>
      <Route path="/cadastroEmpresa" component={CadastroEmpresa} exact/>
      <Route path="/relatorio" component={Relatorio} exact/>
      <Route path="/transferencia" component={Transferencia} exact/>
    </Switch>
  )
}

export default AppRoutes;