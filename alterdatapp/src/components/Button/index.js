import React from 'react';
import { Botao } from './styles';

function Button (props) {
  return (
    <Botao
      type="submit"
      variant="contained"
    > {props.children}
    </Botao>
  )
}

export default Button;