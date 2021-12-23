import { sortedRecordSelector, sorterIndexAtom } from 'client/config/atom';
import { VscArrowDown, VscArrowUp } from 'react-icons/vsc';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

const RecordWrapper = styled.div`
  width: 360px;
  @media screen and (min-width: 786px) {
    width: 782px;
  }
  @media screen and (min-width: 1024px) {
    width: 986px;
  }
  color: white;
  td,
  th {
    padding: 10px;
    word-break: keep-all;
    @media screen and (max-width: 785px) {
      white-space: nowrap;
      max-width: 102px;
      overflow: hidden;
    }
  }
  th:nth-child(2) {
    min-width: 84px;
  }
  th:nth-child(n + 3):nth-child(-n + 4) {
    min-width: 52px;
  }
  th:nth-child(5) {
    min-width: 68px;
  }
`;

const PlayerWrapper = styled.tr``;

const Record = () => {
  const record = useRecoilValue(sortedRecordSelector);
  const [sorterIndex, setSorterIndex] = useRecoilState(sorterIndexAtom);

  const head = ['아이디', '레이팅', ' 승', '패', '승률'];

  return (
    <RecordWrapper>
      <table>
        <thead>
          <tr>
            {head.map((v, i) => (
              <th key={v} onClick={() => setSorterIndex((index) => (index === 2 * i ? 2 * i + 1 : 2 * i))}>
                {v}
                {sorterIndex === 2 * i && <VscArrowDown />}
                {sorterIndex === 2 * i + 1 && <VscArrowUp />}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {record.map((info) => (
            <Player key={info.id} {...info} />
          ))}
        </tbody>
      </table>
    </RecordWrapper>
  );
};

const Player = ({ userId, rating, win, lose }) => (
  <PlayerWrapper>
    <td>{userId}</td>
    <td>{rating}</td>
    <td>{win}</td>
    <td>{lose}</td>
    <td>{((win * 100) / (win + lose)).toFixed(0)}%</td>
  </PlayerWrapper>
);

export default Record;
