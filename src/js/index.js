function updateStatus() {
    'use strict';


    (function init() {
        date();
        get_json_data();
    }());


    function date() {

        function addZero(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }

        var date = new Date();
        var hours = addZero(date.getHours());
        var minutes = addZero(date.getMinutes());
        var day_month = date.getDate();
        var day_week = date.getDay();
        var month_number = date.getMonth();
        var year = date.getFullYear();

        var day_en = ["Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday"];

        var month_en = ["January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"];

        var full_date = day_en[day_week] + " " + day_month + " " + month_en[month_number] + " " + year + " at " + hours + ":" + minutes;
        document.getElementById("full_date").innerHTML = full_date;
    }


    function windDirection(directionDegrees) {

        if (directionDegrees >= 0 && directionDegrees < 45)
            return "&#8593";

        else if (directionDegrees >= 45 && directionDegrees < 90)
            return "&#8599";

        else if (directionDegrees >= 90 && directionDegrees < 135)
            return "&#8594";

        else if (directionDegrees >= 135 && directionDegrees < 180)
            return "&#8600";

        else if (directionDegrees >= 180 && directionDegrees < 225)
            return "&#8595";

        else if (directionDegrees >= 225 && directionDegrees < 270)
            return "&#8601";

        else if (directionDegrees >= 270 && directionDegrees < 315)
            return "&#8592";

        else if (directionDegrees >= 315 && directionDegrees < 360)
            return "&#8598";
    }


    function get_json_data() {
        var request = new XMLHttpRequest();
        var select = document.getElementById("city");
        var city = select.options[select.selectedIndex].value;
        var key = "51f9896e7da56bb1d378c17a058c1818";
        var url = "https://openweathermap.org/data/2.5/weather?q=" + city + "&appid=b6907d289e10d714a6e88b30761fae22";
        request.open("GET", url);

        request.onload = function () {
            if (request.status == 200) {
                var jsonText = request.responseText;
                var jsonObject = JSON.parse(jsonText);

                var city_name = jsonObject['name'];
                document.getElementById("city_name").innerHTML = city_name;

                var actual_temp = jsonObject['main']['temp'];
                document.getElementById("temp_actual").innerHTML = actual_temp;

                var description = jsonObject["weather"][0]["description"];
                document.getElementById("description").innerHTML = description;

                var wind_speed = jsonObject["wind"]["speed"];
                document.getElementById("wind_speed").innerHTML = wind_speed;

                var wind_degrees = jsonObject["wind"]["deg"];
                document.getElementById("wind_degrees").innerHTML = wind_degrees;

                var wind_direction = windDirection(wind_degrees);
                document.getElementById("wind_direction").innerHTML = wind_direction;

            }
        }
        request.send(null);

    }

}