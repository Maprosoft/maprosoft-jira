package com.maprosoft.maproweb.jira.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonValue;

public enum LocationType {
	
	MAP,
	
	DEVICE,
	
	ADDRESS;
	
	@JsonValue
    final String value() {
        return this.name().toLowerCase();
    }
	
	@JsonCreator
	public static LocationType parse(final String source) {
		for (LocationType value: LocationType.values()) {
			if (value.name().equalsIgnoreCase(source)) {
				return value;
			}
		}
		return null;
	}
			
}
