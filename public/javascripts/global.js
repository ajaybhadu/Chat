// Userlist data array for filling in info box
var chatHistoryData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateChatHistory();

});

var intervalID = setInterval(populateChatHistory, 100);

$('#newChat').keypress(function (e) {
    if (e.which == 13) {
        addChat(e);
        return false;
    }
});

// Add Chat button click
$('#btnChatSubmit').on('click', addChat);
/*
$('#pagination').on('click', 'a.pagelink', function(e) {

        e.preventDefault();

        // Get the current data-page attribute
        var currPage = $('#chathistory').attr('data-page');
        var clickedLink = $(this).attr('data-linktype');

        // Change Content
        getChatHistoryPage(currPage, clickedLink);

});*/
/*
$('#chathistory').on('scroll', function(e) {
    console.log($('#chathistory').height());
    console.log($('#chathistory').scrollTop() + $('#addchat').height());
});*/
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
        $('#chathistory').html(content);
    });
    //$('#contentDiv').html('This is Page ' + currPage);
    $('#chathistory').attr('data-page', currPage);
}

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
