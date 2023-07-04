import styled from 'styled-components';
import Logo from '../../assets/images/logo.svg';

const Form = ({ children }) => {
  return (
    <>
      <StyledArticle>
        <h1>
          <img src={Logo} alt='호두 로고' />
        </h1>
        {children}
      </StyledArticle>
    </>
  );
};

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
    background: var(--white-color);
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
    background: var(--white-color);
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
    background: var(--white-color);

    input {
      display: block;
      width: 100%;
      padding: 20px 0;
      font-size: 1.6rem;
      border: 1px solid var(--gray-200);
      border-width: 0 0 1px 0;
    }
    button {
      margin-top: 36px;
    }
  }

  div {
    position: relative;
    text-align: center;

    a {
      color: var(--gray-500);
      font-size: 1.6rem;
    }

    a:first-child {
      position: relative;
      margin-right: 33px;
    }

    a:first-child::after {
      content: '';
      position: absolute;
      top: 3px;
      right: -17px;
      bottom: 0;
      height: 1.6rem;
      width: 1px;
      background: var(--gray-500);
    }
  }
`;

export default Form;
