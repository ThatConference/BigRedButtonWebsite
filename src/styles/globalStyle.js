import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Roboto', sans-serif;
    width: 100%;
    height: 100%;
    font-size: 10px;
    color: ${({ theme }) => theme.colors.fonts.light};
  }

  body {
    padding: 0;
    margin: 0;
    background-color: ${({ theme }) => theme.colors.primary};
    height 100%;
  }

  h2 {
    font-size: 3.2rem;
    font-weight: 600;
    margin-bottom: 2rem;
    text-align: center;
  }

  p {
    font-size: 1.6rem;
  }

  table {
    font-size: 1.4rem;
    width: 100%;
    border-collapse: collapse;

    th {
      text-transform: uppercase;
    }

    tbody tr:nth-child(odd) {
      background-color: ${({ theme }) => theme.colors.gray};
    }

    th, td {
      text-align: center;
      padding: 0.7rem;
    }

    tr {
      height: 3.8rem;
    }
  }
`;

export default GlobalStyle;
