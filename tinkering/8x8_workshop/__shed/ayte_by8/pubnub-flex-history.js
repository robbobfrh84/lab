/* USE PUBNUB SDK Version >= 3.7.14
 *
 * PubNub History API terminology follows reverse-chronology timeseries, start is newer than end
 *
 * start is the more recent / newer time
 * end is the less recent / older time
 *
 * if only start xor end provided, not both:
 * reverse : true means go forwards in time
 * reverse : false means go backwards in time
 *
 * pubnub_flex_history shim results objects are standard-chronology timeseries, start is older than end
 *
 * This library works more properly in PubNub Javascript SDK >= 3.7.14 which added a new
 * parameter string_message_timetoken, that ensures no rounding error in the JSON for our long
 * timetokens in history message payloads by making them all strings. This rounding problem
 * only occurs in Javascript for browsers.
 *
 * This library wrapper/shim is *NOT* officially supported by PubNub, Inc. as an official
 * SDK, but feel free to email me if you find any issues: jasdeep@pubnub.com.
 *
 */
var pubnub_flex_history = function (args1, completed) {

    var self = this;

    var result = {
        count: 0,
        start: 0,
        end: 0,
        channel: args1.channel,
        messages: [],
        operation: "undefined",
        operationValue: "undefined"
    };

    result.operation = (args1.hasOwnProperty('last') ? "last" : result.operation);
    result.operation = (args1.hasOwnProperty('since') ? "since" : result.operation);
    result.operation = (args1.hasOwnProperty('before') ? "before" : result.operation);
    result.operation = (args1.hasOwnProperty('upto') ? "upto" : result.operation);
    result.operation = (args1.hasOwnProperty('between') ? "between" : result.operation);
    result.operation = (args1.hasOwnProperty('at') ? "at" : result.operation);
    result.operation = (args1.hasOwnProperty('getrange') ? "getrange" : result.operation);
	result.operation = (args1.hasOwnProperty('getall') ? "getall" : result.operation);

    if (!args1.hasOwnProperty('channel')) {
        console.error("ERROR: pubnub_flex_history requires a channel specified in options object");
        result.channel = null;
        result.error = true;
        result.errorMessage = "channel not specified";
        completed(result);
        return;
    }

    // Default History Query Params (string_message_token: true is new as of 3.7.14)
    var params = {
        channel: args1.channel,
        include_token: true,
        string_message_token: true
    };

    //Convert Epoch timestamps to Timetokens, convert everything back to string
    function checkTimetoken(t) {
        if (t.toString().length < 12) {
            return (parseInt(t) * 10000000).toString();
        }
        else {
            return t.toString();
        }
    }

    // timetoken less than comparison
    function tt_lt(a, b) {

        //console.log("lt", a,b);

        if (a === 0) {
            return true;
        }

        if (b === 0) {
            return false;
        }

        if (a.length === b.length) {
            for (idx in a) {
                if (parseInt(a[idx]) < parseInt(b[idx])) {
                    return true;
                }
            }
            return false;
        }
        else {
            console.error("timetokens weren't of the same length", a.length, b.length);
        }
    }

    // timetoken greater than comparison
    function tt_gt(a,b) {

        //console.log("gt", a,b);

        if (b === 0) {
            return true;
        }

        if (a === 0) {
            return false;
        }

        if (a.length === b.length) {
            for (idx in a) {
                if (parseInt(a[idx]) > parseInt(b[idx])) {
                    return true;
                }
            }
            return false;
        }
        else {
            console.error("timetokens weren't of the same length", a.length, b.length);
        }
    }

    // Get Page from history API
    function getPage(args2, callback) {
        args2.callback = function (m) {
            //console.log("getPageResult", m);
            //console.log(parseInt(m[2]) - parseInt(m[1]));
            //console.log("");
            callback({
                start: m[1],
                end: m[2],
                count: m[0].length,
                messages: m[0]
            });
        };

        args2.error = function(e) {
            callback({
                error: true,
                errorObject: e,
                errorMessage: e.toString()
            });
        };

        self.history(args2);
    }



    //*****************************************
    // Process Arguments
    //*****************************************


    // Most recent (last: count)
    if (args1.hasOwnProperty('last')) {

        result.operationValue = args1.last;
        // go backwards in time
        params.reverse = false;

        // If retrieving less than 100
        if (parseInt(args1.last) <= 100) {
            params.count = args1.last;
            getPage(params, function (r) {
                for (var attrname in r) {
                    result[attrname] = r[attrname];
                }
                completed(result);
            });
        }

        // If retrieving more than 100, page through
        if (parseInt(args1.last) > 100) {

            function lastNextPage() {
                params.count = (args1.last - result.count >= 100 ? 100 : args1.last - result.count );

                getPage(params, function (r) {

                    result.count += r.count;
                    Array.prototype.push.apply(result.messages, r.messages);

                    // each page will be an earlier start timetoken
                    if (result.start === 0 || tt_lt(r.start, result.start)) {
                        result.start = r.start;
                    }

                    // always is > the first time, but subsequent pages will be less
                    if (tt_gt(r.end, result.end)) {
                        result.end = r.end;
                    }

                    // continue paging if message count < total desired
                    if (result.count < args1.last) {
                        params.end = r.start;  // since going in reverse order
                        lastNextPage();
                    }
                    else {

                        completed(result);
                    }
                });
            }

            lastNextPage();

        }
    }
    // Most recent before timetoken (before: timetoken or epoch) + num_messages
    else if (args1.hasOwnProperty('before')) {

        result.operationValue = {before: args1.before, msgcount: args1.msgcount};

        params.start = checkTimetoken(args1.before);
        // go backwards in time
        params.reverse = false;

        // If retrieving less than 100
        if (parseInt(args1.msgcount) <= 100) {
            params.count = args1.msgcount;
            getPage(params, function (r) {
                for (var attrname in r) {
                    result[attrname] = r[attrname];
                }
                completed(result);
            });
        }

        // If retrieving more than 100, page through
        if (parseInt(args1.msgcount) > 100) {

            params.count = (args1.msgcount - result.count >= 100 ? 100 : args1.msgcount - result.count );

            function beforeNextPage() {

                getPage(params, function (r) {

                    result.count += r.count;
                    Array.prototype.push.apply(result.messages, r.messages);

                    // each page will be an earlier start timetoken
                    if (result.start === 0 || tt_lt(r.start, result.start)) {
                        result.start = r.start;
                    }

                    // always is > the first time, but subsequent pages will be less
                    if (tt_gt(r.end, result.end)) {
                        result.end = r.end;
                    }

                    // continue paging if message count < total desired (args1.msgcount)
                    if (result.count < args1.msgcount) {
                        params.start = r.end;
                        beforeNextPage();
                    }
                    else {
                        completed(result);
                    }
                });
            }

            beforeNextPage();
        }
    }
    // Since timetoken (since: timetoken or epoch)
    else if (args1.hasOwnProperty('since')) {

        result.operationValue = args1.since;

        params.start = checkTimetoken(args1.since);
        // go forwards in time from start
        params.reverse = true;

        function sinceNextPage() {

            getPage(params, function (r) {

                result.count += r.count;
                Array.prototype.push.apply(result.messages, r.messages);

                // each page will be an earlier start timetoken
                if (result.start === 0 || tt_lt(r.start, result.start)) {
                    result.start = r.start;
                }

                // always is > the first time, but subsequent pages will be less
                if (tt_gt(r.end, result.end)) {
                    result.end = r.end;
                }

                // continue paging if returns whole page
                if (r.count === 100) {
                    params.start = r.end;
                    sinceNextPage();
                }
                else {
                    completed(result);
                }
            });
        }

        sinceNextPage();
    }
    // Upto a timetoken (since: timetoken or epoch) [from first message in channel]
    else if (args1.hasOwnProperty('upto')) {

        result.operationValue = args1.upto;

        params.end = checkTimetoken(args1.upto);
        // go forwards in time from end
        params.reverse = true;

        function uptoNextPage() {

            getPage(params, function (r) {

                result.count += r.count;
                Array.prototype.push.apply(result.messages, r.messages);

                // each page will be an earlier start timetoken
                if (result.start === 0 || tt_lt(r.start, result.start)) {
                    result.start = r.start;
                }

                // always is > the first time, but subsequent pages will be less
                if (tt_gt(r.end, result.end)) {
                    result.end = r.end;
                }

                // continue paging if returns whole page
                if (r.count === 100) {
                    params.start = r.end;
                    uptoNextPage();
                }
                else {
                    completed(result);
                }
            });
        }

        uptoNextPage();
    }
    // Range of messages in channel
    else if (args1.hasOwnProperty('getrange')) {

        result.operationValue = true;
        result.messages = {};

        params.count = 1;


        // go backwards in time (using only count = 1, this will be latest message)
        params.reverse = false;

        getPage(params, function (r) {

            result.messages.last = r.messages[0];

            if (tt_gt(r.end, result.end)) {
                result.end = r.end;

                // Save a Epoch and Date/Time String as well
                var utcs = (r.end / 10000000) | 0;
                var s = new Date(0);
                s.setUTCSeconds(utcs);
                result.endE = utcs;
                result.endD = s.toString();
            }

        });

        // go forwards in time (using only count = 1, this will be first message)
        params.reverse = true;

        getPage(params, function (r) {

            result.messages.first = r.messages[0];

            // each page will be an earlier start timetoken
            if (result.start === 0 || tt_lt(r.start, result.start)) {
                result.start = r.start;

                // Save a Epoch and Date/Time String as well
                var utcs = (r.start / 10000000) | 0;
                var s = new Date(0);
                s.setUTCSeconds(utcs);
                result.startE = utcs;
                result.startD = s.toString();

                {
                    var remaining = 0;
                    var total_seconds = result.endE - result.startE;
                    var days = Math.floor(total_seconds / (60*60*24));
                    remaining = total_seconds - (days*24*60*60);
                    var hours = Math.floor(remaining / (60*60));
                    remaining = remaining - (hours*60*60);
                    var minutes = Math.floor(remaining / 60);
                    remaining = remaining - (minutes*60);
                    var seconds = remaining;

                    result.duration = {
                        total_seconds: total_seconds,
                        days: days,
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds
                    };
                }
            }

            if (result.start > 0 && result.end > 0) {
                delete result.count;
                completed(result);
            }
        });

    }
    // Between Timetokens (between: [timetoken, timetoken] (or epoch))
    else if (args1.hasOwnProperty('between')) {

        result.operationValue = args1.between;

        var start = checkTimetoken(args1.between[0]);
        var end = checkTimetoken(args1.between[1]);

        if (tt_gt(start,end)) {
            start = end;
            end = checkTimetoken(args1.between[0]);
        }

        params.start = start;
        params.end = end;

        // go forwards in time from start, this param is actually ignored since start && end provided
        params.reverse = true;

        function betweenNextPage() {

            getPage(params, function (r) {

                result.count += r.count;
                Array.prototype.push.apply(result.messages, r.messages);

                // each page will be an earlier start timetoken
                if (result.start === 0 || tt_lt(r.start, result.start)) {
                    result.start = r.start;
                }

                if (tt_gt(r.end, result.end)) {
                    result.end = r.end;
                }

                // continue paging if returns whole page
                if (r.count === 100) {
                    params.start = r.end;
                    betweenNextPage();
                }
                else {
                    completed(result);
                }
            });
        }

        betweenNextPage();

    }
    // At moment in time (at: timetoken or epoch)
    else if (args1.hasOwnProperty('at')) {

        result.operationValue = args1.at;

        params.start = checkTimetoken(args1.at);
        params.count = 1;

        getPage(params, function (r) {

            result.count += r.count;
            Array.prototype.push.apply(result.messages, r.messages);

            if (r.count > 0 && (result.start === 0 || tt_lt(r.start, result.start))) {
                result.start = r.start;
            }

            if (r.count > 0 && tt_gt(r.end, result.end)) {
                result.end = r.end;
            }

            completed(result);
        });
    }
    // Get All available History on Channel 
    // (same code as since, with hardcoded start timetoken)
    else if (args1.hasOwnProperty('getall')) {

        result.operationValue = true;

        // Use timetoken from 5 years ago (1/1/2010)
        params.start = checkTimetoken(1262307661);
        params.reverse = true;

        function sinceNextPage() {

            getPage(params, function (r) {

                result.count += r.count;
                Array.prototype.push.apply(result.messages, r.messages);

                // each page will be an earlier start timetoken
                if (result.start === 0 || tt_lt(r.start, result.start)) {
                    result.start = r.start;
                }

                if (tt_gt(r.end, result.end)) {
                    result.end = r.end;
                }

                // continue paging if returns whole page
                if (r.count === 100) {
                    params.start = r.end;
                    sinceNextPage();
                }
                else {
                    completed(result);
                }
            });
        }

        sinceNextPage();
    }
    else {
        console.error("ERROR: pubnub_flex_history operation required, one of [last, since, getrange, between, at, getall]");
        result.error = true;
        result.errorMessage = "operation required, one of [last, since, getrange, upto, between, at, getall]";
        result.errorArgs = args1;
        completed(result);
    }
};