package com.maprosoft.maproweb.jira.ao;

import net.java.ao.Query;

import com.atlassian.activeobjects.external.ActiveObjects;
import com.atlassian.sal.api.transaction.TransactionCallback;
import com.maprosoft.maproweb.jira.model.IssueLocationInfo;
import com.maprosoft.maproweb.jira.model.LocationType;

public class IssueLocationDAO {

	public static void save(final IssueLocationInfo issueLocationInfo, final ActiveObjects ao) {
		final String issueKey = issueLocationInfo.getIssueKey();
		final IssueLocationEntity existingEntity = findEntityByIssueKey(issueKey, ao);
		if (existingEntity == null) {
			ao.executeInTransaction(new TransactionCallback<IssueLocationEntity>() {
				@Override
				public IssueLocationEntity doInTransaction() {
					final IssueLocationEntity issueLocationEntity = ao.create(IssueLocationEntity.class);
					save(issueLocationInfo, issueLocationEntity, ao);
					return issueLocationEntity;
				}
			});
		} else {
			save(issueLocationInfo, existingEntity, ao);
		}
	}
	
	private static void save(
			final IssueLocationInfo issueLocationInfo,
			final IssueLocationEntity issueLocationEntity,
			final ActiveObjects ao) {
		issueLocationEntity.setIssueId(issueLocationInfo.getIssueId());
		issueLocationEntity.setIssueKey(issueLocationInfo.getIssueKey());
		LocationType locationType = issueLocationInfo.getLocationType();
		issueLocationEntity.setLocationType(locationType.name());
		issueLocationEntity.setLatitude(issueLocationInfo.getLatitude());
		issueLocationEntity.setLongitude(issueLocationInfo.getLongitude());
		issueLocationEntity.setLine1(issueLocationInfo.getLine1());
		issueLocationEntity.setLine2(issueLocationInfo.getLine2());
		issueLocationEntity.setSuburb(issueLocationInfo.getSuburb());
		issueLocationEntity.setState(issueLocationInfo.getState());
		issueLocationEntity.setCountry(issueLocationInfo.getCountry());
		issueLocationEntity.save();
	}
	
	public static IssueLocationInfo findByIssueKey(final String issueKey, final ActiveObjects ao) {
		IssueLocationEntity issueLocationEntity = findEntityByIssueKey(issueKey, ao);
		if (issueLocationEntity == null) {
			return null;
		} else {
			Long issueId = issueLocationEntity.getIssueId();
			String locationTypeString = issueLocationEntity.getLocationType();
			LocationType locationType = LocationType.parse(locationTypeString);
			double latitude = issueLocationEntity.getLatitude();
			double longitude = issueLocationEntity.getLongitude();
			String line1 = issueLocationEntity.getLine1();
			String line2 = issueLocationEntity.getLine2();
			String suburb = issueLocationEntity.getSuburb();
			String state = issueLocationEntity.getState();
			String country = issueLocationEntity.getCountry();
			final IssueLocationInfo issueLocationInfo = new IssueLocationInfo(
					issueId,
					issueKey,
					locationType,
					latitude,
					longitude,
					line1,
					line2,
					suburb,
					state,
					country);
			return issueLocationInfo;
		}
	}
	
	private static IssueLocationEntity findEntityByIssueKey(final String issueKey, final ActiveObjects ao) {
		Query criteria = Query.select().where("ISSUE_KEY = ?", String.valueOf(issueKey));
		IssueLocationEntity[] issueLocationEntities = ao.find(IssueLocationEntity.class, criteria);
		if (issueLocationEntities != null && issueLocationEntities.length > 0) {
			return issueLocationEntities[0];
		} else {
			return null;
		}
	}

}
