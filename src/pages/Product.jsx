import styled from 'styled-components';
import TopNav from '../components/common/TopNav/TopNav';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import { MButton, MDarkButton } from '../components/common/Buttons';

const Home = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    (async () => {
      const url = 'https://openmarket.weniv.co.kr';
      const path = `/products/${id}/`;
      const res = await fetch(url + path);
      const json = await res.json();
      setData(json);
    })();
  }, []);

  const postData = async () => {
    const url = 'https://openmarket.weniv.co.kr';
    const path = '/cart/';
    const token = localStorage.getItem('token');
    const cartData = {
      product_id: parseInt(id),
      quantity: quantity,
      check: false, // 임시. 장바구니에 해당 제품이 있는지
    };
    console.log(JSON.stringify(cartData));
    const res = await fetch(url + path, {
      method: 'POST',
      headers: {
        Authorization: `JWT ${token}`,
      },
      body: JSON.stringify(cartData),
    });
    return await res.json();
  };
  const handleCardBtn = async (e) => {
    e.preventDefault();
    try {
      const data = await postData();
      console.log(data);
      navigate('/cart');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TopNav></TopNav>
      <StyledMain>
        <div>
          <span>{data && data.store_name}</span>
          <h2>{data && data.product_name}</h2>
          <span>{data && data.price}</span>
          <span>택배배송 / 무료배송</span>
          <label htmlFor='quantity-inp' className='a11y-hidden'>
            수량 입력
          </label>
          <input
            id='quantity-inp'
            type='number'
            value={quantity}
            min={1}
            onChange={(e) => setQuantity(e.target.value)}
          />
          <button className='minus-btn'>수량 빼기</button>
          <button className='plus-btn'>수량 더하기</button>

          <div>
            총 상품 금액<span>총 수량{}개</span>
            <span>{}원</span>
          </div>
          <MButton>바로 구매</MButton>
          <MDarkButton type='submit' onClick={handleCardBtn}>
            장바구니
          </MDarkButton>
        </div>
        <img src={data && data.image} alt='' />
        <section>
          <button>상세</button>
          <button>리뷰</button>
          <button>Q&A</button>
          <button>반품/교환정보</button>
        </section>
      </StyledMain>
    </>
  );
};

const StyledMain = styled.main`
  width: min(1280px, 100%);
  box-sizing: border-box;
  padding: 90px 52px 0;
  margin: auto;

  display: flex;
  flex-direction: row-reverse;
  flex-wrap: wrap;
  img {
    width: 50%;
  }
  & > div {
    width: 50%;

    input {
      border: 1px solid var(--gray-200);
    }

    /* 우측 화살표 제거 */
    input[type='number']::-webkit-outer-spin-button,
    input[type='number']::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  .plus-btn,
  .minus-btn {
    position: relative;
    padding: 23px 14px;
    font-size: 0;
    border: 1px solid var(--gray-200);
  }

  .minus-btn::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: var(--gray-200);
  }

  .plus-btn::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: var(--gray-200);
  }
  .plus-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 2px;
    height: 20px;
    background: var(--gray-200);
  }

  section {
    width: 100%;
  }
`;
export default Home;
