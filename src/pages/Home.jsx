import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import Banner1 from '../assets/images/banner1.png';
import Banner2 from '../assets/images/banner2.png';
import Banner3 from '../assets/images/banner3.png';
import BuyerTopNav from '../components/common/TopNav/BuyerTopNav';
import Footer from '../components/common/Footer';

const Home = () => {
  const [data, setData] = useState(null);
  const [autoSlide, setAutoSlide] = useState(true);
  const banners = useRef(null);
  const [currBanner, setCurrBanner] = useState(0);

  useEffect(() => {
    (async () => {
      const url = 'https://openmarket.weniv.co.kr';
      const path = '/products/';
      const res = await fetch(url + path);
      const json = await res.json();
      setData(json.results);
    })();
  }, []);

  const bannerData = [
    {
      img: Banner1,
      textList: [
        '사람과 환경을 위한 지속 가능한 포장재 호두 그린 박스',
        '호두 직배송 상품 구경하러 가기',
      ],
    },
    {
      img: Banner2,
      textList: [
        '친구 초대하면 친구도 나도 1만원씩!',
        '초대할 때마다 제한 없이 1만원 쿠폰 발급!',
        '2023년 7월 20일부터 2023년 8월 20일까지',
      ],
    },
    {
      img: Banner3,
      textList: [
        '한 눈에 보는 8월 호두 혜택 모음!',
        '최대 20% 할인 쿠폰!',
        '2023년 8월 1일부터 2023년 8월 21일까지',
      ],
    },
  ];

  const hideBanner = (currIndex) => {
    setCurrBanner(currIndex);
    [...banners.current.children].forEach((v, i) => {
      if (i === currIndex) {
        v.setAttribute('aria-hidden', 'false');
        v.firstElementChild.removeAttribute('tabIndex');
      } else {
        v.setAttribute('aria-hidden', 'true');
        v.firstElementChild.setAttribute('tabIndex', '-1');
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
      hideBanner(currIndex);
    }
  };

  const handleNextBtn = (e) => {
    e.preventDefault();
    const bannersTransform = banners.current.style.transform;

    if (bannersTransform === '' && bannerData.length !== 1) {
      banners.current.style.transform = 'translateX(-100%)';
      hideBanner(1);
      return;
    }

    const bannersX = parseInt(bannersTransform.replace(/[^\d-]/g, ''));
    const currBannerIndex = bannersX / -100 + 1;

    if (currBannerIndex < bannerData.length) {
      banners.current.style.transform = `translateX(${bannersX - 100}%)`;
      hideBanner(currBannerIndex);
    }
  };

  const onLive = () => {
    banners.current.setAttribute('aria-live', 'assertive');
  };

  const offLive = () => {
    banners.current.setAttribute('aria-live', 'off');
  };

  const rotateSlide = () => {
    return setInterval(() => {
      const bannersTransform = banners.current.style.transform;

      if (bannersTransform === '') {
        banners.current.style.transform = 'translateX(-100%)';
        hideBanner(1);
        return;
      }

      const bannersX = parseInt(bannersTransform.replace(/[^\d-]/g, ''));
      const currBannerIndex = bannersX / -100 + 1;
      if (currBannerIndex < bannerData.length) {
        banners.current.style.transform = `translateX(${bannersX - 100}%)`;
        hideBanner(currBannerIndex);
      } else {
        banners.current.style.transform = '';
        hideBanner(0);
      }
    }, 2000);
  };

  useEffect(() => {
    let interval;
    if (autoSlide) {
      offLive();
      interval = rotateSlide();
    } else {
      onLive();
    }
    return () => clearInterval(interval);
  }, [autoSlide]);

  return (
    <>
      <BuyerTopNav />
      <StyledMain>
        <section
          onFocus={() => setAutoSlide(false)}
          onBlur={() => setAutoSlide(true)}
          onMouseOver={() => setAutoSlide(false)}
          onMouseOut={() => setAutoSlide(true)}
          className='banner-frame'
          // 암시적으로 role='region'
          aria-roledescription='carousel'
          aria-label='배너 슬라이드'
        >
          <h2 className='a11y-hidden'>메인 배너</h2>
          <ul id='banners' ref={banners} aria-live='off'>
            {bannerData &&
              bannerData.map((v, i) => (
                <li
                  role='group'
                  aria-roledescription='slide'
                  aria-label={`${bannerData.length}개 중 ${i + 1}번`}
                  aria-hidden={currBanner !== i}
                >
                  <a href='#none' tabIndex={currBanner !== i ? '-1' : '0'}>
                    <img src={v.img} alt='' />
                    <p className='a11y-hidden'>
                      {v.textList.map((text, i) => {
                        if (!i) {
                          return text;
                        } else {
                          return (
                            <>
                              <br />
                              {text}
                            </>
                          );
                        }
                      })}
                    </p>
                  </a>
                </li>
              ))}
          </ul>
          {bannerData && (
            <>
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
            </>
          )}

          {/* 시각적 역할만 하므로 aria-hidden 처리 */}
          {bannerData && (
            <ol className='indicators' aria-hidden='true'>
              {bannerData.map((_, i) => (
                <li className={currBanner === i ? 'curr' : ''}></li>
              ))}
            </ol>
          )}
        </section>

        <section>
          <h2 className='a11y-hidden'>상품 목록</h2>
          <ul className='product-list'>
            {data &&
              data.map((v) => {
                return (
                  <li key={v.product_id}>
                    <Link to={`/products/${v.product_id}/`}>
                      <img src={v.image} alt='' />
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
        </section>
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
    }
    button::before,
    button::after {
      content: '';
      position: absolute;
      width: 2px;
      height: 14px;
      border-radius: 2px;
      background: black;
    }
    #next-btn::after {
      transform: rotate(45deg);
      bottom: 14px;
    }
    #next-btn::before {
      transform: rotate(-45deg);
      top: 13px;
    }
    #prev-btn::after {
      transform: rotate(45deg);
      top: 13px;
    }
    #prev-btn::before {
      transform: rotate(-45deg);
      bottom: 14px;
    }

    #prev-btn {
      left: 38px;
    }
    #next-btn {
      right: 38px;
    }
  }
  #banners {
    height: 500px;
    display: flex;
    li {
      a:focus {
        outline-offset: 2px;
      }
      flex-shrink: 0;
      width: 100%;
      img {
        height: 100%;
        object-fit: cover;
        object-position: 24% top; // 임시
      }
    }
  }
  .indicators {
    position: absolute;
    left: 50%;
    bottom: 20px;
    font-size: 0;
    li {
      display: inline-block;
      width: 6px;
      height: 6px;
      background: white;
      border-radius: 50%;
    }
    li.curr {
      background: black;
    }
    li:not(:first-child) {
      margin-left: 6px;
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
      width: 100%;
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
