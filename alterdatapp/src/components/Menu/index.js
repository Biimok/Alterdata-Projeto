import React from 'react';
import { useAuth } from '../../hooks/auth';


import {
   AppBar,
   Toolbar,
   Button
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Nav } from './styles';

export default function Menu() {
   const { signOut } = useAuth();

  return (
    <Nav>
    <div className="root">
      <AppBar className = "header" position="static">
        <Toolbar>
          <Link className = "link" to="http://localhost:3000/"></Link>
          <Link className = "link" to="/dashboard">Dashboard</Link>
          <Link className = "link" to="/cadastro/produto">Cadastro de produto</Link>
          <Link className = "link" to="/cadastro/empresa">Cadastro de Empresas</Link>
          <Link className = "link" to="/relatorios">Relatórios</Link>
          <Link className = "link" to="/transferencia">Transferências</Link>
          <Button  onClick={signOut}>
           Sair
          </Button>

        </Toolbar>
      </AppBar>
    </div>
    </Nav>
  );
}
