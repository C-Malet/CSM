function cheatSheetManager ($http) {

    /* INIT */

    var cheatSheet = {
        cheatSheet: "New Cheat Sheet",
        columns: []
    };

    var functions = {};

    var formats = [
        {
            class : "glyphicon glyphicon-th",
            nbColumn : 3,
            width : "33.33333333%",
            name: "3"
        },
        {
            class : "glyphicon glyphicon-th-large",
            nbColumn : 2,
            width : "50%",
            name:"2"
        },
        {
            class : "glyphicon glyphicon-align-justify",
            nbColumn : 1,
            width : "100%",
            name:"1"
        }
    ];

    /* FUNCTIONS */

    functions.saveColumns = function () {
        $http.post("ajax/saveCheatSheet.php", cheatSheet).
            success(function (data, status, headers, config) {
                // TODO
            }).
            error(function (data, status, headers, config) {
                // TODO
            });
    };

    functions.initCheatSheet = function () {
        return $http.post("ajax/getCheatSheet.php", 'theOne').
            success(function (data) {
                cheatSheet = data;
            }).
            error(function (data) {
                cheatSheet =
                {
                    sheetname : "New Cheat Sheet",
                    columns: [
                        {
                            name: "New block",
                            status: "open",
                            header: {
                                style: {
                                    backgroundColor : "#ffffff",
                                    color : "#000000"
                                }
                            },
                            content:""
                        }
                    ]
                };
            });
    };

    functions.updateColumn = function (index, attribute, value) {
        cheatSheet.columns[index][attribute] = value;
        functions.saveColumns();
    };

    functions.addColumn = function (name) {
        cheatSheet.columns.push(
            {
                name: name === undefined ? "New block" : name,
                status: "open",
                header: {
                    style: {
                        backgroundColor : "#ffffff",
                        color : "#000000"
                    }
                },
                content:""
            }
        );
        functions.saveColumns();
    };

    functions.toggleColumns = function (action) {
        var status = action === 'expend' ? 'open' : 'base';
        for (var i = 0; i < cheatSheet.columns.length; i++) {
            cheatSheet.columns[i].status = status;
        }
        functions.saveColumns();
    };

    functions.toggleColumn = function (index) {
        cheatSheet.columns[index].status = cheatSheet.columns[index].status === 'base' ?  'open' : 'base';
        functions.saveColumns();
    };

    functions.getFormats = function () {
        return formats;
    };

    functions.getColumns = function () {
        return cheatSheet.columns;
    };

    functions.removeColumn = function (index) {
        cheatSheet.columns.splice(index, 1);
        functions.saveColumns();
    };

    functions.columnIsOpen = function (index) {
        return cheatSheet.columns[index].status === "open";
    };

    functions.noColumn = function () {
        return cheatSheet.columns === undefined || cheatSheet.columns.length === 0;
    };

    functions.editColumn = function (modal, index) {
        var modalInstance = modal.open({
            templateUrl: 'html/templates/modals/editColumn.html',
            controller: 'columnEditModalController',
            resolve: {
                column : function () {
                    return cheatSheet.columns[index];
                }
            }
        });
    };

    functions. openColumnConfig = function (modal, index) {
        var modalInstance = modal.open({
            templateUrl: 'html/templates/modals/configColumn.html',
            controller: 'columnConfigModalController',
            resolve: {
                column : function () {
                    return cheatSheet.columns[index];
                }
            }
        });
    };

    functions.getColumnContent = function (index) {
        return cheatSheet.columns[index].content;
    };

    functions.columnIsEmpty = function (index) {
        return cheatSheet.columns[index].content === "";
    };

    functions.moveColumn = function (index, sense, shift) {
        var columnToMove = cheatSheet.columns[index];
        var newPosition;
        if (sense === "left") {
            newPosition = (index - shift < 0) ? 0 : index - shift;
        } else {
            newPosition = (index + shift >= cheatSheet.columns.length) ? cheatSheet.columns.length - 1 : index + shift;
        }
        if (newPosition === index) return false; // Nothing to swap with
        var swapColumn = cheatSheet.columns[newPosition];
        cheatSheet.columns[index] = swapColumn;
        cheatSheet.columns[newPosition] = columnToMove;
        functions.saveColumns();
    };

    functions.getCheatSheetName = function () {
        return cheatSheet.cheatSheet;
    };

    functions.updateCheatSheet = function (name) {
        cheatSheet.cheatSheet = name;
        functions.saveColumns();
    };

    return functions;
}