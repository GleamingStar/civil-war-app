import reset from 'styled-reset';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
${reset};
* {
  box-sizing: border-box;
}
body {
  display: flex;
  justify-content: center;
  background-color:#000;
}
a {
  color: inherit;
  text-decoration: none;
}
li {
  display: block;
  text-align: left;
}
ul {
  padding: 0;
  margin: 0;
}
input {
  outline: none;
}
`;

export default GlobalStyle;
