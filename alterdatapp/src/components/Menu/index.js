import React from 'react';
import { useAuth } from '../../hooks/auth';
import {
   AppBar,
   Toolbar,
   Button,
   Avatar
}
from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Nav } from './styles';
import logo from '../../assets/logo_menu.png';

export default function Menu() {
   const { signOut } = useAuth();

  return (
    <Nav>
    <div className="root">
      <AppBar className = "header" position="static">
        <Toolbar>
        <Avatar className = "avatar">
        <img className = "logo" src={logo} alt="logo"/>
        </Avatar>
          <Link className = "link" to="/dashboard">Dashboard</Link>
          <Link className = "link" to="/cadastro/produto">Cadastro de produto</Link>
          <Link className = "link" to="/cadastro/empresa">Cadastro de Empresas</Link>
          <Link className = "link" to="/relatorio">Relatórios</Link>
          <Link className = "link" to="/transferencia">Transferências</Link>
          <Button  className = "link" onClick={signOut}>
           Sair
          </Button>

        </Toolbar>
      </AppBar>
    </div>
    </Nav>
  );
}
