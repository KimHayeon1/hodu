import styled from 'styled-components';
import { Link } from 'react-router-dom';

const TopNav = () => {
  const linkList = [
    '호두샵 소개',
    '이용약관',
    '개인정보처리방침',
    '전자금융거래약관',
    '청소년보호정책',
    '제휴문의',
  ];
  return (
    <StyledFooter>
      <div>
        <ul>
          {linkList.map((v) => (
            <li>
              <Link>{v}</Link>
            </li>
          ))}
        </ul>
        <p>
          (주)HODU SHOP
          <br />
          제주특별자치도 제주시 동광고 137 제주코딩베이스캠프
          <br />
          사업자 번호 : 000-0000-0000 | 통신판매업
          <br />
          대표 : 김호두
        </p>
      </div>
    </StyledFooter>
  );
};

const StyledFooter = styled.footer`
  background: var(--gray-100);

  div {
    max-width: 1280px;
    padding: 60px 52px 63px; // 52 임의
    margin: auto;

    ul {
      display: flex;
      gap: 32px;
      flex-wrap: wrap;
      margin-bottom: 30px;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 1px;
        background: var(--gray-300);
      }

      li {
        position: relative;
      }

      li:not(:first-child)::before {
        content: '';
        position: absolute;
        left: -16px;
        width: 1px;
        height: 1.4rem;
        background: black;
      }

      a {
        font-size: 1.4rem;
        line-height: 1.8rem;
      }
    }

    p {
      font-size: 1.4rem;
      line-height: 2.4rem;
      color: var(--gray-400);
    }
  }
`;
export default TopNav;
