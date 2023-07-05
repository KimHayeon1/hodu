import SellerCenterTopNav from '../components/common/TopNav/SellerCenterTopNav';
import { styled } from 'styled-components';

export default function MakeProduct() {
  return (
    <>
      <SellerCenterTopNav></SellerCenterTopNav>
      <StyledMain>
        <form action=''>
          <label htmlFor=''>상품명</label>
          <input type='file' />
          <label htmlFor=''>판매가</label>
          <input type='text' />
          <label htmlFor=''>배송방법</label>
          <button type='button'>택배,소포,동기</button>
          <button type='button'>직접배송(화물배달)</button>

          <label htmlFor=''>기본 배송비</label>
          <input type='number' />
          <label htmlFor=''>재고</label>
          <input type='number' />
          <label htmlFor=''>상품 상세 정보</label>
          {/* 추후 에디터로 변경 */}
          <input type='text' />

          <button type='button'>취소</button>
          <button>저장하기</button>
        </form>
      </StyledMain>
    </>
  );
}

const StyledMain = styled.main`
  padding-top: 90px;
`;
