import React from "react";
import Grafico from "../../components/Graficos/graficos";
import Menu from "../../components/Menu";
import { Container } from "@material-ui/core";

function Dashboard() {
  return (
    <>
      <Menu />
      <Container fixed>
        <Grafico />
      </Container>
    </>
  );
}

export default Dashboard;
