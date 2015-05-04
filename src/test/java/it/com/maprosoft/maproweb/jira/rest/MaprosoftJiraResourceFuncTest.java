package it.com.maprosoft.maproweb.jira.rest;

import org.junit.Test;
import org.junit.After;
import org.junit.Before;
import org.mockito.Mockito;
import static org.junit.Assert.*;
import static org.mockito.Mockito.*;
import com.maprosoft.maproweb.jira.rest.MaprosoftJiraResource;
import com.maprosoft.maproweb.jira.rest.MaprosoftJiraResourceModel;
import org.apache.wink.client.Resource;
import org.apache.wink.client.RestClient;

public class MaprosoftJiraResourceFuncTest {

    @Before
    public void setup() {

    }

    @After
    public void tearDown() {

    }

    @Test
    public void messageIsValid() {

        String baseUrl = System.getProperty("baseurl");
        String resourceUrl = baseUrl + "/rest/maprosoftjiraresource/1.0/message";

        RestClient client = new RestClient();
        Resource resource = client.resource(resourceUrl);

        MaprosoftJiraResourceModel message = resource.get(MaprosoftJiraResourceModel.class);

        assertEquals("wrong message","Hello World",message.getMessage());
    }
}
