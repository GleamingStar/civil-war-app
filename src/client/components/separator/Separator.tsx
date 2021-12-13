import styled from 'styled-components';
import Controller from './Controller';
import Result from './Result';

const SeparatorWrapper = styled.div`
  position: relative;
  margin-top: 120px;
  width: 986px;
  height: 581px;
  background-image: url('assets/background.png');

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Separator = () => (
  <SeparatorWrapper>
    <Controller />
    <Result />
  </SeparatorWrapper>
);

export default Separator;
