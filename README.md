# civil-war-app
#### 롤 내전 팀 분배 어플리케이션
## [AWS EC2 배포 링크](http://3.35.175.92/)
![image](https://user-images.githubusercontent.com/70461368/147173057-468ae7d4-d62a-4134-bb0f-142984fab18d.png)
![image](https://user-images.githubusercontent.com/70461368/147173467-5d44f8b6-76dd-4da8-8382-7da6b679e362.png)


### 기술스택
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/> <img src="https://img.shields.io/badge/styled--components-DB7093?style=flat-square&logo=styled-components&logoColor=white"/> <img src="https://img.shields.io/badge/express-000000?style=flat-square&logo=express&logoColor=white" /> <img src="https://img.shields.io/badge/MySQL-4479A1?style=flat-square&logo=mysql&logoColor=white" />
<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white" /> <img src="https://img.shields.io/badge/Babel-F9DC3E?style=flat-square&logo=Babel&logoColor=white" />

#### 코드스쿼드 FE 6주차 자유과제를 리뉴얼한 프로젝트입니다
- [이전 저장소](https://github.com/GleamingStar/fe-w6-free-style/tree/JJ)
- [이전 배포(헤로쿠)](https://teamseparator.herokuapp.com/)

### 레이팅 산출방식
- 결과레이팅 = 이전레이팅 + 가중치 * (승패 - 예상승률)
  - 가중치 : 40
  - 승패 : 승리시 1, 패배시 0
  - 예상승률 : 1 / (10<sup>(상대 평균 점수 - 아군 평균 점수) / 400</sup> + 1)
- 초기 레이팅 : 1000
- 레이팅 차이가 400점일 때 실력차는 10배
### 향후 계획

#### 1.0.3
- [개선사항](https://github.com/GleamingStar/civil-war-app/issues/7) 리팩토링
- 애니메이션 추가
- 디자인 리뉴얼...