app.controller('eventController', function($scope) {

    $scope.eventList = [ // MANUALLY EDITED RAW DATA
        /** This is an example entry:
         *  (Time values must be integers.)
        {
            'year' : 2000,
            'month' : 1,
            'day' : 1,
            'startHour' : 17,
            'startMin' : 0,
            'endHour' : 19,
            'endMin' : 0,
            'location' : 'Raum',
            'isIntroEvent' : false
        }**/        
        
        {
            'year' : 2016,
            'month' : 9,
            'day' : 16,
            'startHour' : 17,
            'startMin' : 0,
            'endHour' : 19,
            'endMin' : 0,
            'location' : 'Seminarraum 236',
            'isIntroEvent' : true
        },
        {
            'year' : 2016,
            'month' : 9,
            'day' : 30,
            'startHour' : 17,
            'startMin' : 0,
            'endHour' : 19,
            'endMin' : 0,
            'location' : 'Seminarraum 236',
            'isIntroEvent' : false
        },
        {
            'year' : 2016,
            'month' : 10,
            'day' : 14,
            'startHour' : 17,
            'startMin' : 0,
            'endHour' : 19,
            'endMin' : 0,
            'location' : 'Seminarraum 236',
            'isIntroEvent' : false
        },
        {
            'year' : 2016,
            'month' : 10,
            'day' : 28,
            'startHour' : 17,
            'startMin' : 0,
            'endHour' : 19,
            'endMin' : 0,
            'location' : 'Seminarraum 236',
            'isIntroEvent' : true
        },
        {
            'year' : 2016,
            'month' : 11,
            'day' : 11,
            'startHour' : 17,
            'startMin' : 0,
            'endHour' : 19,
            'endMin' : 0,
            'location' : 'Seminarraum 236',
            'isIntroEvent' : false
        },
        {
            'year' : 2016,
            'month' : 11,
            'day' : 25,
            'startHour' : 17,
            'startMin' : 0,
            'endHour' : 19,
            'endMin' : 0,
            'location' : 'Seminarraum 236',
            'isIntroEvent' : true
        }

    ];

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
