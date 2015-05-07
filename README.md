# maprosoft-jira
================

# Introduction

This add-on provides integration between JIRA and Maprosoft's products - [Maproweb](http://www.maprosoft.com/maproweb.html), [Maproapp](http://www.maprosoft.com/maproapp.html) and [Maproissue](http://www.maprosoft.com/maproissue.html).

Currently the add-on provides … Further integrations and enhancements are planned.

# Running

Install Atlassian's Plugin SDK as per the instructions on their website:

https://developer.atlassian.com/docs

Here are the main SDK commands you'll use to contribute to this add-on:

* atlas-compile -- builds the project
* atlas-run     -- installs this plugin into the product and starts it on localhost
* atlas-debug   -- same as atlas-run, but allows a debugger to attach at port 5005
* atlas-cli     -- after atlas-run or atlas-debug, opens a Maven command line window:
                   - 'pi' reinstalls the plugin into the running product instance
* atlas-help    -- prints description for all commands in the SDK

# Capabilities

## Location Reporting

Issue screens will have a location panel within the right section allowing the location to be reported.

## Servlet

Visit http://{base-url}/jira/plugins/servlet/maprosoft/list to list location information for all issues.

# Support

for support, please [contact Maprosoft](http://www.maprosoft.com/contact.html).


# Online Help
