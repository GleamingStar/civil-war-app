import styled from 'styled-components';

const RecordWrapper = styled.div`
  width: 360px;
  @media screen and (min-width: 786px) {
    width: 782px;
  }
  @media screen and (min-width: 1024px) {
    width: 986px;
  }
`;

const Record = () => <RecordWrapper></RecordWrapper>;

export default Record;
