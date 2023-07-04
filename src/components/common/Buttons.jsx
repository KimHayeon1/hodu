import styled from 'styled-components';

const MButton = styled.button`
  width: 100%;
  padding: 19px;
  font-size: 1.8rem;
  line-height: 22px;
  font-weight: 500;
  border-radius: 5px;
  color: var(--white-color);
  background: var(--brand-color);
`;

const MDisabledButton = styled(MButton)`
  background: var(--gray-300);
`;

const MDarkButton = styled(MButton)`
  background: var(--gray-400);
`;
export { MButton, MDisabledButton, MDarkButton };
