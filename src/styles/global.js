import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    height: 100%;
  }

  body {
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
    padding: 0;
    margin: 0;
  }
`;
