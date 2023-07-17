import styled from 'styled-components';

const MButton = styled.button`
  width: 100%;
  padding: 19px;
  font-size: 1.8rem;
  line-height: 22px;
  font-weight: 500;
  border-radius: 5px;
  color: white;
  background: var(--brand-color);
`;

const MDisabledButton = styled(MButton)`
  background: var(--gray-300);
`;

const MDarkButton = styled(MButton)`
  background: var(--gray-400);
`;

const MWhiteButton = styled(MButton)`
  padding: 18px;
  color: var(--gray-400);
  background: white;
  border: 1px solid var(--gray-300);
`;

export { MButton, MDisabledButton, MDarkButton, MWhiteButton };
