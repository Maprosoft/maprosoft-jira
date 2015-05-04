

		//$(document).ready(function() {

//(function($) {
//AJS.toInit(function() {
//AJS.bind("init.rte", function() {
AJS.$(document).ready(function () {
	
//	alert("In AJS.toInit");
	
	var $ = AJS.$;
	
			
		// Constants/variables...
		
		document.IR = {
				domainKey: "default",
				useLeaflet: false,
				mapOptionIndex: 0,
				addressOptionIndex: 1,
				deviceOptionIndex: 2,
				minFormWidth: 200,
				maxFormWidth: 500,
				imagePreviewWidth: 75,
				maxPhotoSizeMb: 5,
//				standardMessageText: "Please provide as many details as possible.",
				standardMessageText: "&nbsp;",
				topMessageLabel: $("#topMessage"),
				maprosoftIssueReportPanel: $("#maprosoft-issue-report-panel"),
				issueReportForm: $("#issueReportForm"),
				selectOptionText: "select...",
				issueTypeNames: ["Bill Posters"],
				markerImageUrl: "http://www.maprosoft.com/maproweb-demo/images/marker/warning.png",
				issueTypes: $("#issueTypes"),
				deviceLocationEntryOption: $("#deviceLocationEntryOption"),
				mapLocationEntryOption: $("#mapLocationEntryOption"),
				addressLocationEntryOption: $("#addressLocationEntryOption"),
				deviceLocationEntryOptionLabel: $("#deviceLocationEntryOptionLabel"),
				mapLocationEntryOptionLabel: $("#mapLocationEntryOptionLabel"),
				addressLocationEntryOptionLabel: $("#addressLocationEntryOptionLabel"),
				deviceLocationEntryGroup: $("#deviceLocationEntryGroup"),
				mapLocationEntryGroup: $("#mapLocationEntryGroup"),
				addressLocationEntryGroup: $("#addressLocationEntryGroup"),
//					photoZone: $("#photoZone"),
				photoUploadSelector: $("#photoUploadSelector"),
				photoSelectButton: $("#photoSelectButton"),
				imagePreview: $("#imagePreview"),
				photoUploadProgress: $("#photoUploadProgress"),
				photoUploadTick: $("#photoUploadTick"),
//					issuePhoto: $("#issuePhoto"),
//					photoSelectLink: $("#photoSelectLink"),
//					photoContainer: $("#photoContainer"),
//					photoUploadTick: $("#photoUploadTick"),
				showPositionReportDetails: false,
				reporterEmail: $("#reporterEmail"),
				selectCurrentLocationButton: $("#selectCurrentLocationButton"),
				devicePositionSuccessInfo: $("#devicePositionSuccessInfo"),
				devicePositionErrorInfo: $("#devicePositionErrorInfo"),
				submitButton: $("#submitButton"),
				clearErrorsOnNextFocus: true,
				lastGeoResult: {
					deviceProvided: false,
					accuracy: 0,
					latitude: 0,
					longitude: 0,
					swLatitude: Number(-33.89243366771417),
					swLongitude: Number(151.1802864074707),
					neLatitude: -33.856802805906305,
					neLongitude: 151.24895095825195,
					suggestedZoom: 1
				},
				nextAnimationPosition: null,
				debugging: false
		};
		var IR = document.IR;
		IR.entryOptions = [IR.mapLocationEntryOption, IR.addressLocationEntryOption, IR.deviceLocationEntryOption];
		IR.entryGroups = [IR.mapLocationEntryGroup, IR.addressLocationEntryGroup, IR.deviceLocationEntryGroup];
		IR.optionValues = ["map", "address", "device"];
		
		IR.initialise = function() {
			IR.loadMapLibraries();
			
			IR.setOption(IR.mapOptionIndex);
			IR.initialiseFromDatabase();
//			IR.deviceLocationEntryOption.prop('checked', true);
			IR.mapLocationEntryOption.prop('checked', true);
			
//				IR.setOption(IR.mapOptionIndex);
//				IR.mapLocationEntryOption.prop('checked', true);
			
//				IR.setOption(IR.addressOptionIndex);
//				IR.addressLocationEntryOption.prop('checked', true);
			
			IR.checkDevice();
			
			IR.setupPhotoHandling();
		};
		
		IR.checkDevice = function() {
			IR.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
			if (IR.isMobile) {
				
//					$("#helpNotes").html("For mobile devices, you may like to enable auto fill.");
//					
//					$(":input").blur(function() {
//						setTimeout(function() {$("#maprosoft-issue-report-panel").dblclick()}, 1000);
//					});
				
//					var viewportMeta = document.getElementById('viewportMeta');
//					viewportMeta.setAttribute('content', 'width=900');
				
				
			}
		};
		
		// Layout...
		
		IR.adaptLayout = function() {
			var screenWidth = screen.width;
			var windowWidth = $(window).width();
			
//				if (!IR.screenSizeReported) {
//					alert("screenWidth = " + screenWidth + ", windowWidth = " + windowWidth);
//					IR.screenSizeReported = true;
//				}
			
			// The screen width will be less than the window width on a mobile device if the viewport
			// scale is less than 1. When the form is in an iframe, iOS ignores the viewport meta tag
			// so it is better to control the scaling using this javascript. Note also that the inner
			// width of the window (window.innerWidth) may become less than the window width when an
			// input becomes focussed in iOS.
			var maxWidth = Math.min(screenWidth, windowWidth);
			
			if (maxWidth > document.IR.maxFormWidth) {
				var formWidth = document.IR.maxFormWidth;
			} else if (maxWidth < document.IR.minFormWidth) {
				var formWidth = document.IR.minFormWidth;
			} else {
				var formWidth = maxWidth - 44;
			}
			IR.maprosoftIssueReportPanel.width(formWidth + "px");
			$(".mainGroupInput").width(formWidth - 5 + "px");
			
			var photoSelectButtonWidth = IR.photoSelectButton.width();
			var photoUploadTickWidth = IR.photoUploadTick.width();
			var progressWidth = formWidth - photoSelectButtonWidth - IR.imagePreviewWidth - photoUploadTickWidth - 60;
			IR.photoUploadProgress.css("width", progressWidth + "px");
			
		};
		IR.adaptLayout();
		$(window).resize(function() {
			document.IR.adaptLayout();
		});
		
		// Form setup and utilities...
		
		IR.enableSubmit = function() {
			IR.submitButton.removeAttr('disabled');
			if (IR.buttonTextToRestore) {
				IR.submitButton.html(IR.buttonTextToRestore);
				IR.buttonTextToRestore = null;
			}
		};
		
		IR.disableSubmit = function(newButtonText) {
			if (newButtonText) {
				IR.buttonTextToRestore = IR.submitButton.html();
				IR.submitButton.html("<span style=\"white-space:nowrap\">" + newButtonText + "</span>");
			}
			IR.submitButton.attr('disabled', 'disabled');
		};
		
		if (!IR.issueTypeNames || IR.issueTypeNames.length == 0) {
			$("#issueTypesGroup").hide();
		} else {
			if (IR.issueTypeNames.length > 1) {
				IR.issueTypes.append(
					$('<option></option>').val("").html(IR.selectOptionText)
				);
			}
			for (var i = 0; i < IR.issueTypeNames.length; i++) {
				var issueTypeName = IR.issueTypeNames[i];
				IR.issueTypes.append(
					$('<option></option>').val(issueTypeName).html(issueTypeName)
				);
			}
		};
		
		IR.setOptionByName = function(optionName) {
			for (var i = 0; i < IR.optionValues.length; i++) {
				if (IR.optionValues[i].toLowerCase() == optionName.toLowerCase()) {
					IR.setOption(i);
				}
			}
		};
		
		IR.setOption = function(optionIndex) {
			IR.currentOptionIndex = optionIndex;
			for (var i = 0; i < IR.entryOptions.length; i++) {
				IR.entryOptions[i].show();
			}
			IR.clearErrorIndicators();
			var marginPercent = -1 * optionIndex * 100;
			var marginLeft = marginPercent + "%";
			var maxHeight = 0;
			for (var i = 0; i < IR.entryGroups.length; i++) {
				maxHeight = Math.max(maxHeight, IR.entryGroups[i].height());
			}
			var requiredHeight = IR.entryGroups[optionIndex].height();
			var reporterInputGroup = $("#reporterInputGroup");
			var existingMarginTop = parseInt(reporterInputGroup.css("margin-top").replace("px", ""));
			var newMarginTop = 16 - maxHeight + requiredHeight;
			var topBottomMillis = Math.max(Math.abs(existingMarginTop - newMarginTop), 100);
			var animateLeftRightBeforeTopBottom = existingMarginTop > newMarginTop;
			
			IR.leftLocationEntryGroup = IR.entryGroups[0];
			IR.rightLocationEntryGroup = IR.entryGroups[IR.entryOptions.length - 1];
			
			var newOptionValue = IR.optionValues[optionIndex];
			$("#locationTypeInput").attr("value", newOptionValue);
			IR.entryOptions[optionIndex].attr('checked', 'checked');
			IR.updateTabIndexes(optionIndex);

			IR.nextAnimationPosition = {
				optionIndex: optionIndex,
				animateLeftRightBeforeTopBottom: animateLeftRightBeforeTopBottom,
				marginLeft: marginLeft,
				newMarginTop: newMarginTop,
				reporterInputGroup: reporterInputGroup,
				topBottomMillis: topBottomMillis
			};
			IR.animateToNextPosition();
		};
		
		IR.animateToNextPosition = function() {
			if (IR.nextAnimationPosition) {
				var next = IR.nextAnimationPosition;
				if (next.animateLeftRightBeforeTopBottom) {
					IR.leftLocationEntryGroup.stop().animate({
						marginLeft: next.marginLeft
		            }, 500, function() {
		            	next.reporterInputGroup.stop().animate({
		            		marginTop: next.newMarginTop + "px"
			            }, next.topBottomMillis, IR.handleAnimationComplete);
		            });
				} else {
					next.reporterInputGroup.stop().animate({
		                marginTop: next.newMarginTop + "px"
		            }, next.topBottomMillis, function() {
		            	IR.leftLocationEntryGroup.stop().animate({
			                marginLeft: next.marginLeft
			            }, 500, IR.handleAnimationComplete);
		            });
				}
			}
		};
		
		IR.handleAnimationComplete = function() {
			IR.hideNonCurrentOptions();
			IR.animateToNextPosition();
		};
		
		IR.hideNonCurrentOptions = function() {
			var entryGroupCount = IR.entryGroups.length;
			for (var index = 0; index < entryGroupCount; index++) {
				if (index != IR.currentOptionIndex) {
					IR.entryGroups[index].hide();
				}
			}
		};
		
		IR.updateTabIndexes = function(optionIndex) {
			var tabIndexedItems = $("[tabindex]");
			tabIndexedItems.each(function() {
				$(this).removeAttr("tabindex");
//					$(this).attr("tabindex", "-1");
				$(this).prop('disabled', true);
				//console.log("Disabling " + $(this).attr("id") + "...");
			});
			var inputIndexedItems = $("[inputindex]");
			inputIndexedItems.each(function() {
				$(this).prop('disabled', true);
				//console.log("Disabling " + $(this).attr("id") + "...");
			});
			var tabIndexValue = 1;
			var inputIndexedItems = $("[inputIndex]");
			//console.log("currentOptionIndex = " + IR.currentOptionIndex);
			inputIndexedItems.each(function() {
				var inputIndexedItem = $(this);
				var thisInputIndex = inputIndexedItem.attr("inputIndex");
				
				var add = true;
				if (document.IR.currentOptionIndex != IR.addressOptionIndex && thisInputIndex >= 50 && thisInputIndex <= 59) {
					add = false;
				}
				if (add) {
					//console.log("Adding " + inputIndexedItem.attr("id") + " to tab order...");
					inputIndexedItem.attr("tabindex", String(tabIndexValue));
					inputIndexedItem.prop('disabled', false);
					//console.log("Set tabindex of " + inputIndexedItem.attr("id") + " to " + tabIndexValue + " for input index = " + thisInputIndex + ".");
					tabIndexValue++;
				}
			});
			//setTimeout("document.IR.logTabOrder()", 1000);
			//setTimeout("document.IR.logInputStates()", 1000);
			
		};
		
		IR.logTabOrder = function() {
			var tabIndexItems = $("[tabindex]");
			console.log(tabIndexItems.length + " items in tab order:");
			for (var i = 0; i < tabIndexItems.length; i++) {
				var item = tabIndexItems[i];
				console.log(" " + item.getAttribute("id") + " => " + item.getAttribute("tabindex") + " (" + item.disabled + ")");
			}
		};
		
		IR.logInputStates = function() {
			var inputs = $(":input");
			console.log(inputs.length + " inputs:");
			for (var i = 0; i < inputs.length; i++) {
				var item = inputs[i];
				console.log(" " + item.getAttribute("id") + " => " + item.getAttribute("tabindex") + " (" + item.disabled + ")");
			}
		};
		
		IR.deviceLocationEntryOption.click(function() {IR.setOption(IR.deviceOptionIndex)});
		IR.mapLocationEntryOption.click(function() {IR.setOption(IR.mapOptionIndex)});
		IR.addressLocationEntryOption.click(function() {IR.setOption(IR.addressOptionIndex)});

		// Photo handling...
		
		IR.handlePhotoUploadProgress = function(event) {
//				var percentRemaining = parseInt(100 - (event.loaded / event.total * 100));
			//var percentRemaining = Math.round(100 - (event.loaded / event.total * 100));
			//var percentComplete = Math.round(event.loaded * 100 / event.total);
			var remainingBytes = event.total - event.loaded;
			var percentRemaining = Math.round(100.0 * remainingBytes / event.total);
			IR.progress.style.backgroundPosition = percentRemaining + "% 0";
		};
		
		IR.handlePhotoSubmitSuccess = function(progressEvent) {
			IR.enableSubmit();
			IR.clearErrorMessage();
			var request = progressEvent.currentTarget;
			var responseText = request.responseText.trim();
			if (/^imageId=[0-9]+$/.test(responseText)) {
				IR.photoId = responseText.substring("imageId=".length);
				$("#photoIdInput").attr("value", IR.photoId);
			} else {
				IR.setErrorMessage("Photo submit error: " + responseText);
			}
			IR.progress.className = "success";
			
			setTimeout("document.IR.showTickHideProgress()", 3000);
		};
		
		IR.handlePhotoSubmitError = function(progressEvent) {
			IR.enableSubmit();
			IR.setErrorMessage("Photo submit error");
			IR.progress.className = "failure";
		};
		
		IR.showTickHideProgress = function() {
			IR.photoUploadTick.show();
			IR.hideProgress();
		};
		
		IR.hideProgress = function() {
			var progressContainer = document.getElementById("photoUploadProgress");
			while (progressContainer.firstChild) {
				progressContainer.removeChild(progressContainer.firstChild);
			}
		};
		
		IR.getPhotoFileValidationError = function(file) {
			if (file.type.match('image.*')) {
				var maxSizeBytes = IR.maxPhotoSizeMb * 1024 * 1024;
				if (file.size < maxSizeBytes) {
					return null;
				} else {
//						IR.setErrorMessage("File too large - must be less than " + IR.maxPhotoSizeMb + " Mb.");
					return "File too large - must be less than " + IR.maxPhotoSizeMb + " Mb.";
				}
			} else {
//					IR.setErrorMessage("Only photos can be uploaded - file name must end with jpg, png or gif.");
				return "Only photos can be uploaded - file name must end with jpg, png or gif.";
			}
		};
		
		IR.submitPhoto = function(file) {
			IR.clearErrorMessage();
			var xhr = new XMLHttpRequest();
			var formData = new FormData();
			formData.append("imageFile", file);
			formData.append("domainKey", IR.domainKey);
			if (IR.photoId) {
				formData.append("imageId", IR.photoId);
			}
			IR.photoUploadTick.hide();
			var progressContainer = document.getElementById("photoUploadProgress");
			IR.hideProgress();
			IR.progress = progressContainer.appendChild(document.createElement("p"));
			IR.progress.appendChild(document.createTextNode("upload " + file.name));
			var url = "imageUploadServlet";
			IR.disableSubmit("waiting for photo upload");
			xhr.upload.addEventListener("progress", IR.handlePhotoUploadProgress, false);
			xhr.addEventListener("load", IR.handlePhotoSubmitSuccess, false);
			xhr.addEventListener("error", IR.handlePhotoSubmitError, false);
			//xhr.addEventListener("abort", uploadCanceled, false);
			xhr.open("POST", url);
			xhr.send(formData);
		};
		
		// http://www.html5rocks.com/en/tutorials/file/dndfiles/
		IR.setupPhotoHandling = function() {
//			try {
//				function handleFileSelect(event) {
//					var files = event.target.files; // FileList object
//					for (var i = 0; i < files.length; i++) {
//						var file = files[i]
//						var error = IR.getPhotoFileValidationError(file);
//						if (error) {
//							IR.setErrorMessage(error);
//						} else {
//							var reader = new FileReader();
//							// Closure to capture the file information.
//							reader.onload = (function(theFile) {
//								return function(e) {
//									// Render thumbnail.
//									var imageSrc = e.target.result;
//									var title = escape(theFile.name);
//									IR.imagePreview.css("width", IR.imagePreviewWidth + "px");
//									IR.imagePreview.attr("src", imageSrc);
//									IR.imagePreview.attr("title", title);
//									IR.imagePreview.fadeTo(400, 1.0);
//									IR.submitPhoto(theFile);
//								};
//							})(file);
//
//							// Read in the image file as a data URL.
//							reader.readAsDataURL(file);
//						}
//					}
//				}
//
//				document.getElementById('photoUploadSelector').addEventListener('change', handleFileSelect, false);					
//			} catch (e) {
//				console.log("Error: " + e);
//			}
		}
		
		
		// Validation...
		
		$("input, textarea").focus(function() {
			if (IR.clearErrorsOnNextFocus) {
				IR.clearErrorIndicators();
				IR.clearErrorsOnNextFocus = true;
			}
		});
		
		IR.setErrorMessage = function(errorMessage, htmlFormat) {
			IR.topMessageLabel.css('opacity', 1);
			IR.topMessageLabel.stop();
			IR.topMessageLabel.addClass("error");
			IR.topMessageLabel.removeClass("message");
			if (htmlFormat) {
				IR.topMessageLabel.html(errorMessage);
			} else {
				IR.topMessageLabel.text(errorMessage);
			}
			IR.topMessageLabel.fadeIn(1, function() {
			});
		};
		
		IR.clearErrorMessage = function(errorMessage) {
			IR.setInfoMessage(IR.standardMessageText);
			IR.topMessageLabel.css('opacity', 1);
			IR.topMessageLabel.stop();
		};
		
		IR.setInfoMessage = function(message) {
			IR.topMessageLabel.css('opacity', 1);
			IR.topMessageLabel.stop();
			IR.topMessageLabel.fadeIn(1, function() {
			});
			IR.topMessageLabel.removeClass("error");
			IR.topMessageLabel.addClass("message");
			IR.topMessageLabel.html(message);
		};
		
		IR.fadeInfoMessage = function(message) {
			IR.topMessageLabel.stop();
			IR.topMessageLabel.fadeOut(3000, function() {
				IR.clearErrorMessage();
				IR.topMessageLabel.fadeIn(500, function() {
					
				});
			});
		};
		
		IR.checkNotNil = function(selector) {
			var input = $(selector);
			var val = input.val();
			if (!val) {
				input.addClass("inputError");
			} else if (input.attr("id") == "issueType" && val == IR.selectOptionText) {
				input.addClass("inputError");
			}
		};
		
		IR.clearErrorIndicators = function() {
			$(".inputError").removeClass("inputError");
			IR.clearErrorMessage();
			IR.deviceLocationEntryOptionLabel.removeClass("error");
		};
		
		IR.initialiseFromDatabase = function() {
			var currentIssueKey = $("#currentIssueKeyContext").val();
			var savingIndicator = $("#saving-indicator");
			savingIndicator.show();
			var postData = $(this).serializeArray();
		    var url = AJS.contextPath() + "/rest/maprosoft-jira/latest/mj/get-issue-location-by-issue-key/" + currentIssueKey;
			$.ajax({
		        url : url,
		        cache: false,
		        type: "GET",
		        Accept : "application/json"
			}).done(function(response, textStatus, jqXHR) {
				try {
					if (response == null) {
						// OK - not yet saved
					} else if (response.errorMessage) {
						IR.setErrorMessage(response.errorMessage);
					} else {
						$("#addressLine1").val(response.line1);
						$("#addressLine2").val(response.line2);
						$("#suburb").val(response.suburb);
						$("#state").val(response.state);
						$("#country").val(response.country);
						if (response.latitude && response.longitude) {
							IR.setLatLngInputs(response.latitude, response.longitude);
							if (IR.moveMapMarker) {
								IR.moveMapMarkerToReflectInputs();
							}
							IR.positionSetManually = true;
						}
						IR.setOptionByName(response.locationType);
					}
				} catch (e) {
					alert(e);
				}
			}).fail(function(jqXHR, textStatus, errorThrown) {
				IR.setErrorMessage(textStatus + ": " + errorThrown);
			}).always(function(jqXHR, textStatus, errorThrown) {
				savingIndicator.hide();
			});
		};
		
		IR.handleSubmitRequest = function(event) {
			var savingIndicator = $("#saving-indicator");
			try {
				event.preventDefault();
				IR.clearErrorIndicators();
//				var mandatoryInputs = $("[requirement='mandatory']");
//				for (var i = 0; i < mandatoryInputs.length; i++) {
//					var formInput = $("#" + mandatoryInputs[i].id);
//					var isVisible = formInput.is(":visible");
//					if (isVisible) {
//						IR.checkNotNil(formInput);
//					}
//				}
				var belongingInputs = $("[belongsTo]");
				for (var i = 0; i < belongingInputs.length; i++) {
					var belongingInput = belongingInputs[i];
					var belongsToId = belongingInput.attributes["belongsTo"].value;
					var belongInputsSelector = "#" + belongingInput.id + " .input"
					if ($("#" + belongsToId).is(':checked')) {
						IR.checkNotNil($(belongInputsSelector));
					} else {
						$(belongInputsSelector).removeClass("inputError");
					}
					
				}
				// Special case: check for the device location
				if (IR.deviceLocationEntryOption.is(':checked')) {
					if (!IR.lastGeoResult) {
						IR.deviceLocationEntryOptionLabel.addClass("error");
					}
				}

				var hasErrors = $(".error").length > 0 || $(".inputError").length > 0;
				if (hasErrors) {
					IR.setErrorMessage("Please fill in the missing information.");
				}
				
				// Note: after here error handling has to include custom error message setting.
				
				if (!hasErrors) {
					window.onbeforeunload = null;
					
//					if (IR.deviceLocationEntryOption.prop('checked')) {
//						if (IR.lastGeoResult.deviceProvided) {
//							$("#latitudeInput").attr("value", IR.lastGeoResult.latitude);
//							$("#longitudeInput").attr("value", IR.lastGeoResult.longitude);
//							var locationInfo = {
//								locationType: "device",
//								latitude: IR.lastGeoResult.latitude,
//								longitude: IR.lastGeoResult.longitude
//							}
//						} else {
//							IR.setErrorMessage("Your current location can not be determined - use the map or enter an address.");
//							hasErrors = true;
//						}
//					} else if (IR.mapLocationEntryOption.prop('checked')) {
//						var pos = IR.getMapMarkerCoordinates();
//						IR.setLatLngInputs(pos.latitude, pos.longitude);
//						var locationInfo = {
//							locationType: "map",
//							latitude: pos.latitude,
//							longitude: pos.longitude
//						}
//					} else if (IR.addressLocationEntryOption.prop('checked')) {
//						var line1 = $("#addressLine1").val();
//						var locationInfo = {
//							locationType: "address",
//							line1: $("#addressLine1").val(),
//							line2: $("#addressLine2").val(),
//							suburb: $("#suburb").val(),
//							state: $("#state").val(),
//							country: $("#country").val()
//						}
//					} else {
//						
//					}
					
					
					
					if (IR.mapLocationEntryOption.prop('checked')) {
						var locationType = "map";
					} else if (IR.deviceLocationEntryOption.prop('checked') && IR.lastGeoResult.deviceProvided) {
						var locationType = "device";
					} else if (IR.addressLocationEntryOption.prop('checked')) {
						var locationType = "address";
					} else {
						var locationType = "map";
					}
					
					
					
					var pos = IR.getMapMarkerCoordinates();
					var locationInfo = {
						locationType: locationType,
						latitude: pos.latitude,
						longitude: pos.longitude,
						line1: $("#addressLine1").val(),
						line2: $("#addressLine2").val(),
						suburb: $("#suburb").val(),
						state: $("#state").val(),
						country: $("#country").val()
					}
					
					
				}
				
				if (hasErrors) {
					// do nothing
				} else {
					var currentIssueId = $("#currentIssueIdContext").val();
					var currentIssueKey = $("#currentIssueKeyContext").val();
					locationInfo.issueId = currentIssueId;
					locationInfo.issueKey = currentIssueKey;

					savingIndicator.show();
					var postData = $(this).serializeArray();
				    var formURL = AJS.contextPath() + "/rest/maprosoft-jira/latest/mj/save-issue-location";
				    var locationInfoJson = JSON.stringify(locationInfo);
				    
				    // $('#footer-comment-button')[0].click();
				    //$("#comment").val("Location: " + locationInfoJson);
				    
					$.ajax({
				        url : formURL,
				        cache: false,
				        type: "POST",
				        dataType: "json",
				        Accept : "application/json",
				        contentType: "application/json",
				        data : locationInfoJson
					}).done(function(response, textStatus, jqXHR) {
						try {
							if (response == null) {
								IR.setErrorMessage("No response");
							} else if (response.errorMessage) {
								IR.setErrorMessage(response.errorMessage);
							} else {
								IR.handleIssueSubmittedSuccessfuly();
							}
//				        	var responseMessage = data.trim();
//				        	var errorMessageToken = "ErrorMessage=";
//				        	var errorMessageTokenIndex = responseMessage.indexOf(errorMessageToken);
//				        	if (errorMessageTokenIndex >= 0) {
//				        		var error = responseMessage.substring(errorMessageToken.length);
//				        		error = error.replace("\n", ". ").replace(".. ", ". ");
//				        		IR.setErrorMessage(error);
//				        	} else {
//					        	IR.handleIssueSubmittedSuccessfuly();
//				        	}
						} catch (e) {
							alert(e);
						}
					}).fail(function(jqXHR, textStatus, errorThrown) {
						if (jqXHR.status == 401) {
							var logInLink = "<a href='" + window.location.href + "'>log in</a>";
							var htmlFormat = true;
							IR.setErrorMessage("Oops, you need to " + logInLink + " again.", htmlFormat);
						} else {
							IR.setErrorMessage(textStatus + ": " + errorThrown);
						}
					}).always(function(jqXHR, textStatus, errorThrown) {
						savingIndicator.hide();
					});
				}
			} catch (e) {
				savingIndicator.hide();
				IR.setErrorMessage(e);
			}
			
//			window.scrollTo(0, 0);
//			setTimeout("document.IR.focusOnFirstError()", 1000);
			
			//event.unbind(); //unbind. to stop multiple form submit
		};
		
		IR.focusOnFirstError = function(keepErrorsOnNextFocus) {
			IR.clearErrorsOnNextFocus = false;
			IR.inputErrorWithLowestTabIndex = null;
			IR.lowestInputIndex = 1000;
			IR.focusInfo = null;
			$(".inputError").each(function() {
				var inputIndex = $(this).attr("inputIndex");
				if (inputIndex) {
					inputIndex = Number(inputIndex);
					if (!IR.focusInfo || inputIndex < IR.focusInfo.lowestInputIndex) {
						IR.focusInfo = {lowestInputIndex: inputIndex, item: $(this)};
					}
				}
			});
			if (IR.focusInfo) {
				IR.focusInfo.item.focus();
			}
			IR.clearErrorsOnNextFocus = true;
		};
		
		IR.handleIssueSubmittedSuccessfuly = function() {
//			IR.setInfoMessage("Issue submitted - thank you.");
//        	IR.disableSubmit();
//			IR.issueReportForm.hide();
//        	var maprosoftIssueReportPanelHeight = IR.maprosoftIssueReportPanel.height();
//        	var windowHeight = $(window).height();
//        	var newTopMargin = Math.round((windowHeight - maprosoftIssueReportPanelHeight) / 2);
//        	IR.maprosoftIssueReportPanel.animate({marginTop: newTopMargin + "px"}, 1000);
			
			IR.setInfoMessage("Location saved.");
			IR.fadeInfoMessage();
		}
		
		IR.photoSelectButton.click(function(event) {
			document.getElementById('photoUploadSelector').click();
			event.preventDefault();
		});
		
		$("#loadButton").click(function(e) {
			e.preventDefault();
			IR.initialiseFromDatabase();
		});
		
		IR.submitButton.click(function(event) {
			IR.handleSubmitRequest(event)
		});
		
		//IR.issueReportForm.submit(IR.handleSubmitRequest);
		
		
		// Device location (see https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation)...
		
		IR.selectCurrentLocationButton.click(function(e) {
			if (!IR) {
				var IR = document.IR;
			}
			e.preventDefault();
			IR.showMap();
			IR.updateMapToLastGeoResult();
		});
		
		var geolocationAvailable = "geolocation" in navigator;
		if (geolocationAvailable) {
			IR.handlePositionError = function(error) {
				if (!IR) {
					var IR = document.IR;
				}
				IR.devicePositionSuccessInfo.addClass("hiddenComponent");
				IR.devicePositionErrorInfo.removeClass("hiddenComponent");
				
				var IR = document.IR;
				if (IR.lastGeoResult) {
					IR.error = "(Update error: " + error.message + ")";
				} else {
					IR.error = "(" + error.message + ")";
				}
				$("#deviceLocationErrorMessage").text(IR.error);
				$("#deviceLocationErrorMessage").show();
				$("#devicePositionResult").fadeTo(1.0, 500);
			};
			IR.handleGeoSuccess = function(position) {
				if (!IR) {
					var IR = document.IR;
				}
				IR.devicePositionSuccessInfo.removeClass("hiddenComponent");
				IR.devicePositionErrorInfo.addClass("hiddenComponent");
				
				var IR = document.IR;
				if (IR.debugging) {
					console.log("Handling new geo result (" + position.coords.latitude + ", " + position.coords.longitude + ")...");
				}
				IR.lastGeoResult = {
						deviceProvided: true,
						accuracy: position.coords.accuracy,
						latitude: position.coords.latitude,
						longitude: position.coords.longitude,
						suggestedZoom: 18,
						swLatitude: null,
						swLongitude: null,
						neLatitude: null,
						neLongitude: null
				};
				
				$("#deviceLocationErrorMessage").text("");
				
				$("#devicePositionCapturedMessage").show();
				if (IR.showPositionReportDetails) {
					$("#deviceLat").text(new Number(IR.lastGeoResult.latitude).toFixed(4));
					$("#deviceLng").text(new Number(IR.lastGeoResult.longitude).toFixed(4));
					$("#deviceLocationAccuracy").text("(accuracy " + new Number(IR.lastGeoResult.accuracy).toFixed(1) + " metres)");
					if (position.coords.accuracy > 50) {
						$("#deviceLocationAccuracy").addClass("error");
					} else {
						$("#deviceLocationAccuracy").removeClass("error");
					}
				}
				$("#devicePositionResult").fadeTo(1.0, 500);
				
//				if (!IR.positionSetManually) {
//					if (IR.mapInitialised) {
//						try {
//							if (!IR.mapUpdatedToGeoResult) {
//								IR.updateMapToLastGeoResult();
//								IR.mapUpdatedToGeoResult = true;
//							}
//						} catch (e) {
//							console.log("Error: " + e);
//						}
//					} else {
//						// This is OK - the map API loads dynamically. The move will occur
//						// after the load completes.
//						//console.log("Map API not loaded.");
//					}
//				}
			};
			var geoOptions = {
				enableHighAccuracy: true, 
				maximumAge: 30000, 
				timeout: 27000
			};
			IR.wpid = navigator.geolocation.watchPosition(IR.handleGeoSuccess, IR.handlePositionError, geoOptions);
		} else {
			if (deviceLocationEntryOption.prop('checked')) {
				IR.setOption(IR.mapOptionIndex);
				mapLocationEntryOption.prop('checked', true);
			}
			deviceLocationEntryOption.attr('disabled', 'disabled');
		}
		
		IR.setLatLngInputs = function(latitude, longitude) {
			$("#latitudeInput").attr("value", latitude);
			$("#longitudeInput").attr("value", longitude);
		};
		
		IR.getLatLngInputs = function() {
			return {
				latitude: $("#latitudeInput").attr("value"),
				longitude: $("#longitudeInput").attr("value")
			}
		}
		
		// Map...
		
		IR.geocodePosition = function(pos) {
		   geocoder = new google.maps.Geocoder();
		   geocoder.geocode({
		        latLng: pos
		    }, function(results, status) {
		            if (status == google.maps.GeocoderStatus.OK) {
		                //$("#mapSearchInput").val(results[0].formatted_address);
		                //$("#mapErrorMsg").hide(100);
		            } else {
		                //$("#mapErrorMsg").html('Cannot determine address at this location.'+status).show(100);
		            }
		        }
		    );
		};
		
		window.initialiseMap = function() {
			try {
				if (!IR.mapInitialised) {
					if (IR.debugging) {
						console.log("Initialising map...");
					}
					document.IR.showMap = function() {
						IR.mapLocationEntryOption.prop('checked', true);
						IR.setOption(IR.mapOptionIndex);
					};
					
					document.IR.moveMapMarkerToReflectInputs = function() {
						var latLng = IR.getLatLngInputs();
						if (latLng.latitude && latLng.longitude) {
							document.IR.moveMapMarker(latLng.latitude, latLng.longitude);
							IR.setMapZoom(16);
						}
					};
					
					document.IR.setMapExtent = function(swLat, swLng, neLat, neLng) {
						try {
							if (IR.useLeaflet) {
								var bounds = new L.LatLngBounds(
										new L.LatLng(swLat, swLng),
										new L.LatLng(neLat, neLng));
								IR.map.fitBounds(bounds);
							} else {
								IR.map.fitBounds(new google.maps.LatLngBounds(
										new google.maps.LatLng(swLat, swLng),
										new google.maps.LatLng(neLat, neLng)));
							}
						} catch (e) {
							console.log("Error: " + e);
						}
					};
					
					document.IR.setMapPosition = function(latitude, longitude) {
						try {
							if (IR.useLeaflet) {
								IR.map.panTo(new L.LatLng(latitude, longitude));
							} else {
								IR.map.panTo(new google.maps.LatLng(latitude, longitude));
							}
						} catch (e) {
							console.log("Error: " + e);
						}
					};
					
					document.IR.setMapZoom = function(zoom) {
						try {
							if (IR.useLeaflet) {
								IR.map.setZoom(zoom);
							} else {
								IR.map.setZoom(zoom);
							}
						} catch (e) {
							console.log("Error: " + e);
						}
					};
					
					document.IR.moveMapMarker = function(latitude, longitude) {
						try {
							if (IR.useLeaflet) {
								IR.marker.setLatLng(new L.LatLng(latitude, longitude));
							} else {
								IR.marker.setPosition(new google.maps.LatLng(latitude, longitude));
							}
						} catch (e) {
							console.log("Error: " + e);
						}
					};
					
					document.IR.getMapMarkerCoordinates = function() {
						try {
							if (IR.useLeaflet) {
								var pos = IR.marker.getLatLng();
								return {latitude: pos.lat, longitude: pos.lng};
							} else {
								var pos = IR.marker.getPosition();
								return {latitude: pos.lat(), longitude: pos.lng()};
							}
						} catch (e) {
							console.log("Error: " + e);
						}
					};
					
					document.IR.openInfoWindow = function() {
						try {
							if (IR.useLeaflet) {
								IR.marker.openPopup();
							} else {
								google.maps.event.trigger(IR.marker, 'click');
							}
						} catch (e) {
							console.log("Error: " + e);
						}
					};
					
					document.IR.updateMapToLastGeoResult = function() {
						var hasExtent = 
							IR.lastGeoResult.swLatitude &&
							IR.lastGeoResult.swLongitude &&
							IR.lastGeoResult.neLatitude &&
							IR.lastGeoResult.neLongitude;
						if (hasExtent) {
							IR.setMapExtent(
									IR.lastGeoResult.swLatitude, IR.lastGeoResult.swLongitude,
									IR.lastGeoResult.neLatitude, IR.lastGeoResult.neLongitude);
							IR.moveMapMarker(
									(IR.lastGeoResult.swLatitude + IR.lastGeoResult.neLatitude) / 2,
									(IR.lastGeoResult.swLongitude + IR.lastGeoResult.neLongitude) / 2);
						} else {
							IR.setMapPosition(IR.lastGeoResult.latitude, IR.lastGeoResult.longitude);
							IR.moveMapMarker(IR.lastGeoResult.latitude, IR.lastGeoResult.longitude);
							IR.setMapZoom(IR.lastGeoResult.suggestedZoom);
						}
					};
					
					document.IR.handleMarkerDragEnd = function() {
						if (IR.useLeaflet) {
							
						} else {
							//geocodePosition(document.IR.marker.getPosition());
//								var markerPosition = document.IR.marker.getPosition();
//								IR.setLatLngInputs(markerPosition.lat, markerPosition.lng);
						}
						var coords = document.IR.getMapMarkerCoordinates();
						IR.setLatLngInputs(coords.latitude, coords.longitude);
						IR.positionSetManually = true;
					};
					
					document.IR.toFullScreen = function(element) {
						//var docElement = document.documentElement;
						if (element.requestFullscreen) {
							element.requestFullscreen();
						} else if (element.msRequestFullscreen) {
							element.msRequestFullscreen();
						} else if (element.mozRequestFullScreen) {
							element.mozRequestFullScreen();
						} else if (element.webkitRequestFullScreen) {
							element.webkitRequestFullScreen();
						}
					}
				
					document.IR.fromFullScreen = function() {
						if (document.exitFullscreen) {
							document.exitFullscreen();
						} else if (document.msExitFullscreen) {
							document.msExitFullscreen();
						} else if (document.mozCancelFullScreen) {
							document.mozCancelFullScreen();
						} else if (document.webkitCancelFullScreen) {
							document.webkitCancelFullScreen();
						} else if (document.webkitExitFullscreen) {
							document.webkitExitFullscreen();
						}
					}

					document.IR.addMapFullscreenControls = function() {
						var mapLocationEntryGroup = document.getElementById("map-canvas");
						var mapElement = document.IR.map;
						var toFullscreen = $("#to-fullscreen");
						var fromFullscreen = $("#from-fullscreen");
						
						toFullscreen.click(function() {
							toFullscreen.hide();
							fromFullscreen.show();
							document.IR.toFullScreen(mapLocationEntryGroup);
						});
						fromFullscreen.click(function() {
							fromFullscreen.hide();
							toFullscreen.show();
							document.IR.fromFullScreen();
						});
						
						//alert("In addMapFullscreenControls");
						
						if (IR.useLeaflet) {
							
						} else {
							var centerControlDiv = $("#fullscreen-controls")[0];
							centerControlDiv.index = 1;
							map.controls[google.maps.ControlPosition.TOP_LEFT].push(centerControlDiv);
						}
					}
	
					// Need to make sure the initial zoom is valid - Leaflet misbehaves if not.
					var initialZoom = IR.lastGeoResult.suggestedZoom;
					if (initialZoom === null || initialZoom === undefined) {
						initialZoom = 1;
					}

					if (IR.useLeaflet) {
						var mapOptions = {
							zoom: initialZoom,
							center: L.latLng(IR.lastGeoResult.latitude, IR.lastGeoResult.longitude)
						};
						var map = L.map('map-canvas', mapOptions);
						
//							L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
//							    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//							}).addTo(map);
						L.tileLayer('http://otile{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png', {
				            attribution: '&copy; <a href="www.openstreetmap.org/copyright">OpenStreetMap</a>'
				        }).addTo(map);
						
						document.IR.markerIcon = L.icon({
						    iconUrl: IR.markerImageUrl,
						    iconSize: [32, 37],
						    iconAnchor: [0, 0],
						    popupAnchor: [16, 0]
						});
						document.IR.marker = L.marker(
								[IR.lastGeoResult.latitude, IR.lastGeoResult.longitude], {
									icon: document.IR.markerIcon,
									draggable: true});
						document.IR.marker.on('dragend', document.IR.handleMarkerDragEnd);
						document.IR.marker.addTo(map);
						document.IR.marker.bindPopup("Drag this marker to<br>the location of the issue.");
					} else {
						document.IR.infowindow = new google.maps.InfoWindow({
							content: "Drag this marker to<br>the location of the issue."
						});
						
						var mapOptions = {
								panControl: false,
							    zoomControl: true,
							    scaleControl: true,
							    zoomControlOptions: {
							        //style: google.maps.ZoomControlStyle.LARGE,
							        position: google.maps.ControlPosition.RIGHT_BOTTOM
							    },
								zoom: initialZoom,
								center: new google.maps.LatLng(IR.lastGeoResult.latitude, IR.lastGeoResult.longitude)
							};
						var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
						
						var image = {
							url: IR.markerImageUrl,
							size: new google.maps.Size(32, 37),
							origin: new google.maps.Point(0, 0),
							anchor: new google.maps.Point(16, 37)
						};
						document.IR.marker = new google.maps.Marker({
							position: map.getCenter(),
							map: map,
							icon: image,
							title: 'Issue location',
							draggable: true
						});
	
						google.maps.event.addListener(document.IR.marker, 'click', function() {
							document.IR.infowindow.open(document.IR.map, document.IR.marker);
						});
						document.IR.infowindow.open(document.IR.map, document.IR.marker);
						
						google.maps.event.addListener(document.IR.marker, 'dragend', document.IR.handleMarkerDragEnd);
//							google.maps.event.addListener(document.IR.marker, 'dragend', function() {
//								//geocodePosition(document.IR.marker.getPosition());
//								var markerPosition = document.IR.marker.getPosition();
//								IR.positionSetManually = true;
//							});
					}
					document.IR.map = map;
					
					IR.openInfoWindow();
					
					IR.addMapFullscreenControls();
					
					if (!IR.positionSetManually) {
						IR.updateMapToLastGeoResult();
					} else {
						IR.moveMapMarkerToReflectInputs();
					}
					
					IR.mapInitialised = true;
					if (IR.debugging) {
						console.log("mapInitialised.");
					}
					
					IR.updateTabIndexes();
				}
			} catch (e) {
				console.log("Error: " + e);
			}
		};
		
		IR.onLeafletLoad = function(callbackFunctionName) {
			if (window.L) {
				if (IR.debugging) {
					//console.log("Detected leaflet is loaded - calling " + callbackFunctionName + "...");
				}
				var fn = window[callbackFunctionName];
				fn();
			} else {
				setTimeout('document.IR.onLeafletLoad("' + callbackFunctionName + '")', 500);
			}
		};
		
		IR.loadMapLibraries = function() {
			if (IR.useLeaflet) {
				IR.addStylesheet('http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css');
				IR.addScript('http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js');
				IR.onLeafletLoad('initialiseMap');
				if (typeof fn === "function") {
					fn();
				}
			} else {
				IR.addScript('https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=true&' + 'callback=initialiseMap');
			}
		};

		// Network connectivity...
		
		window.addEventListener("offline", function(e) {
			IR.setErrorMessage("offline");
		}, false);
		
		window.addEventListener("online", function(e) {
			IR.clearErrorMessage();
		}, false);

		window.addEventListener("connectionerror", function(e) {
			IR.setErrorMessage("There is a connection error");
		});
		
		// Utilities...
		
		IR.addStylesheet = function(url) {
			var ss = document.createElement("link");
			ss.type = "text/css";
			ss.rel = "stylesheet";
			ss.href = url;
			document.getElementsByTagName("head")[0].appendChild(ss);
			
		};
		
		IR.addScript = function(url) {
			try {
				if (IR.debugging) {
					console.log("Loading script...");
				}
				var script = document.createElement('script');
				script.type = 'text/javascript';
				script.src = url;
				document.body.appendChild(script);
			} catch (e) {
				alert("" + e);
			}
		};
		
		IR.initialise();

});
//})(AJS.$);
