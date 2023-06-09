package com.pt.biscuIT.api.controller;

import com.pt.biscuIT.api.dto.quiz.QuizSubmitDto;
import com.pt.biscuIT.api.dto.quiz.QuizSubmitRequestDto;
import com.pt.biscuIT.api.response.CategoryInfoListRes;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pt.biscuIT.api.dto.quiz.ProvideQuizDto;
import com.pt.biscuIT.api.service.MemberAuthService;
import com.pt.biscuIT.api.service.QuizService;
import com.pt.biscuIT.common.model.response.BaseResponseBody;
import com.pt.biscuIT.db.entity.Member;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequiredArgsConstructor
@RequestMapping("/api")
public class QuizController {
	private final QuizService quizService;
	private final MemberAuthService memberAuthService;

	@GetMapping("/quizzes/{contentId}")
	public ProvideQuizDto provideQuiz(@PathVariable Long contentId) {
		return quizService.provideQuiz(contentId);
	}

	@PostMapping("/quizzes/{contentId}")
	public QuizSubmitDto submitQuiz(@RequestHeader(value = "Authorization") String token, @PathVariable Long contentId, @RequestBody QuizSubmitRequestDto requestDto) {
		Member member = memberAuthService.getMember(token);
		return quizService.submitQuiz(member, contentId, requestDto);
	}
}
