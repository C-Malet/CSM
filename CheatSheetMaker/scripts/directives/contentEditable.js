function contenteditable (cheatSheetManager) {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {

            element.on('keyup', function (event) {
                if (event.keyCode == 27) {
                    $(this).blur();
                    window.getSelection().removeAllRanges();
                }
            })

            element.on('keypress paste', function (event) {
                if (event.type == 'keypress' && event.which == 13) {
                    event.preventDefault();
                    $(this).blur();
                    window.getSelection().removeAllRanges();
                } else if (event.type == 'paste') {
                    event.preventDefault();
                    $(this).blur();
                    window.getSelection().removeAllRanges();
                }
            });

            element.on('blur', function () {
                var content = attrs.editedContent;
                var attribute = attrs.editedAttribute;
                var value = element.text();
                var index = attrs.contentIndex;

                switch (content) {
                    case 'column' :
                        cheatSheetManager.updateColumn(index, attribute, value);
                        break;
                    case 'configModal' :
                        scope.updateColumn(attribute, value);
                        break;
                    case 'cheatSheet' :
                        cheatSheetManager.updateCheatSheet(value);
                        break;
                    default :
                        break;
                }

                scope.$apply();
            });
        }
    }
}