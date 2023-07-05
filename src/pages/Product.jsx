import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

import BuyerTopNav from '../components/common/TopNav/BuyerTopNav';
import Quantity from '../components/common/Quantity';
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
        'Content-type': 'application/json',
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
      <BuyerTopNav></BuyerTopNav>
      <StyledMain>
        <div>
          <span>{data && data.store_name}</span>
          <h2>{data && data.product_name}</h2>
          <span>{data && data.price}</span>
          <span>택배배송 / 무료배송</span>
          <Quantity quantity={quantity} setQuantity={setQuantity}></Quantity>

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
  }

  section {
    width: 100%;
  }
`;
export default Home;
