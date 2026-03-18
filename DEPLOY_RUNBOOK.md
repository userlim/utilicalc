# UtiliCalc 배포 런북

## 프로젝트 구조
```
utilicalc/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # 글로벌 레이아웃 (헤더/푸터)
│   │   ├── page.tsx            # 홈페이지
│   │   ├── globals.css         # Tailwind + 커스텀 스타일
│   │   ├── sitemap.ts          # 자동 sitemap.xml 생성
│   │   ├── robots.ts           # robots.txt 생성
│   │   ├── not-found.tsx       # 404 페이지
│   │   ├── category/[slug]/    # 카테고리 3개 페이지
│   │   └── tools/              # 12개 도구 페이지
│   │       ├── inches-to-cm/
│   │       ├── feet-to-meters/
│   │       ├── lbs-to-kg/
│   │       ├── cups-to-ml/
│   │       ├── fahrenheit-to-celsius/
│   │       ├── percent-calculator/
│   │       ├── tip-calculator/
│   │       ├── discount-calculator/
│   │       ├── margin-calculator/
│   │       ├── age-calculator/
│   │       ├── days-between-dates/
│   │       └── business-days-calculator/
│   ├── components/
│   │   └── ToolLayout.tsx      # 공통 도구 레이아웃
│   └── lib/
│       └── tools.ts            # 도구/카테고리 데이터
├── public/
│   └── favicon.svg
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── postcss.config.js
```

## 카테고리 & 도구 목록 (12개)

### Unit Converters (5개)
1. Inches to CM (`/tools/inches-to-cm`)
2. Feet to Meters (`/tools/feet-to-meters`)
3. Pounds to KG (`/tools/lbs-to-kg`)
4. Cups to ML (`/tools/cups-to-ml`)
5. Fahrenheit to Celsius (`/tools/fahrenheit-to-celsius`)

### Finance & Percentage Calculators (4개)
6. Percentage Calculator (`/tools/percent-calculator`)
7. Tip Calculator (`/tools/tip-calculator`)
8. Discount Calculator (`/tools/discount-calculator`)
9. Profit Margin Calculator (`/tools/margin-calculator`)

### Date & Time Tools (3개)
10. Age Calculator (`/tools/age-calculator`)
11. Days Between Dates (`/tools/days-between-dates`)
12. Business Days Calculator (`/tools/business-days-calculator`)

---

## 1단계: 로컬 검증 (네가 해야 할 것)

```powershell
# 프로젝트 폴더로 이동
cd C:\Users\LolPaGo\Desktop\utilicalc

# 의존성 설치
npm install

# 타입 체크
npx tsc --noEmit

# 빌드
npm run build

# 로컬 서버 실행
npm run dev
```

브라우저에서 확인할 것:
- [ ] http://localhost:3000 → 홈 화면 열림
- [ ] 카테고리 3개 페이지 열림
- [ ] 12개 도구 페이지 전부 열림
- [ ] 각 도구 계산 결과 정상
- [ ] 모바일 반응형 (F12 → 모바일 뷰)
- [ ] /sitemap.xml 열림
- [ ] /robots.txt 열림
- [ ] 404 페이지 작동

---

## 2단계: Git 초기화 & GitHub Push

```powershell
# Git 초기화
git init
git add .
git commit -m "initial utilicalc MVP - 12 tools"

# GitHub에서 repo 먼저 만들고 (utilicalc)
git remote add origin https://github.com/너계정명/utilicalc.git
git branch -M main
git push -u origin main
```

---

## 3단계: Vercel 배포

### 방법 A: Vercel CLI (권장)
```powershell
# Vercel CLI 설치 (한번만)
npm install -g vercel

# Vercel 로그인 (한번만)
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 방법 B: Vercel 웹사이트
1. https://vercel.com 로그인
2. "Import Project" 클릭
3. GitHub repo 연결
4. Framework: Next.js 자동 감지
5. Deploy 클릭

배포 후 확인:
- [ ] Production URL 접속 가능
- [ ] /sitemap.xml 접속 가능
- [ ] /robots.txt 접속 가능
- [ ] 각 도구 페이지 direct URL 접속 가능
- [ ] 모바일에서 접속 가능

---

## 4단계: 수익화 준비 세팅

### Google Search Console
1. https://search.google.com/search-console
2. 속성 추가 → URL 접두어 방식 → Vercel URL 입력
3. DNS 인증 또는 HTML 파일 인증
4. sitemap.xml 제출

### Google Analytics
1. https://analytics.google.com
2. GA4 속성 생성
3. 측정 ID (G-XXXXXXX) 복사
4. `src/app/layout.tsx`의 `<head>` 안에 추가:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"></script>
<script dangerouslySetInnerHTML={{__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','G-XXXXXXX');`}} />
```

### Bing Webmaster Tools
1. https://www.bing.com/webmasters
2. 사이트 추가
3. sitemap 제출

---

## 5단계: 색인 확인 (광고보다 먼저!)

1~2주 후 확인할 것:
- [ ] Google Search Console에서 색인 상태 확인
- [ ] Impressions 발생 여부
- [ ] 어떤 도구 페이지가 먼저 잡히는지
- [ ] Title/Description 문제 없는지

---

## 6단계: 광고 세팅 (색인 확인 후)

### Google AdSense
1. https://adsense.google.com
2. 사이트 추가 & 승인 대기
3. 승인 후 광고 코드 삽입

---

## 7단계: 확장 로드맵

확장 우선순위:
1. Unit Converters 5개 → 15개 (cm to inches, kg to lbs 역방향 별도 페이지)
2. Finance 4개 → 12개 (이자 계산기, 환율 계산기 등)
3. Date/Time 3개 → 10개 (D-day, 요일 계산 등)
4. 내부 링크 재구성
5. 영어 기준 롱테일 페이지 추가
