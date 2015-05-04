package com.maprosoft.maproweb.jira;

import java.util.Map;
import java.util.TreeMap;

import com.atlassian.crowd.embedded.api.User;
import com.atlassian.jira.issue.Issue;
import com.atlassian.jira.plugin.webfragment.contextproviders.AbstractJiraContextProvider;
import com.atlassian.jira.plugin.webfragment.model.JiraHelper;

@SuppressWarnings("unchecked")
public class LocationContextProvider extends AbstractJiraContextProvider {

	@Override
	public Map<String, Object> getContextMap(final User user, final JiraHelper jiraHelper) {
		final Map<String, Object> contextMap = new TreeMap<String, Object>();
		final Issue issue = (Issue) jiraHelper.getContextParams().get("issue");
		final Long issueId = issue.getId();
		final String issueKey = issue.getKey();
        contextMap.put("currentIssueId", issueId);
        contextMap.put("currentIssueKey", issueKey);
        return contextMap;
	}
	
}
