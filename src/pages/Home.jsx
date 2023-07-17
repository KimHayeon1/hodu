import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import BuyerTopNav from '../components/common/TopNav/BuyerTopNav';
import SellerTopNav from '../components/common/TopNav/SellerTopNav';
import Footer from '../components/common/Footer';

const Home = () => {
  const [data, setData] = useState(null);
  const type = localStorage.getItem('user_type');

  useEffect(() => {
    const url = 'https://openmarket.weniv.co.kr';

    const getAllProductsData = async () => {
      const path = '/products/';
      return await fetch(url + path);
    };

    const getSellerProductsData = async () => {
      const path = '/seller/';
      const token = localStorage.getItem('token');
      return await fetch(url + path, {
        headers: {
          Authorization: `JWT ${token}`,
        },
      });
    };

    (async () => {
      let res;
      if (type === 'SELLER') {
        res = await getSellerProductsData();
      } else {
        res = await getAllProductsData();
      }
      const json = await res.json();
      setData(json.results);
    })();
  }, []);

  return (
    <>
      {type === 'BUYER' ? <BuyerTopNav /> : <SellerTopNav />}
      <StyledMain>
        <article></article>
        <ul>
          <h2 className='a11y-hidden'>상품 목록</h2>
          {data &&
            data.map((v) => {
              return (
                <li key={v.product_id}>
                  <img src={v.image} alt='' />
                  <div className='store'>{v.store_name}</div>
                  <strong>{v.product_name}</strong>
                  <div className='price'>
                    <span>{v.price}</span>원
                  </div>
                  <Link to={`/products/${v.product_id}/`}></Link>
                </li>
              );
            })}
        </ul>
      </StyledMain>
      <Footer></Footer>
    </>
  );
};

const StyledMain = styled.main`
  padding-top: 90px;
  article {
    height: 500px;
    background: var(--gray-100);
  }

  ul {
    max-width: 1280px;
    margin: 80px auto 180px;
    padding: 0px 52px;
    display: grid;
    gap: 70px;
    grid-template-columns: repeat(3, 1fr);

    li {
      position: relative;
    }
    a {
      position: absolute;
      inset: 0;
    }
    img {
      object-fit: cover;
      box-sizing: border-box;
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      border: 1px solid var(--gray-300);
    }

    .store {
      font-size: 1.6rem;
      line-height: 2.2rem;
      color: var(--gray-400);
      margin: 16px 0 10px;
    }

    strong {
      font-size: 1.8rem;
      line-height: 2.2rem;
    }

    .price {
      margin-top: 10px;
      font-size: 1.6rem;
      span {
        font-size: 2.4rem;
        font-weight: 700;
      }
    }
  }
`;
export default Home;
