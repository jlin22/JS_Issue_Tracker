function fetchIssues() {
	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesList = document.getElementById('issuesList');
	console.log(issues);
	
	issues.innerHTML = '';
	for (var i = 0; i < issues.length; i++) {
		var id = issues[i].issueId;
		var desc = issues[i].issueDesc;
		var severity = issues[i].issueSeverity;
		var assignedTo = issues[i].issueAssignedTo;
		var status = issues[i].status;

		issuesList.innerHTML += '<div class="well">' + 
		'<h6>Issue ID: ' + id + '</h6>' +
		'<p><span class="label label-info">' + status + '</span></p>' + 
		'<h3>' + desc + '</h3>' + 
		'<p><span class="glyphicon glyphicon-user"></span>' + assignedTo + '</p>' + 
		'<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a> '+
		'<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'+
		'</div>';	
	}
}

function saveIssue(e) {
	var issueId = chance.guid();
	var issueDesc = document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueStatus = 'Open';

	var issue = {
		issueId: issueId,
		issueDesc: issueDesc,
		issueSeverity: issueSeverity,
		issueAssignedTo: issueAssignedTo,
		status: issueStatus
	};

	if (localStorage.getItem('issues') == null) {
		var issues = [];
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}
	else {
		var issues = JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues', JSON.stringify(issues));
	}

	document.getElementById('issueInputForm').reset();
	fetchIssues();
	e.preventDefault();
}

function setStatusClosed(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (var i = 0; i < issues.length; i++) {
		if (issues[i].issueId == id) {
			issues[i].status = "Closed";
		}
	}

	localStorage.setItem('issues', JSON.stringify(issues));

	fetchIssues();
}

function deleteIssue(id) {
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (var i = 0; i < issues.length; i++) {
		if (issues[i].issueId == id) 
			issues.splice(i, 1);
	}

	localStorage.setItem('issues', JSON.stringify(issues));
	fetchIssues();
}

document.getElementById('issueInputForm').addEventListener('submit', saveIssue);
