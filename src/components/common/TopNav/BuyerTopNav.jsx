import styled from 'styled-components';
import { Link } from 'react-router-dom';

import logo from '../../../assets/icons/logo.svg';
import cart from '../../../assets/icons/cart.svg';
import user from '../../../assets/icons/user.svg';
import search from '../../../assets/icons/search.svg';

const BuyerTopNav = () => {
  return (
    <StyledHeader>
      <div>
        <h1>
          <Link to='/'>
            <img src={logo} alt='호두 로고' />
          </Link>
        </h1>

        <form>
          <label className='a11y-hidden' htmlFor='keword-inp'>
            통합 검색어 입력
          </label>
          <input
            id='keword-inp'
            type='text'
            placeholder='상품을 검색해보세요!'
          />
          <button aria-label='검색하기'>
            <img src={search} alt='' />
          </button>
        </form>

        <Link id='cart' to='/cart'>
          <img src={cart} alt='' />
          장바구니
        </Link>
        <Link>
          <img src={user} alt='' />
          마이페이지
        </Link>
      </div>
    </StyledHeader>
  );
};

const StyledHeader = styled.header`
  position: fixed;
  width: 100%;
  box-shadow: 0 4px 5px #00000010;
  background: white;

  div {
    max-width: 1280px;
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
    position: relative;
    display: flex;
    input {
      box-sizing: border-box;
      width: 400px;
      padding: 11px 50px 11px 22px;
      font-size: 1.6rem;
      line-height: 2rem;
      border: 2px solid var(--brand-color);
      border-radius: 46px;
    }
    input::placeholder {
      color: var(--gray-400);
    }
    button {
      position: absolute;
      width: 28px;
      top: 0;
      bottom: 0;
      right: 23px;
      margin: auto 0;
    }
  }

  div > a {
    color: var(--gray-400);
    font-size: 1.2rem;

    img {
      margin: 0 auto 4px;
      width: 32px;
    }

    &#cart img {
      margin-left: 2px;
    }

    &:not(:last-child) {
      margin-left: auto;
    }

    &:last-child {
      margin-left: 38px;
    }
  }
`;

export { StyledHeader };
export default BuyerTopNav;
