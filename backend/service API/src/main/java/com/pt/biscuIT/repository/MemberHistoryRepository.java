package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.MemberBookmark;
import com.pt.biscuIT.entity.MemberHistory;

@Repository
public interface MemberHistoryRepository extends JpaRepository<MemberHistory, Long> {
}
