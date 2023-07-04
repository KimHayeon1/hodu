import styled from 'styled-components';
import TopNav from '../components/common/TopNav/TopNav';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      const url = 'https://openmarket.weniv.co.kr';
      const path = '/products/';
      const res = await fetch(url + path);
      const json = await res.json();
      setData(json.results);
    })();
  }, []);

  console.log(data);
  return (
    <>
      <TopNav></TopNav>
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
