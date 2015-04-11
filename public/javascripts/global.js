// area for showing previous chat messages
var $messages = $('#messages');
// DOM Ready =============================================================
$(document).ready(function() {
    // Populate the user table on initial page load
    populateChatHistory();

});

var intervalID = setInterval(populateChatHistory, 500);

$('#inputMessage').keypress(function (e) {
    if (e.which == 13) {
        addChat(e);
        return false;
    }
});

// Functions =============================================================


// Show chat history
function populateChatHistory() {
    // jQuery AJAX call for JSON
    $.getJSON( '/chathistory', function( data ) {
        $messages.empty();
        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            var $messageBodyDiv = $('<span class="messageBody">')
                .text(this.text);
            var $messageDiv = $('<li class="message"/>')
                .append($messageBodyDiv);
          $messages.append($messageDiv);
        });
        $messages[0].scrollTop = $messages[0].scrollHeight;
    });
};
/*
function getChatHistoryPage(currPage, clickedLink) {

    // This would probably be an AJAX call in a real app.
    // We're just going to fake it here and do some DOM
    // Manipulation.

    // Make sure currPage is an int
    currPage = parseInt(currPage, 10);

    // If it was the Next link
    if (clickedLink === "next") {
        currPage++;
    }
    // Otherwise if it was the Previous link
    else if (clickedLink === "prev") {
        // lowest we want to go is 1
        if (currPage > 0) {
            currPage--;
        }
    }
    // Otherwise something went wrong
    else {
        // Actual error checking would go here!
        return false;
    }

    // Update our DOM elements
    // Empty content string
    var content = '';
    // jQuery AJAX call for JSON
    $.getJSON( '/chathistory', function( data ) {

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            content += '<p>';
            content += this.text;
            content += '</p>'
        });

        // Inject the whole content string into our existing HTML table
        $('#chatHistory').html(content);
    });
    //$('#contentDiv').html('This is Page ' + currPage);
    $('#chatHistory').attr('data-page', currPage);
}
*/
// Add new message
function addChat(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    if($('#inputMessage').val() === '') { errorCount++; }

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newChat = {
            'text': $('#inputMessage').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newChat,
            url: '/chathistory',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#inputMessage').val('');

                // Update the table
                populateChatHistory();

            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error: ' + response.msg);

            }
        });
    }
    else {
        // If errorCount is more than 0, error out
        alert('Please fill in all fields');
        return false;
    }
};
