if (window.gform) {
  var blacklist_full = null
  var blacklist_part = null
  jQuery.getJSON("https://raw.githubusercontent.com/searchstation/spam-defenders/main/blacklist_full.json", function(json_full) {
    blacklist_full = json_full
  })
  jQuery.getJSON("https://raw.githubusercontent.com/searchstation/spam-defenders/main/blacklist_part.json", function(json_part) {
    blacklist_part = json_part
  })
  
  gform.addAction( 'gform_input_change', function( elem, formId, fieldId ) {

      let fail = false

      const check = elem.value

            for (var i = 0; i < blacklist_part.length; i++) {
              let result = check.indexOf(blacklist_part[i])
              if (result > -1) {
                fail = true
                break;
              }
            }
      
            if (blacklist_full.includes(check) || fail === true) {
              jQuery("#gform_"+formId+"").empty()
              jQuery("#gform_wrapper_"+formId+"").html('<div class="callout warning"><h3>Suspicious Activity Detected</h3><p class="mb10">Our server has detected suspicious activity. Your IP address has been reported to our system administrators. If you believe this was an error, please refresh this page and try again.</p></div>')
            }
        }, 10, 3 );
          
}

