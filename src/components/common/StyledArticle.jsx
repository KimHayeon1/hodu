import styled from 'styled-components';

const StyledArticle = styled.article`
  max-width: 550px;
  margin: 70px auto 110px;

  h1 {
    margin: 0px auto 70px;
    width: 238px;
  }

  & > button {
    position: relative;
    z-index: 1;
    background: white;
    width: 50%;
    padding: 20px 0;
    font-weight: 500;
    font-size: 1.8rem;
    line-height: 2.2rem;
    border: 1px solid var(--gray-200);
    border-width: 1px 1px 0;
    border-radius: 10px 10px 0 0;
  }
  & > button.disabled {
    z-index: 0;
    background: var(--gray-100);
  }

  & > button::after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    right: 0;
    left: -1px;
    bottom: -10px;
    border: 1px solid var(--gray-200);
    border-width: 0 0 0 1px;
    background: white;
    border-radius: 10px 10px 0 0;
  }
  & > button.right::after {
    border-width: 0 1px 0 0;
    left: 0;
    right: -1px;
  }
  & > button.disabled::after {
    background: var(--gray-100);
  }

  form {
    position: relative;
    margin: 0 0 30px;
    box-sizing: border-box;
    width: 100%;
    padding: 34px 35px 36px;
    border: 1px solid var(--gray-200);
    border-radius: 10px;
    background: white;

    input {
      display: block;
      width: 100%;
      padding: 20px 0; // login만 사용하는 속성
      font-size: 1.6rem;
      border: 1px solid var(--gray-200);
      border-width: 0 0 1px 0; // login만 사용하는 속성
    }
    button {
      margin-top: 36px; // login만 사용하는 속성
    }
  }
`;

export { StyledArticle };
