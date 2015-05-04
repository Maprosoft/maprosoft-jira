package com.maprosoft.maproweb.jira.ao;

import net.java.ao.Entity;
import net.java.ao.Preload;
import net.java.ao.schema.Table;

@Preload
@Table("IssueLocation")
public interface IssueLocationEntity extends Entity {

	public Long getIssueId();

	public void setIssueId(Long issueId);

	public String getIssueKey();

	public void setIssueKey(String issueKey);

	public String getLocationType();

	public void setLocationType(String locationType);

	public double getLatitude();

	public void setLatitude(double latitude);

	public double getLongitude();

	public void setLongitude(double longitude);

	public String getLine1();

	public void setLine1(String line1);

	public String getLine2();

	public void setLine2(String line2);

	public String getSuburb();

	public void setSuburb(String suburb);

	public String getState();

	public void setState(String state);

	public String getCountry();

	public void setCountry(String country);

}
