import styled from 'styled-components';
import Logo from '../../../assets/images/logo.svg';
import { Link } from 'react-router-dom';
import { StyledHeader } from './BuyerTopNav';

const SellerCenterTopNav = () => {
  return (
    <StyledSellerHeader>
      <div>
        <h1>
          <img src={Logo} alt='호두 로고' />
        </h1>
        <h2>판매자 센터</h2>
      </div>
    </StyledSellerHeader>
  );
};

const StyledSellerHeader = styled(StyledHeader)``;

export default SellerCenterTopNav;
