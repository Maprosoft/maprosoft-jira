package com.maprosoft.maproweb.jira.rest;

import javax.xml.bind.annotation.*;
@XmlRootElement(name = "message")
@XmlAccessorType(XmlAccessType.FIELD)
public class MaprosoftJiraResourceModel {

    @XmlElement(name = "value")
    private String message;

    public MaprosoftJiraResourceModel() {
    }

    public MaprosoftJiraResourceModel(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}