import styled from 'styled-components';

const Quantity = ({ quantity, setQuantity }) => {
  return (
    <>
      <label htmlFor='quantity-inp' className='a11y-hidden'>
        수량 입력
      </label>
      <StyledInput
        id='quantity-inp'
        type='number'
        value={quantity}
        min={1}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <StyledButton className='minus-btn'>수량 빼기</StyledButton>
      <StyledButton className='plus-btn'>수량 더하기</StyledButton>
    </>
  );
};

const StyledInput = styled.input`
  border: 1px solid var(--gray-200);

  /* 우측 화살표 제거 */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

const StyledButton = styled.button`
  &.plus-btn,
  &.minus-btn {
    position: relative;
    padding: 23px 14px;
    font-size: 0;
    border: 1px solid var(--gray-200);
  }

  &.minus-btn::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: var(--gray-200);
  }

  &.plus-btn::before {
    content: '';
    display: block;
    width: 20px;
    height: 2px;
    background: var(--gray-200);
  }
  &.plus-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    margin: auto;
    width: 2px;
    height: 20px;
    background: var(--gray-200);
  }
`;
export { StyledInput, StyledButton };
export default Quantity;
