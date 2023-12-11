$(document).ready(function() {

    // API
    let _url = "https://my-json-server.typicode.com/sndkrnwn/listing-api/vechile";

    // Create variables result
    let dataResults = '';
    let typeResults = '';
    let types = [];


    // FETCH API to get DATA
    $.get(_url, function(data) {

        // LOOPING DATA RESULTS
        $.each(data, function(key, items) {

            let _type = items.type;

            // fill variable dataResults
            dataResults += "<div>"
                            + "<h3>" + items.name + "</h3>"
                            + "<p>" + _type + "</p>"
                        "</div>";

            
            // find unique type for every data
            if($.inArray(_type, types) == -1) {
                types.push(_type)
                typeResults += "<option key='"+ key +"' value='"+ _type +"'>" + _type + "</option>"
            }
        });


        // Inject data into id html to display for browser
        $('#vechile_name').html(dataResults);

        // Inject data into id html to display for browser
        $('#vechile_model').html("<option value='all'>all</option>" + typeResults);
    });


    // FUNCTION FILTER and REFETCH 
    $("#vechile_model").on("change", function() {
        // console.log($(this).val());
        updateVechile($(this).val());
    });

    function updateVechile(type) {
        let _newUrl = _url;

        let filterResults = '';

        if(type !== 'all') {
            _newUrl = _url + "?type=" + type
        }

        $.get(_newUrl, function(data) {

            // LOOPING DATA RESULTS
            $.each(data, function(key, items) {
    
                let _type = items.type;
    
                // fill variable dataResults
                filterResults += "<div>"
                                + "<h3>" + items.name + "</h3>"
                                + "<p>" + _type + "</p>"
                            "</div>";
            });
    
    
            // Inject data into id html to display for browser
            $('#vechile_name').html(filterResults);
        });
    }


    // PWA 
    // Check if the browser supports service workers
    if ('serviceWorker' in navigator) {
        // Register the service worker
        navigator.serviceWorker.register('./serviceWorker.js')
        .then((registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
            console.error('Service Worker registration failed:', error);
        });
    }

})  