import styled from 'styled-components';
import { VscGithub } from 'react-icons/vsc';
import { useSetRecoilState } from 'recoil';
import { filterIndexAtom, locationFilter } from 'client/config/atom';
import { Link } from 'toy-react-router';

const HeaderWrapper = styled.div`
  width: 360px;
  height: 60px;
  @media screen and (min-width: 786px) {
    width: 782px;
  }
  @media screen and (min-width: 1024px) {
    margin-left: 26px;
    width: 939px;
  }
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const MenuWrapper = styled.div`
  width: 35%;
  @media screen and (min-width: 786px) {
    width: 20%;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const LocationWrapper = styled.select``;

const Header = () => (
  <HeaderWrapper>
    <MenuWrapper>
      <Link to="/">메인</Link>
      <Link to="/record">전적</Link>
    </MenuWrapper>
    <MenuWrapper>
      <LocationSelect />
      <VscGithub size={24} onClick={() => (location.href = 'https://github.com/GleamingStar/civil-war-app')} />
    </MenuWrapper>
  </HeaderWrapper>
);

const LocationSelect = () => {
  const setFilterIndex = useSetRecoilState(filterIndexAtom);

  return (
    <LocationWrapper onChange={({ target }) => setFilterIndex(+target.value)}>
      {locationFilter.map(({ id, name }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </LocationWrapper>
  );
};

export default Header;
