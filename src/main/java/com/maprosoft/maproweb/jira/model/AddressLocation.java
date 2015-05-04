package com.maprosoft.maproweb.jira.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AddressLocation {

	private String line1;
	private String line2;
	private String suburb;
	private String country;

	public AddressLocation() {
	}

	@JsonCreator
	public AddressLocation(
			@JsonProperty("line1") String line1,
			@JsonProperty("line2") String line2,
			@JsonProperty("suburb") String suburb,
			@JsonProperty("country") String country) {
		this.line1 = line1;
		this.line2 = line2;
		this.suburb = suburb;
		this.country = country;
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

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

}