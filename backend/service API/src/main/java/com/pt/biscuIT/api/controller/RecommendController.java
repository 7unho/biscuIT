package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.content.ContentInfoListCategoryDto;
import com.pt.biscuIT.api.response.RandomCategoryContentRes;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.common.model.response.PageMetaData;
import com.pt.biscuIT.api.dto.content.ContentInfoDto;
import com.pt.biscuIT.api.response.RandomRecentContentRes;
import com.pt.biscuIT.api.service.RecommendService;
import com.pt.biscuIT.db.repository.ContentRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommends")
@Slf4j
public class RecommendController {

    @Autowired
    RecommendService recommendService;

    @Autowired
    ContentRepository contentRepositorySupport;

    /*
        TODO: 추천 컨텐츠를 제공하는 API
        ERROR CODE
        400: 잘못된 요청
        401: 인증되지 않은 사용자
        403: 권한 없음
        500: 서버 내부 오류
    */

    @GetMapping("/random")
    public ResponseEntity<? extends BaseResponseBody> getRandomRecentContent(
            @PageableDefault(size = 30) Pageable pageable,
            @RequestParam(required = false, defaultValue = "0") int from,
            @RequestParam(required = false, defaultValue = "1440") int to
    ) {
        Page<ContentInfoDto> contentList = recommendService.getRandomContent(pageable, from, to);

        PageMetaData metaData = PageMetaData.builder()
                .lastContentId(contentList.getContent().get(contentList.getContent().size() - 1).getId())
                .last(contentList.isLast())
                .build();

        return ResponseEntity.status(200).body(RandomRecentContentRes.of(
                HttpStatus.OK.value(),
                "SUCCESS",
                RandomRecentContentRes.builder()
                        .metaData(metaData)
                        .results(contentList.getContent())
                        .build())
        );
    }

    @GetMapping("/random/category")
    public ResponseEntity<? extends BaseResponseBody> getRandomCategoryContent(
            @PageableDefault(size = 30) Pageable pageable,
            @RequestParam(required = false, defaultValue = "5") int categoryCount,
            @RequestParam(required = false, defaultValue = "0") int from,
            @RequestParam(required = false, defaultValue = "1440") int to
    ) {
        Page<ContentInfoListCategoryDto> contentList = recommendService.getRandomCategoryContent(categoryCount, pageable, from, to);

        return ResponseEntity.status(200).body(RandomCategoryContentRes.of(
                HttpStatus.OK.value(),
                "SUCCESS",
                RandomCategoryContentRes.builder()
                        .results(contentList.getContent())
                        .build()
        ));
    }
}