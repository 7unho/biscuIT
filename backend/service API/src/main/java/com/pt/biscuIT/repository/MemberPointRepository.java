package com.pt.biscuIT.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pt.biscuIT.entity.MemberPoint;

@Repository
public interface MemberPointRepository extends JpaRepository<MemberPoint, Long> {
}
