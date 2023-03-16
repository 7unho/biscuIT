package com.pt.biscuIT.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity
public class MemberProfile {
	@Id
	private Long memberId;
	@MapsId
	@JoinColumn(name = "member_id")
	@OneToOne(fetch = FetchType.LAZY)
	private Member member;
	private Job job; //직무
	private Integer period; //연차
	private Integer exp; //경험치
}
