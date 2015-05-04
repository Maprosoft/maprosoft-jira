package com.maprosoft.maproweb.jira;

import com.atlassian.sal.api.ApplicationProperties;

public class MaprosoftJiraComponentImpl implements MaprosoftJiraComponent {
	
	private final ApplicationProperties applicationProperties;

	public MaprosoftJiraComponentImpl(final ApplicationProperties applicationProperties) {
		this.applicationProperties = applicationProperties;
	}

	public String getName() {
		if (null != applicationProperties) {
			return "myComponent:" + applicationProperties.getDisplayName();
		}
		return "myComponent";
	}
}