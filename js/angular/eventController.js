app.controller('eventController', function($scope) {

    $scope.eventList = eventList; // from global var in data script
    $scope.pastEventList = []; // filled in init
    $scope.nextEvent = null; // initialized in init
    $scope.futureEventList = []; // filled in init

    $scope.dateObject = new Date();
    $scope.currentDate = {
        'year' : $scope.dateObject.getFullYear(),
        'month' : $scope.dateObject.getMonth() + 1,
        'day' : $scope.dateObject.getDate()
    };

    $scope.processDisplayValues = function(eventElement) {
        eventElement.displayYear = '' + eventElement.year;
        eventElement.displayMonth = $scope.padToTwoDigits(eventElement.month);
        eventElement.displayMonthTextShort = $scope.shortMonthNames[eventElement.month - 1];
        eventElement.displayDay = $scope.padToTwoDigits(eventElement.day);
        eventElement.displayStartTime = $scope.padToTwoDigits(eventElement.startHour) +
                                        ':' + $scope.padToTwoDigits(eventElement.startMin);
        eventElement.displayEndTime = $scope.padToTwoDigits(eventElement.endHour) +
                                      ':' + $scope.padToTwoDigits(eventElement.endMin);
        return eventElement;
    };

    $scope.shortMonthNames = ["Jan.", "Feb.", "März", "Apr.",
                              "Mai",  "Juni", "Juli", "Aug.",
                              "Sep.", "Okt.", "Nov.", "Dez." ];

    $scope.padToTwoDigits = function(number) {
        if (number < 10 && number >= 0) {
            return '0' + number;
        }
        else if (number < 0) {
            return '00';
        }
        else {
            return '' + number;
        }
    };

    $scope.init = function() {

        // fill split event lists

        for(i=0; i < $scope.eventList.length; i++) {
            if ($scope.eventList[i].year < $scope.currentDate.year) {
                $scope.pastEventList.push(
                    $scope.processDisplayValues($scope.eventList[i]));
                continue;
            }
            else if ($scope.eventList[i].year == $scope.currentDate.year &&
                     $scope.eventList[i].month < $scope.currentDate.month) {
                $scope.pastEventList.push(
                    $scope.processDisplayValues($scope.eventList[i]));
                continue;
            }
            else if ($scope.eventList[i].month == $scope.currentDate.month &&
                     $scope.eventList[i].day < $scope.currentDate.day) {
                $scope.pastEventList.push(
                    $scope.processDisplayValues($scope.eventList[i]));
                continue;
            }
            else {
                $scope.futureEventList.push(
                    $scope.processDisplayValues($scope.eventList[i]));
            }
        }

        // separate next event

        $scope.nextEvent = $scope.futureEventList.shift();

    };

    $scope.init();

});
