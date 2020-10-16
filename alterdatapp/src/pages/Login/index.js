import React, { useState } from "react";
import { useAuth } from "../../hooks/auth";
import { useHistory } from 'react-router-dom';

import { 
  Avatar, 
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Container
}
from '@material-ui/core';

import logo from "../../assets/logo.png";
import { Wrap } from "./styles";

function Login() {
  const history = useHistory();
  const { signIn } = useAuth();

  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");
  const [ loading, setLoading ] = useState(false);

  async function handleSubmit() {
    if(!email) return;
    if(!password) return;

    setLoading(true);

    console.log(email, password)

    try {
      await signIn({
        email: email,
        password: password
      });

      history.push('/dashboard');

    } catch(error) {
      console.log('error handleSubmit', error);
      console.log('usuario ou senha não confere');
    } finally {
      setLoading(false);
    }
  }

  return (
      <Wrap>
        <Container className = "bloco" component="main" maxWidth="xs">
          <form className="form" onSubmit={handleSubmit}>
            <div className = "espaco">
            <CssBaseline  />
            <div className="paper">
              <Avatar className="avatar">
                <img className = "logo" src={logo} alt="personagem login" />
              </Avatar>

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Endereço de e-mail"
                name="email"
                autoFocus
                value={email}
                onChange={(text) => setEmail(text.target.value)}
              />
              <TextField 
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Senha"
                type="password"
                id="password"
                value={password}
                onChange={(text) => setPassword(text.target.value)}
              />
            
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className="submit"
              >
                {loading ? 'Carregando...' : 'Entrar'}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Esqueceu sua senha?
                  </Link>
                </Grid>
                <Grid item></Grid>
              </Grid>
            </div>
            <Box mt={8}></Box>
            </div>
          </form>
        </Container>
      </Wrap>
   
  );
}

export default Login;
