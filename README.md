# InfluStance 소개 페이지

경제 유튜버가 지금 시장을 어떻게 보는지 기록하는 서비스 **InfluStance**의 소개 페이지입니다.
한 화면짜리 정적 페이지이며, 프레임워크와 외부 라이브러리를 쓰지 않습니다.

## 파일

| 파일 | 내용 |
|---|---|
| `index.html` | 페이지 전체 (세로 스크롤 한 장) |
| `style.css` | 스타일 |
| `signup.js` | 이메일 신청 폼 전송 |
| `hero-cards.png`, `hero-cards@2x.png` | 첫 화면 이미지 |
| `og-default.png` | 공유 미리보기 이미지 |
| `.nojekyll` | GitHub Pages가 파일을 그대로 내보내게 함 |
| `vercel.json` | Vercel 배포 설정(빌드 없음, 보안 헤더) |

## 배포

**공개 주소: https://influstance.vercel.app/**

Vercel(무료)에 올라가 있고, `main`에 push하면 자동으로 다시 배포됩니다.
빌드가 필요 없는 정적 파일이며 파일은 저장소 루트에 있습니다.

Vercel에서 가져올 때 설정:
- Framework Preset: **Other**
- Build Command: 비워 둠
- Output Directory: 비워 둠(루트)
- `vercel.json`이 나머지(주소 정리·보안 헤더)를 처리합니다.

주소를 옮길 때는 `index.html`의 `canonical`과 `og:image` 두 줄도 함께 바꿔야 합니다.
공유 미리보기가 이 두 값을 씁니다.

## 로컬에서 보기

```bash
python3 -m http.server 8000
# http://localhost:8000
```

## 사용자 지정 도메인

도메인이 정해지면 저장소 루트에 `CNAME` 파일을 만들고 도메인 한 줄만 적습니다.
그다음 저장소 **Settings → Pages → Custom domain**에 같은 값을 넣고 **Enforce HTTPS**를 켭니다.

## 알려 두는 것

- 이 페이지는 특정 유튜브 채널·인물과 제휴 관계가 없습니다.
- 첫 화면 이미지 속 인물과 채널은 **예시이며 실제가 아닙니다.**
- 투자 판단의 근거가 아닙니다.
- 이메일은 오픈 안내 1회 목적으로만 받으며, 안내 후 30일 안에 지웁니다.
