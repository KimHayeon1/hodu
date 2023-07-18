import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import BuyerTopNav from '../components/common/TopNav/BuyerTopNav';
import SellerTopNav from '../components/common/TopNav/SellerTopNav';
import Footer from '../components/common/Footer';

const Home = () => {
  const [data, setData] = useState(null);
  const type = localStorage.getItem('user_type');
  const banners = useRef(null);

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

  const setHidden = (currIndex) => {
    [...banners.current.children].forEach((v, i) => {
      if (i === currIndex) {
        v.classList.remove('hidden');
      } else {
        v.classList.add('hidden');
      }
    });
  };

  const handlePrevBtn = (e) => {
    e.preventDefault();
    const bannersTransform = banners.current.style.transform;
    if (bannersTransform !== '' && bannersTransform !== 'translateX(0%)') {
      const bannersX = parseInt(bannersTransform.replace(/[^\d-]/g, ''));
      banners.current.style.transform = `translateX(${bannersX + 100}%)`;

      const currIndex = bannersX / -100 - 1;
      setHidden(currIndex);
    }
  };
  const handleNextBtn = (e) => {
    e.preventDefault();
    const bannersTransform = banners.current.style.transform;
    const bannersNum = banners.current.children.length;

    if (bannersTransform === '' && bannersNum !== 1) {
      banners.current.style.transform = 'translateX(-100%)';

      setHidden(1);
    } else {
      const bannersX = parseInt(bannersTransform.replace(/[^\d-]/g, ''));
      const currBanner = bannersX / -100 + 1;
      if (currBanner === bannersNum) {
        return;
      }
      banners.current.style.transform = `translateX(${bannersX - 100}%)`;

      setHidden(currBanner);
    }
  };
  return (
    <>
      {type === 'BUYER' ? <BuyerTopNav /> : <SellerTopNav />}
      <StyledMain>
        <section
          className='banner-frame'
          // 암시적으로 role='region'
          aria-roledescription='carousel' // 스크린리더가 캐러셀로 식별
          aria-label='배너 슬라이드'
        >
          <ul id='banners' ref={banners} aria-live='off'>
            <li role='group' aria-roledescription='slide'>
              <a href='#none'>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Voluptates aliquid dolore fugiat recusandae, minus aliquam
                nesciunt possimus eveniet iusto perferendis cum et nobis ipsum,
                numquam animi earum veniam excepturi dolor.
              </a>
            </li>
            <li role='group' aria-roledescription='slide' className='hidden'>
              <a href='#none'>b</a>
            </li>
            <li role='group' aria-roledescription='slide' className='hidden'>
              <a href='#none'>c</a>
            </li>
          </ul>

          <button
            aria-label='이전 슬라이드 보기'
            aria-controls='banners'
            id='prev-btn'
            onClick={handlePrevBtn}
          ></button>
          <button
            aria-label='다음 슬라이드 보기'
            aria-controls='banners'
            id='next-btn'
            onClick={handleNextBtn}
          ></button>
        </section>

        <ul className='product-list'>
          <h2 className='a11y-hidden'>상품 목록</h2>
          {data &&
            data.map((v) => {
              return (
                <li key={v.product_id}>
                  <Link to={`/products/${v.product_id}/`}>
                    <img src={v.image} alt='' />
                    {/* 왜 inline 요소로 바꾸거나, role='text' 안 해도 초점 안 분리되지 */}
                    <div className='store'>{v.store_name}</div>
                    <strong>{v.product_name}</strong>
                    <div className='price'>
                      <span>{v.price}</span>원
                    </div>
                  </Link>
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

  /* 배너 캐러셀 테스트 */
  .banner-frame {
    overflow-x: hidden;
    position: relative;

    button {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);

      width: 50px;
      height: 50px;
      background: white;
    }
    #prev-btn {
    }
    #next-btn {
      right: 0;
    }
  }
  #banners {
    height: 500px;
    display: flex;
    /* transform: translateX(-100%); */
    .hidden {
      visibility: hidden;
    }
    li {
      flex-shrink: 0;
      width: 100%;
      background: var(--gray-100);
    }
    li:nth-child(2) {
      background: var(--gray-200);
    }
    li:nth-child(3) {
      background: var(--gray-300);
    }
  }

  .product-list {
    max-width: 1280px;
    margin: 80px auto 180px;
    padding: 0px 52px;
    display: grid;
    gap: 70px;
    grid-template-columns: repeat(3, 1fr);

    li {
    }
    a {
      display: inline-block;
    }
    a:focus {
      outline: 2px solid black;
      border-radius: 5px;
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
