function columnEditModalController($scope, $rootScope, $modalInstance, column, cheatSheetManager) {
    $scope.columnName = column.name;
    $scope.columnContent = column.content;

    $scope.updateColumn = function (attribute, value) {
        $scope[attribute] = value;
    };

    $scope.ok = function() {
        column.content = $scope.clearContent($scope.columnContent);
        cheatSheetManager.saveColumns();
        $modalInstance.close($scope.columnName);
        $rootScope.$broadcast('masonry.reload');
    };

    $scope.cancel = function() {
        $modalInstance.dismiss(null);
    };

    $scope.clearContent = function (content) {
        content.replace(/(?:\r\n|\r|\n)/g, '<br>');
        return content;
    };
}