var activePage = GetURLParameter('activePage');
if (activePage == null){ activePage = 0; }

function disableAllButtons() {
  $("#startButton").prop('disabled',true);;
  $("#stopButton").prop('disabled',true);;
  $("#restartButton").prop('disabled',true);;
  $("#enableButton").prop('disabled',true);;
  $("#disableButton").prop('disabled',true);;
  $("#deleteResyncButton").prop('disabled',true);;
  $("#shutdownButton").prop('disabled',true);;
  $("#rebootButton").prop('disabled',true);;
}

function startService() {
  disableAllButtons();
  $.getJSON('startservice', function(data) {
    if (data.return_code === '0') {
      alert('Service successfully started.\nPlease wait for 10 seconds and click the button below to refresh the page.');
    } else {
      alert('Failed to start service.');
    }
  })
  .fail(function() {
    alert('Failed to start service.');
  })
  .always(function() {
    location.reload(true);
  });
}

function stopService() {
  disableAllButtons();
  $.getJSON('stopservice', function(data) {
    if (data.return_code === '0') {
      alert('Service successfully stopped.\nPlease wait for 10 seconds and click the button below to refresh the page.');
      location.reload(true);
    } else {
      alert('Failed to stop service.');
    }
  })
  .fail(function() {
    alert('Failed to stop service.');
  })
  .always(function() {
    location.reload(true);
  });
}

function restartService() {
  disableAllButtons();
  $.getJSON('restartservice', function(data) {
    if (data.return_code === '0') {
      alert('Service successfully restarted.\nPlease wait for 10 seconds and click the button below to refresh the page.');
    } else {
      alert('Failed to restart service.');
    }
  })
  .fail(function() {
    alert('Failed to restart service.');
  })
  .always(function() {
    location.reload(true);
  });
}

function enableService() {
  disableAllButtons();
  $.getJSON('enableservice', function(data) {
    if (data.return_code === '0') {
      alert('Service successfully enabled.\nPlease wait for 10 seconds and click the button below to refresh the page.');
      location.reload(true);
    } else {
      alert('Failed to enable service.');
    }
  })
  .fail(function() {
    alert('Failed to enable service.');
  })
  .always(function() {
    location.reload(true);
  });
}

function disableService() {
  disableAllButtons();
  $.getJSON('disableservice', function(data) {
    if (data.return_code === '0') {
      alert('Service successfully disabled.\nPlease wait for 10 seconds and click the button below to refresh the page.');
      location.reload(true);
    } else {
      alert('Failed to disable service.');
    }
  })
  .fail(function() {
    alert('Failed to disable service.');
  })
  .always(function() {
    location.reload(true);
  });
}

function deleteResync() {
  var r = confirm('Are you sure you want to delete the blockchain data and resync from scratch?\nIt may take up to 24 hours!!');
  if (r == true) {
    disableAllButtons();
    $.getJSON('deleteresync', function(data) {
      if (data.return_code === '0') {
        alert('blockchain deleted and resync started.\nPlease wait for 10 seconds and click the button below to refresh the page.');
      } else {
        alert('Failed to delete blockchain and resync.');
      }
    })
    .fail(function() {
      alert('Failed to delete blockchain and resync.');
    })
    .always(function() {
      location.reload(true);
    });
  } else {
    location.reload(true);
  }
}

function shutdown() {
  var r = confirm('Are you sure you want to shutdown monerbox?');
  if (r == true) {
    disableAllButtons();
    $.getJSON('shutdown', function(data) {
      // server should not return anything
      alert('Failed to shutdown monerobox.');
      location.reload(true);
    })
    .fail(function() {
      alert('monerobox is shutting down, you may get error message from the browser.');
    });
  } else {
    location.reload(true);
  }
}

function reboot() {
  var r = confirm('Are you sure you want to reboot monerbox?');
  if (r == true) {
    disableAllButtons();
    $.getJSON('reboot', function(data) {
      // server should not return anything
      alert('Failed to reboot monerobox.');
      location.reload(true);
    })
    .fail(function() {
      alert('monerobox is rebooting, please wait for 2 minutes and refresh the page.');
    });
  } else {
    location.reload(true);
  }
}

$(function () {
  options = '<p>'+
              'No option available for this addon'+
            '</p>'
  $(options).insertBefore("#optionsInsertionPoint")

  $.getJSON('dynamic.json', function(data) {
    // Concatenate dynamic.json and static.json into data variable
    $.extend(data, getData('static'));
    
    tmp  = Badge(data.monerodActive, "=='active'", "Running", "success") + Badge(data.monerodActive, "!='active'", "Stopped", "danger");
    tmp2 = Badge(data.monerodEnabled, "=='enabled'", "Enabled", "success") + Badge(data.monerodEnabled, "!='enabled'", "Disabled", "danger");
    $("#monerodActive").html(tmp)
    $("#monerodEnabled").html(tmp2)
  })
});
