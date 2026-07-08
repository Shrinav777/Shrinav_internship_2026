package com.example.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="Student")
public class Student {

    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long stuid;
	
	@Column(name="stu_name")
	private String stu_name;
	
	@Column(name="stu_age")
	private int stu_age;
	
	@Column(name="stu_spi")
	private Float stu_spi;

	public Long getStuid() {
		return stuid;
	}

	public void setStuid(Long stuid) {
		this.stuid = stuid;
	}

	public String getStu_name() {
		return stu_name;
	}

	public void setStu_name(String stu_name) {
		this.stu_name = stu_name;
	}

	public int getStu_age() {
		return stu_age;
	}

	public void setStu_age(int stu_age) {
		this.stu_age = stu_age;
	}

	public Float getStu_spi() {
		return stu_spi;
	}

	public void setStu_spi(Float stu_spi) {
		this.stu_spi = stu_spi;
	}

	public Student(Long stuid, String stu_name, int stu_age, Float stu_spi) {
		super();
		this.stuid = stuid;
		this.stu_name = stu_name;
		this.stu_age = stu_age;
		this.stu_spi = stu_spi;
	}
	
	
	public Student() {
		
	}

	@Override
	public String toString() {
		return "Student [stuid=" + stuid + ", stu_name=" + stu_name + ", stu_age=" + stu_age + ", stu_spi=" + stu_spi
				+ "]";
	}
}
