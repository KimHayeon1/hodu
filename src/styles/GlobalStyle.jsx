import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import './fonts.css';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  :root {
    font-size: 10px;

    --brand-color: #21BF48;
    --brand-color-light: #EFFFF3;

    --gray-100: #F2F2F2;
    --gray-200: #E0E0E0;
    --gray-300: #C4C4C4;
    --gray-400: #767676;
    --gray-500: #333333;

    /* 시멘틱 컬러 */
    --error-color:#EB5757;

    
    font-family: 'Spoqa Han Sans Neo', sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input, textarea {
    font-family: inherit;
    padding: 0;
    border: none;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
    background-color: inherit;
  }

  button {
    cursor: pointer;
  }

  ol, ul, li {
    list-style: none;
  }

  img {
    display: block;
    width: 100%;
    /* height: 100%; */
  }

  .a11y-hidden {
    clip: rect(1px, 1px, 1px, 1px);
    clip-path: inset(50%);
    width: 1px;
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
  }
`;

export default GlobalStyle;
