package ut.com.maprosoft.maproweb.jira;

import org.junit.Test;
import com.maprosoft.maproweb.jira.MyPluginComponent;
import com.maprosoft.maproweb.jira.MyPluginComponentImpl;

import static org.junit.Assert.assertEquals;

public class MyComponentUnitTest
{
    @Test
    public void testMyName()
    {
        MyPluginComponent component = new MyPluginComponentImpl(null);
        assertEquals("names do not match!", "myComponent",component.getName());
    }
}