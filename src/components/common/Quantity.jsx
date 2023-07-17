import styled from 'styled-components';

const Quantity = ({ amount, setAmount, handleMinusBtn, handlePlusBtn }) => {
  return (
    <StyledQuantity>
      <label htmlFor='amount-inp' className='a11y-hidden'>
        수량 입력
      </label>
      <input
        id='amount-inp'
        type='number'
        value={amount}
        min={1}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button
        className='minus-btn'
        aria-label='수량 빼기'
        onClick={handleMinusBtn}
      ></button>
      <button
        className='plus-btn'
        aria-label='수량 더하기'
        onClick={handlePlusBtn}
      ></button>
    </StyledQuantity>
  );
};

const StyledQuantity = styled.div`
  width: 150px;
  aspect-ratio: 3/1;
  border: 1px solid var(--gray-200);
  box-sizing: border-box;
  border-radius: 5px;

  input,
  button {
    width: calc(100% / 3);
    height: 100%;
  }

  input {
    box-sizing: border-box;
    border: 1px solid var(--gray-200);
    border-width: 0 1px 0 1px;
    font-size: 1.8rem;
    color: var(--gray-400);
    text-align: center;
  }
  /* 우측 화살표 제거 */
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  button {
    /* z-index: -1; */
    position: relative;
  }
  .minus-btn {
    float: left;
    border-radius: 5px 0 0 5px;
  }
  .plus-btn {
    float: right;
    border-radius: 0 5px 5px 0;
  }

  button::before,
  .plus-btn::after {
    content: '';
    display: block;
    margin: auto;
    background: var(--gray-200);
  }

  button::before {
    content: '';
    width: 20px;
    height: 2px;
  }

  .plus-btn::after {
    position: absolute;
    inset: 0;
    width: 2px;
    height: 20px;
  }
`;

export default Quantity;
export { StyledQuantity };
