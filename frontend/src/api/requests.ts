export const requests = {
  base_url: 'https://j8a706.p.ssafy.io',

  // 카테고리별 컨텐츠 목록 조회
  GET_CATEGORY_CONTENTS(
    categoryName: string = '',
    option: string = 'recent', // "recent", "hit"
    type: string = 'all', // "all", "article", "video"
    size: number = 20,
    lastContentId: number = 999,
    from?: number | null,
    to?: number | null
  ) {
    return (
      `/api/categories/${categoryName}/contents/${option}?type=${type}&size=${size}&lastContentId=${lastContentId}` +
      `${from !== null ? `&from=${from}` : ''}` +
      `${to ? `&to=${to}` : ''}`
    );
  },

  // 카테고리 목록 조회
  GET_CATEGORIES() {
    return `/api/categories`;
  },

  // 컨텐츠 조회
  GET_CONTENT(contentId: number) {
    return `/api/contents/${contentId}`;
  },

  // 피드백 저장
  POST_FEEDBACK(contentId: number) {
    return `/api/contents/${contentId}/feedback`;
  },

  // 키워드 검색
  GET_SEARCH(
    option: string, // "recent", "hit"
    keyword: string,
    condition: string, // "content", "company"
    lastContentId: number,
    size: number,
    from: number,
    to: number,
    type: string // "article", "video"
  ) {
    return (
      `/api/search/${option}?keyword=${keyword}&condition=${condition}&lastContentId=${lastContentId}&size=${size}` +
      `${from !== null ? `&from=${from}` : ''}` +
      `${to ? `&to=${to}` : ''}` +
      `${type ? `&type=${type}` : ''}`
    );
  },

  // 퀴즈 제공(GET), 퀴즈 제출 내역 저장(POST)
  QUIZZES(contentId: number) {
    return `/api/quizzes/${contentId}`;
  },

  // 홈 인기/최신/랜덤 컨텐츠 추천 목록 조회
  GET_HOME_CONTENTS(
    classification: string,
    categoryCount?: number,
    fromTo?: { start: number; end: number },
    type?: string
  ) {
    let route = '/api/recommends/random';
    route +=
      classification === 'category'
        ? `/${classification}?categoryCount=${categoryCount}`
        : `?sort=${classification}`;
    route += `&type=${type}&from=${fromTo?.start}&to=${fromTo?.end}`;
    return route;
  },

  GET_PERSONAL_CONTENTS(
    option: string,
    fromTo: {
      start: number;
      end: number;
    },
    type: string
  ) {
    return `/api/recommends/personal/${option}?type=${type}&from=${fromTo?.start}&to=${fromTo?.end}`;
  },

  // 가입 설문조사 전달
  POST_ABOUT_USER() {
    return `/api/members/onboarding`;
  },

  // 대시보드
  GET_DASHBOARD() {
    return `/api/members/dashboard`;
  },

  // 내 프로필 정보
  GET_MYINFO() {
    return `/api/members`;
  },

  PUT_MYINFO() {
    return `/api/members`;
  },

  // 로그아웃
  POST_SIGNOUT() {
    return `/api/auth/signout`;
  },
  // 북마크 조회
  GET_BOOKMARK(lastContentId: number, size: number) {
    return `/api/bookmarks?lastContentId=${lastContentId}&size=${size}`;
  },

  // 북마크 추가
  POST_BOOKMARK() {
    return `/api/bookmarks`;
  },

  // 북마크 삭제
  DELETE_BOOKMARK(contentId: number) {
    return `/api/bookmarks/${contentId}`;
  },

  // 히스토리 조회
  GET_HISTORY(lastContentId: number, size: number) {
    return `/api/histories?lastContentId=${lastContentId}&size=${size}`;
  },
};
