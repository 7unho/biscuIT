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
    keyword: string,
    type: string,
    sort: string | null,
    time: number | null,
    lastContentId: number,
    size: number
  ) {
    return (
      `/api/search/recent?keyword=${keyword}&type=${type}&lastContentId=${lastContentId}&size=${size}` +
      `${sort ? `&sort=${sort}` : ''}` +
      `${time ? `&time=${time}` : ''}`
    );
  },

  // 퀴즈 제공(GET), 퀴즈 제출 내역 저장(POST)
  QUIZZES(contentId: number) {
    return `/api/${contentId}/quizzes`;
  },

  // 홈 인기/최신/랜덤 컨텐츠 추천 목록 조회
  GET_HOME_CONTENTS(
    classification: string,
    categoryCount?: number,
    fromTo?: { start: number; end: number },
    type?: string,
  ) {
    let route = '/api/recommends/random';
    route +=
      classification === 'category'
        ? `/${classification}?categoryCount=${categoryCount}`
        : `?sort=${classification}`;
    route += `&type=${type}&from=${fromTo?.start}&to=${fromTo?.end}`;
    return route;
  },

  // 가입 설문조사 전달
  POST_ABOUT_USER() {
    return `/api/members/onboarding`;
  },
};