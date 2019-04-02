var activePage = GetURLParameter('activePage');
if (activePage == null){ activePage = 0; }

function disableAllButtons() {
  $("#stopMonerodButton").prop('disabled',true);;
  $("#startMonerodWithoutTorButton").prop('disabled',true);;
  $("#startMonerodWithTorButton").prop('disabled',true);;
  $("#shutdownButton").prop('disabled',true);;
}

function startService(type, tor) {
  disableAllButtons();
  switch (type) {
    case 'monero':
      let method = 'startmonerodwithouttor';
      if (tor == "true") {
	method = 'startmonerodwithtor';
      }

      $.getJSON(method, function(data) {
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
    break;

    case 'litecoin':
      alert('service NOT supported.');
      location.reload(true);
    break;

    case 'bitcoin':
      alert('service NOT supported.');
      location.reload(true);
    break;

    default:
      alert('service NOT supported.');
      location.reload(true);
  }

}

function stopMonerod() {
  disableAllButtons();
  $.getJSON('stopmonerod', function(data) {
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

$(function () {
  options = '<p>'+
              'No option available for this addon'+
            '</p>'
  $(options).insertBefore("#optionsInsertionPoint")

  $.getJSON('dynamic.json', function(data) {
    // Concatenate dynamic.json and static.json into data variable
    $.extend(data, getData('static'));
    
    monerodStatus  = Badge(data.monerodActive, "!='2'", "Running", "success") + Badge(data.monerodActive, "=='2'", "Stopped", "danger");
    monerodTor  = Badge(data.monerodTor, "=='true'", "True", "success") + Badge(data.monerodTor, "!='true'", "False", "success");
    $("#monerodActive").html(monerodStatus)
    $("#monerodTor").html(monerodTor)
  })
});
