import styled from 'styled-components';

export const Nav = styled.div`
display: flex;
flex-direction: column;  
padding-bottom: 12px;

.root {
flex-Grow: 1;
}

.menuButton {
margin-Right: 2px;
}

.link {
display: block;
color: white;
font-size: 13px;
text-align: center;
padding: 6px 6px;
text-decoration: none;
font-family: arial;
}

.header {
background-color:  rgb(15, 152, 171);
}

.logo {
width: 65px; 
}

.avatar {
display: flex;
margin: 1px;
width: 40px;
height: 40px;
}

.botao {
text-transform: capitalize;
display: block;
color: white;
font-size: 13px;
padding: 6px 6px;
text-decoration: none;
font-family: arial;
}

`