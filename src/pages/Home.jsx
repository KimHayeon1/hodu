import styled from 'styled-components';
import BuyerTopNav from '../components/common/TopNav/BuyerTopNav';
import SellerTopNav from '../components/common/TopNav/SellerTopNav';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
        console.log('a');
      } else {
        res = await getAllProductsData();
        console.log('b');
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
          <h3 className='a11y-hidden'>상품 목록</h3>
          {data &&
            data.map((v) => {
              return (
                <li key={v.product_id}>
                  <Link to={`/products/${v.product_id}/`}>
                    <img src={v.image} alt='' />
                    <span>{v.store_name}</span>
                    <h4>{v.product_name}</h4>
                    <span>{v.price}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </StyledMain>
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

    img {
      object-fit: cover;
      aspect-ratio: 1 / 1;
      border-radius: 10px;
      border: 1px solid var(--gray-300);
    }
  }
`;
export default Home;
