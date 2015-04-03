// Userlist data array for filling in info box
var chatHistoryData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateChatHistory();

});

// Add Chat button click
$('#btnChatSubmit').on('click', addChat);

// Functions =============================================================

// Show data
function populateChatHistory() {

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
        $('#chathistory').html(content);
    });
};


// Add User
function addChat(event) {
    event.preventDefault();

    // Super basic validation - increase errorCount variable if any fields are blank
    var errorCount = 0;
    $('#addchat input').each(function(index, val) {
        if($(this).val() === '') { errorCount++; }
    });

    // Check and make sure errorCount's still at zero
    if(errorCount === 0) {

        // If it is, compile all user info into one object
        var newUser = {
            'text': $('#addchat fieldset input#newChat').val()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/chathistory',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                // Clear the form inputs
                $('#addchat fieldset input').val('');

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
