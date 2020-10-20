import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { Fot } from './styles'


export default function Footer() {
  

  return (
    <Fot>
    <div className="root">
      <footer className="footer">
        <Container maxWidth="sm">
          <Typography className="texto" >Bimmer 2</Typography>
        </Container>
      </footer>
    </div>
    </Fot>
  );
}

  
  