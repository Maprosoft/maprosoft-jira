package com.maprosoft.maproweb.jira.servlet;

import static com.google.common.base.Preconditions.checkNotNull;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.maprosoft.maproweb.jira.ao.IssueLocationDAO;
import com.maprosoft.maproweb.jira.model.IssueLocationInfo;

@SuppressWarnings("serial")
public class MaprosoftJiraServlet extends HttpServlet {
	
	private final ActiveObjects ao;

	public MaprosoftJiraServlet(ActiveObjects ao) {
		this.ao = checkNotNull(ao);
	}

	@Override
	protected void doGet(final HttpServletRequest request, final HttpServletResponse response)
	throws ServletException, IOException {
		response.setContentType("application/json;charset=UTF-8");
		PrintWriter out = response.getWriter();
        IssueLocationInfo[] issueLocationInfos = IssueLocationDAO.findAllIssueLocations(ao);
        if (issueLocationInfos == null) {
        	//
        } else {
        	ObjectMapper mapper = new ObjectMapper();
        	mapper.writeValue(out, issueLocationInfos);
        }
        out.close();
	}

}
