import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Logo from '../../../assets/images/logo.svg';
import { StyledHeader } from './BuyerTopNav';

const SellerTopNav = () => {
  return (
    <StyledSellerHeader>
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
        <Link>마이페이지</Link>
        <Link to='/sellercenter'>판매자 센터</Link>
      </div>
    </StyledSellerHeader>
  );
};

const StyledSellerHeader = styled(StyledHeader)``;

export default SellerTopNav;
