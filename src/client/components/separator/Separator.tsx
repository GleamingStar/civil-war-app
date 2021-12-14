import styled from 'styled-components';
import Controller from './Controller';
import Result from './Result';

const SeparatorWrapper = styled.div`
  position: relative;
  width: 360px;
  height: 581px;
  background-image: url('assets/background_mobile.png');
  @media screen and (min-width: 786px) {
    width: 782px;
    background-image: url('assets/background_tablet.png');
  }
  @media screen and (min-width: 1024px) {
    width: 986px;
    background-image: url('assets/background_desktop.png');
  }
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
