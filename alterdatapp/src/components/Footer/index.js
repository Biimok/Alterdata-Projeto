import React from 'react';
import { 
    CssBaseline,
    Container,
    Typography
  }
from '@material-ui/core';
import { Fot } from './styles';
   
export default function Footer() {
return (
  <Fot className="root">
   <div>
    <CssBaseline />
      <Container component="main" className="main" maxWidth="sm">
        <Typography className="texto">
           Bimmer 2
        </Typography>
      </Container>
    <footer className="footer">
  </footer>
 </div>

</Fot>
    );
  }
