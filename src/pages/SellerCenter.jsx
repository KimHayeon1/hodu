import React, { useEffect, useState } from 'react';
import SellerCenterTopNav from '../components/common/TopNav/SellerCenterTopNav';
import { styled } from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';

export default function SellerCenter() {
  const [data, setdata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      const url = 'https://openmarket.weniv.co.kr';
      const path = '/seller/';
      const token = localStorage.getItem('token');
      const res = await fetch(url + path, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
      const json = await res.json();
      setdata(json.result);
    })();
  }, []);

  return (
    <>
      <SellerCenterTopNav></SellerCenterTopNav>
      <StyledMain>
        <h3>
          대시보드 <span>백엔드글로벌</span>
        </h3>
        {/* a태그는 아닌가 */}
        <MSIconButton onClick={() => navigate('/makeproduct')}>
          상품 업로드
        </MSIconButton>
        <ul>
          <li>판매중인 상품</li>
          <li>주문/배송</li>
          <li>문의/리뷰</li>
          <li>통계</li>
          <li>스토어 설정</li>
        </ul>
        <table>
          <caption className='a11y-hidden'>판매중인 상품 목록</caption>
          <thead>
            <tr>
              <th>상품정보</th>
              <th>판매가격</th>
              <th>수정</th>
              <th>삭제</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((v) => {
                return (
                  <tr>
                    <td>
                      <img src='' alt='' />
                      <h4>딥러닝 개발자 무릎 담요</h4>
                      <span>재고: 370개</span>
                    </td>
                    <td>17,500원</td>
                    <td>
                      <button>수정</button>
                    </td>
                    <td>
                      <button>삭제</button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  padding-top: 90px;
  table {
    width: 100%;
    tr {
      border: 1px solid var(--gray-300);
    }
  }
`;

const MSIconButton = styled.button`
  padding: 11px 20px;
  background: var(--brand-color);
  color: white;
  font-size: 1.8rem;
  font-weight: 500;
  border-radius: 5px;
`;
