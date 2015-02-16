angular
    .module('CSMApp', ['ui.bootstrap', 'ngSanitize', 'ng.ckeditor', 'colorpicker.module', 'wu.masonry'])
    .controller('mainController', mainController)
    .controller('columnConfigModalController', columnConfigModalController)
    .controller('columnEditModalController', columnEditModalController)
    .directive('column', columnDirective)
    .directive('contenteditable', contenteditable)
    .directive('menubar', menuBarDirective)
    .directive('allowTab', allowTab)
    .factory('cheatSheetManager', cheatSheetManager);
