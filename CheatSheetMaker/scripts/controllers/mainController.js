function mainController ($scope, $rootScope, $timeout, $modal, cheatSheetManager) {
    var initiated = false;

    $scope.appName = "Cheat Sheet Maker";
    $scope.editionMode = false;

    $scope.formats = cheatSheetManager.getFormats();
    $scope.currentFormat = {
        "index" : 0,
        "object" :  $scope.formats[0]
    };

    cheatSheetManager.initCheatSheet().then(function (result) {
        $scope.columns = result.data.columns;
        $scope.cheatSheetName = cheatSheetManager.getCheatSheetName();
        initiated = true;
    });

    $scope.openColumnConfig = function (index) {
        cheatSheetManager.openColumnConfig($modal, index);
    };

    $scope.editColumn = function (index) {
        cheatSheetManager.editColumn($modal, index);
    };

    $scope.columnIsOpen = function (index) {
        return cheatSheetManager.columnIsOpen(index);
    };

    $scope.setFormat = function (index) {
        $scope.currentFormat = {
            "index" : index,
            "object" : $scope.formats[index]
        };
        $rootScope.$broadcast('masonry.reload');
    };

    $scope.isSelectedFormat = function (index) {
        return index === $scope.currentFormat.index;
    };

    $scope.toggleColumn = function (index) {
        cheatSheetManager.toggleColumn(index);
        $rootScope.$broadcast('masonry.reload');
    };

    $scope.toggleColumns = function (action) {
        cheatSheetManager.toggleColumns(action);
        $rootScope.$broadcast('masonry.reload');
    };

    $scope.removeColumn = function (index) {
        return cheatSheetManager.removeColumn(index);
    };

    $scope.addColumn = function () {
        return cheatSheetManager.addColumn();
    };

    $scope.noColumn = function () {
        return initiated === true && cheatSheetManager.noColumn();
    };

    $scope.getColumnContent = function (index) {
        return cheatSheetManager.getColumnContent(index);
    };

    $scope.columnIsEmpty = function (index) {
        return cheatSheetManager.columnIsEmpty(index);
    };

    $scope.moveColumn = function (index, sense, shift) {
        cheatSheetManager.moveColumn(index, sense, shift);
    };

    $scope.toggleEditionMode = function () {
        $scope.editionMode = !$scope.editionMode;
        $rootScope.$broadcast('masonry.reload');
    };

    $scope.isInEditionMode = function () {
        return $scope.editionMode;
    }

}