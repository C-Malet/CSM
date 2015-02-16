function columnConfigModalController($scope, $rootScope, $modalInstance, column, cheatSheetManager) {
    $scope.columnName = column.name;

    $scope.columnHeaderBackground = column.header.style.backgroundColor;
    $scope.columnHeaderTitle = column.header.style.color;

    $scope.headerBackground = {'background-color' : column.header.style.backgroundColor};
    $scope.headerTitle = {'color' : column.header.style.color};

    $scope.updateColumn = function(attribute, value) {
        $scope[attribute] = value;
    };

    // http://stackoverflow.com/a/26126470/2627459
    function getBgColorHex(elem) {
        var color = elem.css('background-color');
        var hex;
        if (color.indexOf('#') > -1) {
            //for IE
            hex = color;
        }
        else {
            var rgb = color.match(/\d+/g);
            hex = '#' + ('0' + parseInt(rgb[0], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[1], 10).toString(16)).slice(-2) + ('0' + parseInt(rgb[2], 10).toString(16)).slice(-2);
        }
        return hex;
    }

    $scope.pickColor = function(attribute, $event) {
        switch (attribute) {
            case 'title':
                $scope.columnHeaderTitle = getBgColorHex($($event.target));
                break;
            case 'background':
                $scope.columnHeaderBackground = getBgColorHex($($event.target));
                break;
            default:
                break;
        }
    };

    $scope.ok = function() {
        column.header.style.color = $scope.columnHeaderTitle;
        column.header.style.backgroundColor = $scope.columnHeaderBackground;
        cheatSheetManager.saveColumns();
        $modalInstance.close($scope.columnName);
        $rootScope.$broadcast('masonry.reload');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss(null);
    };
}