import styled from 'styled-components';
import background from 'client/images/background.png';

const SeparatorWrapper = styled.div`
  margin-top: 120px;
  width: 986px;
  height: 581px;
  background-image: url(${background});
`;

const Separator = () => {
  return <SeparatorWrapper></SeparatorWrapper>;
};

export default Separator;
