package com.maprosoft.maproweb.jira.rest;

import static com.google.common.base.Preconditions.checkNotNull;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.plugins.rest.common.security.AnonymousAllowed;
import com.maprosoft.maproweb.jira.ao.IssueLocationDAO;
import com.maprosoft.maproweb.jira.model.IssueLocationInfo;
import com.maprosoft.maproweb.jira.model.Status;

/**
 * A resource for issue location reporting.
 */
@Path("/mj")
public class MaprosoftJiraResource {
	
	private final ActiveObjects ao;

	public MaprosoftJiraResource(final ActiveObjects ao) {
		this.ao = checkNotNull(ao);
	}

    @GET
    @AnonymousAllowed
    @Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
    public Response pink() {
       return Response.ok(new MaprosoftJiraResourceModel("ok")).build();
    }

    @POST
    @Path("save-issue-location")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public Response saveIssueLocation(final IssueLocationInfo issueLocationInfo) {
    	IssueLocationDAO.save(issueLocationInfo, ao);
		Status responseData = new Status("");
		System.out.println("Returning status: '" + responseData + "'");
        return Response.ok().entity(responseData).type(MediaType.APPLICATION_JSON).build();
    }

    @GET
    @Path("get-issue-location-by-issue-key/{issue-key}")
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces({MediaType.APPLICATION_JSON})
    public IssueLocationInfo getLocationByIssueId(
    		@PathParam("issue-key") final String issueKey) {
    	final IssueLocationInfo issueLocationInfo = IssueLocationDAO.findByIssueKey(issueKey, ao);
    	return issueLocationInfo;
    }
    
}