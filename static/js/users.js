$(document).ready(
    function() {
        const searchBar = $('#user-search-bar');
        const searchArea = $('#' + searchBar.data('user-search-area'));
        const followButton = $('.follow-button');
        const blockButton = $('.block-button');
        const reportButton = $('.report-button');
        const sendRequestButton = $('.request-button');
        const acceptRequestButton = $('.request-accept');
        const rejectRequestButton = $('.request-reject');

        $('#'+searchBar.data('results-id')).hide()
        function searchUsers() {
            const search_results = $(this).data('results-id');
            const text = $(this).val();
            if (text.length > 0) {
                $.ajax({
                    url: searchUsersUrl,
                    type: 'GET',
                    data: {
                        'q': text
                    },
                    success: function(response) {
                        let htmlText = '';
                        let results = response['results'];
                        if (results.length === 0) {
                            htmlText = '<div class="search-result">\n' +
                                '            <div class="right-bar-content-text">\n' +
                                '                <div class="right-bar-content-text-name text-color">No results found</div>\n' +
                                '            </div>\n' +
                                '        </div>'
                        }

                        for (let i = 0; i < results.length; i++) {
                            let result = results[i];
                            let profileUrl = profilePageUrl.replace('-username-', result['username']);
                            htmlText += '<a href="'+ profileUrl +'">' +
                            '   <div class="dis-row gap-10"> \n' +
                            '       <div class="small-avatar"> \n' +
                            '           <img class="avatar" src="'+  result['profile_picture'] +'" alt="Avatar">' +
                            '        </div>' +
                            '        <div class="dis-col">' +
                            '            <div class="fullname text-color">' + result['fullname'] + '</div>' +
                            '            <div class="username text-color">@' + result['username'] + '</div>' +
                            '        </div>' +
                            '    </div>' +
                            '</a>'
                        }
                        $('#' + search_results).html(htmlText).show();

                    }
                });
            }
            else {
                $('#' + search_results).hide();
            }
        }

        function followUser() {
            let username = $(this).data('username');
            let following = $(this).hasClass('following');
            let url;
            if (following===false){
                url = followUserUrl.replace('-username-', username);
            }
            else {
                url = unfollowUserUrl.replace('-username-', username);
            }
            $.ajax({
                url: url,
                type: 'GET',
                success: function(response) {
                    if (response['success']) {
                        location.reload()
                    }
                }
            });
        }

        function sendRequest() {
            let username = $(this).data('username');
            let url
            if ($(this).hasClass('requested')){
                url = cancelFollowRequestUrl.replace('-username-', username);
            }
            else {
                url = sendFollowRequestUrl.replace('-username-', username);
            }
            $.ajax({
                url: url,
                type: 'GET',
                success: function(response) {
                    if (response['success']) {
                        location.reload()
                    }
                }
            });
        }

        function reportUser() {
            let reason = prompt("Why you are reporting this user?");
            if (reason !== null) {
                let username = $(this).data('username');
                let csrftoken = $('input[name=csrfmiddlewaretoken]').val()
                let url = reportUserUrl.replace('-username-', username)
                $.ajax({
                    url: url,
                    type: 'POST',
                    data: {
                        'csrfmiddlewaretoken': csrftoken,
                        'reason': reason
                    },
                    success: function(response) {
                        if (response['success']) {
                            alert('User reported successfully');
                        }
                    }
                });
            }

        }

        function blockUser(){
            let username = $(this).data('username');
            let blocked = $(this).hasClass('blocked');
            let url;
            if (blocked===false){
                url = blockUserUrl.replace('-username-', username);
            }
            else {
                url = unblockUserUrl.replace('-username-', username);
            }
            $.ajax({
                url: url,
                type: 'GET',
                success: function(response) {
                    if (response['success']) {
                        location.reload()
                    }
                }
            });
        }

        function respondRequest() {
            let username = $(this).data('username');
            let accept = $(this).hasClass('request-accept');
            let url = respondFollowRequestUrl.replace('-username-', username);
            if (accept===true){
                url = url.replace('-action-', 'accept');
            }
            else {
                url = url.replace('-action-', 'reject');
            }
            $.ajax({
                url: url,
                type: 'GET',
                success: function(response) {
                    if (response['success']) {
                        location.reload()
                    }
                }
            });
        }

        searchBar.on(
            'input',
            searchUsers
        )

        searchArea.focusout(
            function() {
                const search_results = $(this).data('results-id');
                $('#' + search_results).hide();
            }
        )

        followButton.click(
            followUser
        )

        reportButton.click(
            reportUser
        )

        blockButton.click(
            blockUser
        )

        sendRequestButton.click(
            sendRequest
        )

        acceptRequestButton.click(
            respondRequest
        )

        rejectRequestButton.click(
            respondRequest
        )
    }
)