import styled from 'styled-components';

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  box-shadow: 0 4px 5px #00000010;
  background: var(--white-color);

  div {
    width: min(1280px, 100%);
    margin: auto;
    padding: 22px 52px; // 52 임의
    display: flex;
    align-items: center;
  }

  h1 {
    width: 124px;
    margin-right: 30px;
  }

  form {
    input {
      width: 400px;
      padding: 11px 22px;
      font-size: 1.6rem;
      line-height: 2rem;
      border: 2px solid var(--brand-color);
      border-radius: 46px;
    }
    input::placeholder {
      color: var(--gray-400);
    }
  }

  a:not(:last-child) {
    margin-left: auto;
  }
  a:last-child {
    margin-left: 38px;
  }
`;

export { StyledHeader };
