import { useState } from 'react';
import Form from '../../components/common/Form';
import { MButton, MDisabledButton } from '../../components/common/Buttons';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

const Login = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('buyer');
  const [vaild, setVaild] = useState(true); //임시

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
    try {
      const data = await getData();
      console.log(data);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user_type', data.user_type);
        navigate('/');
      } else if (data.FAIL_Message) {
        alert(data.FAIL_Message);
      } else {
        const message = Object.values(data).join('');
        alert(message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  console.log(type);
  return (
    <Form>
      <h2 className='a11y-hidden'>로그인</h2>

      <button
        className={type !== 'buyer' ? 'disabled' : null}
        onClick={() => {
          setType('buyer');
        }}
      >
        구매회원 로그인
      </button>
      <button
        className={type !== 'seller' ? 'disabled right' : 'right'}
        onClick={() => {
          setType('seller');
        }}
      >
        판매회원 로그인
      </button>

      <form onSubmit={handleForm}>
        <fieldset>
          <legend className='a11y-hidden'>
            {type === 'buyer' ? '구매회원 로그인' : '판매회원 로그인'}
          </legend>
          <label htmlFor='id-inp' className='a11y-hidden'>
            아이디 입력
          </label>
          <input
            id='id-inp'
            type='text'
            placeholder='아이디'
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
          <label htmlFor='password-inp' className='a11y-hidden'>
            비밀번호 입력
          </label>
          <input
            id='password-inp'
            type='text'
            placeholder='비밀번호'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {vaild ? (
            <MButton>로그인</MButton>
          ) : (
            <MDisabledButton>로그인</MDisabledButton>
          )}
        </fieldset>
      </form>

      <div>
        <Link>회원가입</Link>
        <Link>비밀번호 찾기</Link>
      </div>
    </Form>
  );
};

export default Login;
