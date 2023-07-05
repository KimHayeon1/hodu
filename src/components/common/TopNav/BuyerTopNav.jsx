import styled from 'styled-components';
import Logo from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';

const BuyerTopNav = () => {
  return (
    <StyledHeader>
      <div>
        <h1>
          <img src={Logo} alt='호두 로고' />
        </h1>
        <form action=''>
          <fieldset>
            <legend className='a11y-hidden'>통합 검색</legend>
            <label className='a11y-hidden' htmlFor='keword-inp'>
              검색어 입력
            </label>
            <input
              id='keword-inp'
              type='text'
              placeholder='상품을 검색해보세요!'
            />
            <button>검색하기</button>
          </fieldset>
        </form>
        <Link>장바구니</Link>
        <Link>마이페이지</Link>
      </div>
    </StyledHeader>
  );
};

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
export default BuyerTopNav;
