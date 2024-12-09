# 프론트엔드 개발 템플릿 2024

본 Repo는 프론트엔드 개발 초기 설정을 간편하게 하는 것을 목적으로 한다.

- FE 프레임워크: React
- 상태 관리: Redux, RTK-Query
- CSS 라이브러리: Tailwind
- UI 라이브러리: Shadcn
- lint: eslint, prettier

## Getting Started

- `.env.development` 파일을 만들고, 서버 base url을 지정합니다.

예시:

```bash
NEXT_PUBLIC_SERVER_BASE_URL="http://localhost:5001"
```

- 아래 절차에 따라 개발을 시작합니다.

```bash
# Node.js가 없으면 설치

# 디펜던시 설치
npm install

# 프론트엔드 개발 서버 시작
npm run dev

# 더미 데이터 서버인 json server와 같이 시작
npm run dev-json-server
```

- localhost:3000/todo 에서 간단한 todo app 예시가 보이면 성공
  - json-server와 통신이 되어야 app이 제대로 작동합니다.

## 디렉터리 구조

https://www.robinwieruch.de/react-folder-structure/ 를 참고하여 feature-based 구조 구현

```bash
├── app # Next.js App Router
│   └── todo
├── components # 공용 컴포넌트
│   └── ui
├── feature # 핵심 기능 별 정리
│   └── todo
│       ├── components # todo 기능만을 위한 컴포넌트
│       ├── api # todo 기능을 위한 api (네트워크 요청, 클라이언트 상태, 서버 상태 관리 등)
│       └── types # TypeScript 타입
│       └── ... CRUD, 핵심 기능 관련 컴포넌트 
└── lib
│   └── api.ts # 공용 api 설정
│   └── store.ts # 전역 상태 설정
│   └── utils.ts # 그 외 유틸 함수
...
```

