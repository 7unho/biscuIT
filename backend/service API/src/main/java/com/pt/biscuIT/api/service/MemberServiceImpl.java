package com.pt.biscuIT.api.service;

import com.pt.biscuIT.api.dto.history.MemberGraphDto;
import com.pt.biscuIT.api.dto.history.MemberHistoryDto;
import com.pt.biscuIT.common.exception.MemberNotFoundException;
import com.pt.biscuIT.db.entity.Member;
import com.pt.biscuIT.db.repository.MemberHistoryRepositorySupport;
import com.pt.biscuIT.db.repository.MemberPointRepositorySupport;
import com.pt.biscuIT.db.repository.MemberRepository;
import com.pt.biscuIT.db.repository.MemberRepositorySupport;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

import java.util.Optional;

/**
 * 회원 관련 서비스 정의.
  * author:
  * date:
 */

@Slf4j
@RequiredArgsConstructor
@Service("memberService")
public class MemberServiceImpl implements MemberService {
    private final MemberRepository memberRepository;
    private final MemberRepositorySupport memberRepositorySupport;
    private final MemberPointRepositorySupport memberPointRepositorySupport;

    private final MemberHistoryRepositorySupport memberHistoryRepositorySupport;

    public Member findMemberById(Long id) {
        if (memberRepository.findById(id).isPresent()) {
            return memberRepository.findById(id).get();
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    public Member findByIdentifier(String identifier) {
        Optional<Member> member = memberRepository.findByIdentifier(identifier);
        if (member.isPresent()) {
            return member.get();
        }else {
            throw new MemberNotFoundException("해당 회원이 존재하지 않습니다.");
        }
    }

    @Override
    public Member update(Member member) {
        memberRepository.save(member);
        return null;
    }

    public List<MemberHistoryDto> getHistoriesByMember(Member member) {
        List<MemberHistoryDto> res = memberHistoryRepositorySupport.getHistoriesByMemberId(member.getId());
        return res == null ? new ArrayList<>() : res;
    }

    public List<MemberGraphDto> getGraphsByMember(Member member) {
        List<MemberGraphDto> res = memberHistoryRepositorySupport.getGraphsByMemberId(member.getId());
        return res == null? new ArrayList<>() : res;
    }

    public Integer getPointByMember(Member member) {
        return memberPointRepositorySupport.findPointByMemberId(member.getId());
    }
}