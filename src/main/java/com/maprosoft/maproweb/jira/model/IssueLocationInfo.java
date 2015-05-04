package com.maprosoft.maproweb.jira.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class IssueLocationInfo {

	@JsonProperty("issueId")
	private Long issueId;
	
	@JsonProperty("issueKey")
	private String issueKey;
	
	@JsonProperty("locationType")
	private LocationType locationType;
	
	@JsonProperty("latitude")
	private double latitude;
	
	@JsonProperty("longitude")
	private double longitude;
	
	@JsonProperty("line1")
	private String line1;
	
	@JsonProperty("line2")
	private String line2;
	
	@JsonProperty("suburb")
	private String suburb;
	
	@JsonProperty("state")
	private String state;
	
	@JsonProperty("country")
	private String country;

	@JsonCreator
	public IssueLocationInfo(
			@JsonProperty("issueId") Long issueId,
			@JsonProperty("issueKey") String issueKey,
			@JsonProperty("locationType") LocationType locationType,
			@JsonProperty("latitude") double latitude,
			@JsonProperty("longitude") double longitude,
			@JsonProperty("line1") String line1,
			@JsonProperty("line2") String line2,
			@JsonProperty("suburb") String suburb,
			@JsonProperty("state") String state,
			@JsonProperty("country") String country) {
		this.issueId = issueId;
		this.issueKey = issueKey;
		this.locationType = locationType;
		this.latitude = latitude;
		this.longitude = longitude;
		this.line1 = line1;
		this.line2 = line2;
		this.suburb = suburb;
		this.state = state;
		this.country = country;
	}

	public Long getIssueId() {
		return issueId;
	}

	public void setIssueId(Long issueId) {
		this.issueId = issueId;
	}

	public String getIssueKey() {
		return issueKey;
	}

	public void setIssueKey(String issueKey) {
		this.issueKey = issueKey;
	}

	public LocationType getLocationType() {
		return locationType;
	}

	public void setLocationType(LocationType locationType) {
		this.locationType = locationType;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public String getLine1() {
		return line1;
	}

	public void setLine1(String line1) {
		this.line1 = line1;
	}

	public String getLine2() {
		return line2;
	}

	public void setLine2(String line2) {
		this.line2 = line2;
	}

	public String getSuburb() {
		return suburb;
	}

	public void setSuburb(String suburb) {
		this.suburb = suburb;
	}

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	@Override
	public String toString() {
		return "IssueLocationInfo [issueId=" + issueId + ", issueKey="
				+ issueKey + ", locationType=" + locationType + ", latitude="
				+ latitude + ", longitude=" + longitude + ", line1=" + line1
				+ ", line2=" + line2 + ", suburb=" + suburb + ", country="
				+ country + "]";
	}


}