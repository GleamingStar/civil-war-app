import styled from 'styled-components';
import background from 'client/images/background.png';
import Controller from './Controller';

const SeparatorWrapper = styled.div`
  margin-top: 120px;
  width: 986px;
  height: 581px;
  background-image: url(${background});

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Separator = () => {
  return (
    <SeparatorWrapper>
      <Controller />
    </SeparatorWrapper>
  );
};

export default Separator;
