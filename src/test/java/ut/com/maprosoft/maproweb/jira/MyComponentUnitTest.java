package ut.com.maprosoft.maproweb.jira;

import org.junit.Test;
import com.maprosoft.maproweb.jira.MaprosoftJiraComponent;
import com.maprosoft.maproweb.jira.MaprosoftJiraComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MaprosoftJiraComponent component = new MaprosoftJiraComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}