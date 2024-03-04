import { useRef, useState } from 'react';
import FormArticle, { StyledArticle } from '../components/common/StyledArticle';
import { MButton, MDisabledButton } from '../components/common/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import Logo from '../assets/icons/logo.svg';

const Join = () => {
  const navigate = useNavigate();
  const [vaild, setVaild] = useState(false);
  const [type, setType] = useState('buyer');
  const [id, setId] = useState(''); // (e.target[0].value);
  const [password, setPassword] = useState(''); // (e.target[1].value);

  const getData = async () => {
    const url = 'https://openmarket.weniv.co.kr';
    const path = '/accounts/login/';
    const loginData = {
      username: id,
      password: password,
      login_type: type === 'buyer' ? 'BUYER' : 'SELLER',
    };
    const res = await fetch(url + path, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(loginData),
    });
    return await res.json();
  };

  const handleForm = async (e) => {
    e.preventDefault();
    if (!id) {
      errorEl.current.textContent = '아이디를 입력해 주세요.';
      return;
    }
    if (!password) {
      errorEl.current.textContent = '비밀번호를 입력해 주세요.';
      return;
    }
    try {
      const data = await getData();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_type', data.user_type);
        navigate('/');
      } else if (data.FAIL_Message) {
        errorEl.current.textContent =
          '아이디 또는 비밀번호가 일치하지 않습니다.';
      }
    } catch (error) {
      console.error(error);
    }
  };
  const errorEl = useRef();
  return (
    <>
      <ExtensionFormArticle>
        <h1>
          <img src={Logo} alt='호두 로고' />
        </h1>
        {/* 고민중 */}
        <h2 className='a11y-hidden'>
          {type === 'buyer' ? '구매회원가입' : '판매회원가입'}
        </h2>

        {/* 버튼 말고 radio는? */}
        <button
          className={type !== 'buyer' ? 'disabled' : null}
          onClick={() => {
            setType('buyer');
          }}
        >
          구매회원가입
        </button>
        <button
          className={type !== 'seller' ? 'disabled right' : 'right'}
          onClick={() => {
            setType('seller');
          }}
        >
          판매회원가입
        </button>

        <form onSubmit={handleForm}>
          <fieldset>
            <legend className='a11y-hidden'>계정 정보 입력</legend>
            <label htmlFor='id-inp'>
              아이디
              <input
                id='id-inp'
                type='text'
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </label>
            <label htmlFor='password-inp'>
              비밀번호
              <input
                id='password-inp'
                type='text'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <label htmlFor='password-check-inp'>
              비밀번호
              <input
                id='password-check-inp'
                type='text'
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <strong ref={errorEl} role='alert'></strong>
          </fieldset>
          <fieldset>
            <legend className='a11y-hidden'>개인 정보 입력</legend>
            <label htmlFor='name-inp'>
              이름
              <input
                id='name-inp'
                type='text'
                // value={id}
                // onChange={(e) => setId(e.target.value)}
              />
            </label>
            <label htmlFor='phone-inp'>
              휴대폰번호
              <input
                id='phone-inp'
                type='text'
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <strong ref={errorEl} role='alert'></strong>
          </fieldset>
          <fieldset className='outside'>
            <legend className='a11y-hidden'>가입하기</legend> {/* 임시 */}
            <div>
              <span className='checkbox' role='checkbox'></span>
              <label>
                {/* <input type='checkbox' /> */}
                호두샵의 <span>이용약관</span> 및 <span>개인정보처리방침</span>
                에 대한 내용을 확인하였고 동의합니다.
              </label>
            </div>
            {vaild ? (
              <MButton>가입하기</MButton>
            ) : (
              <MDisabledButton>가입하기</MDisabledButton>
            )}
          </fieldset>
        </form>
      </ExtensionFormArticle>
    </>
  );
};

export default Join;

const ExtensionFormArticle = styled(StyledArticle)`
  position: relative;
  form {
    fieldset + fieldset {
      margin-top: 50px; // 가변값
    }

    label {
      display: block;
      font-size: 1.6rem;
      color: var(--gray-400);
    }
    label + label {
      margin-top: 12px;
    }

    input {
      margin-top: 10px;
      padding: 17px 16px; //
      border-width: 1px 1px 1px 1px; //
      box-sizing: border-box;
      border-radius: 5px;
    }

    .outside {
      padding: 34px 35px 36px;
      position: absolute;
      left: 0;
      right: 0;
      div {
        display: flex;
      }
      .checkbox {
        content: '';
        margin-right: 10px;
        display: inline-block;
        box-sizing: border-box;
        width: 16px;
        flex-shrink: 0;
        height: 16px;
        border: 1px solid #707070;
      }

      button {
        margin-top: 34px; //
      }
    }
  }
`;
