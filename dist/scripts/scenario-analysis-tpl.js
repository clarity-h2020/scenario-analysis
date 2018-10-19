angular.module('eu.crismaproject.worldstateAnalysis.directives').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('templates/criteriaEmphasesTemplate.html',
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\" white-space: nowrap;\r" +
    "\n" +
    "         overflow: hidden;\r" +
    "\n" +
    "         text-overflow: ellipsis;\">\r" +
    "\n" +
    "        Criteria Emphasis\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-body\" >\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <div  class=\"col-lg-2 col-md-2 col-sm-2 col-xs-4\" style=\"margin-bottom: 20px;\" ng-repeat=\"item in critEmphInternal\">\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div  style=\"display:block;margin:0 auto;width:100px;\">\r" +
    "\n" +
    "                        <knob knob-data=\"item.criteriaEmphasis\" knob-max=\"knobMax\" knob-options=\"knobOptions\"></knob>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div  style=\"display:block;margin:0 auto;width:100px;text-align: center;\">\r" +
    "\n" +
    "                        <span>{{item.indicator.displayName}}</span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/criteriaFunctionManagerTemplate.html',
    "<div class=\"col-lg-12\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-3 col-md-12\">\r" +
    "\n" +
    "            <div class=\"list-group\">\r" +
    "\n" +
    "                <span id=\"importCf\" ng-show=\"fileAPIAvailable\" \r" +
    "\n" +
    "                      ng-style=\"getButtonStyle()\"\r" +
    "\n" +
    "                      style=\"margin-bottom: -30px; z-index: 50; font-size: 14px;\"\r" +
    "\n" +
    "                      class=\"glyphicon glyphicon-upload btn-file\">\r" +
    "\n" +
    "                    <input type=\"file\" ng-disabled=\"listItemsDisabled\" file-input=\"criteriaFunctionFile\" multiple>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <a class=\"list-group-item active\">\r" +
    "\n" +
    "                    Criteria Functions \r" +
    "\n" +
    "                    <i data-placement=\"top\" \r" +
    "\n" +
    "                       data-type=\"info\" \r" +
    "\n" +
    "                       data-delay=\"500\" \r" +
    "\n" +
    "                       data-container=\"body\"\r" +
    "\n" +
    "                       data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                       bs-tooltip=\"tooltipAdd.title\"\r" +
    "\n" +
    "                       ng-style=\"getButtonStyle()\"\r" +
    "\n" +
    "                       ng-click=\"addCriteriaFunction()\" class=\"pull-right glyphicon glyphicon-plus-sign\"></i>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "                <a ng-click=\"setSelectedCriteriaFunction($index)\"\r" +
    "\n" +
    "                   class=\"list-group-item\"\r" +
    "\n" +
    "                   ng-class=\"getListItemClass($index)\"\r" +
    "\n" +
    "                   ng-repeat=\"cf in criteriaFunctionSet\">\r" +
    "\n" +
    "                    <span ng-hide=\"editable[$index]\">{{cf.name}}</span>\r" +
    "\n" +
    "                    <input style =\"color:black;width:75%\" ng-hide=\"!editable[$index]\" type=\"text\" ng-model=\"cf.name\">\r" +
    "\n" +
    "                    <div class=\"pull-right\" ng-hide=\"$index !== selectedCriteriaFunctionIndex\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <i ng-hide=\"listItemsDisabled || editable[$index]\" \r" +
    "\n" +
    "                           data-placement=\"top\" data-type=\"info\" \r" +
    "\n" +
    "                           data-delay=\"500\" \r" +
    "\n" +
    "                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                           data-container=\"body\"\r" +
    "\n" +
    "                           bs-tooltip=\"tooltipRename.title\"\r" +
    "\n" +
    "                           ng-click=\"editable[$index] = true\" \r" +
    "\n" +
    "                           style=\"margin-right: 10px;\"\r" +
    "\n" +
    "                           class=\"glyphicon glyphicon-pencil\"></i>\r" +
    "\n" +
    "                        <i ng-hide=\"listItemsDisabled || !editable[$index]\"\r" +
    "\n" +
    "                           data-placement=\"top\" \r" +
    "\n" +
    "                           data-type=\"info\" \r" +
    "\n" +
    "                           data-delay=\"500\" \r" +
    "\n" +
    "                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                           data-container=\"body\"\r" +
    "\n" +
    "                           bs-tooltip=\"tooltipRenameDone.title\"\r" +
    "\n" +
    "                           ng-click=\"editable[$index] = false\"\r" +
    "\n" +
    "                           style=\"margin-right: 10px;\"\r" +
    "\n" +
    "                           class=\"glyphicon glyphicon-ok\"></i>\r" +
    "\n" +
    "                        <!--                            <i data-placement=\"bottom\" data-type=\"info\" data-delay=\"500\" data-animation=\"am-fade-and-scale\" bs-tooltip=\"tooltipSave.title\"\r" +
    "\n" +
    "                                                       ng-click=\"saveCriteriaFunctions()\"\r" +
    "\n" +
    "                                                       style=\"margin-right: 10px;\"\r" +
    "\n" +
    "                                                       class=\"glyphicon glyphicon-floppy-disk\"></i>-->\r" +
    "\n" +
    "                        <i data-placement=\"top\" \r" +
    "\n" +
    "                           data-type=\"info\" \r" +
    "\n" +
    "                           data-delay=\"500\" \r" +
    "\n" +
    "                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                           bs-tooltip=\"tooltipDelete.title\"\r" +
    "\n" +
    "                           data-container=\"body\"\r" +
    "\n" +
    "                           ng-hide=\"listItemsDisabled\"\r" +
    "\n" +
    "                           ng-click=\"removeCriteriaFunction()\"\r" +
    "\n" +
    "                           class=\"glyphicon glyphicon-minus-sign\"></i>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-lg-9 col-md-12\" style=\"margin-top: 20px\" ng-if=\"listItemsDisabled\">\r" +
    "\n" +
    "            <div class=\"alert alert-warning\" role=\"alert\"><b>Warning:</b> No worldstates are selected</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-lg-9 col-md-12\" style=\"margin-top: 20px\" ng-if=\"selectedCriteriaFunctionIndex >= 0 && criteriaFunctionSet[selectedCriteriaFunctionIndex]\">\r" +
    "\n" +
    "            <div class=\"row\" ng-if=\"!listItemsDisabled\" ng-repeat=\"indicator in indicators\">\r" +
    "\n" +
    "                <div class=\"col-lg-12\">\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "                        <div class=\"col-lg-12 vCenter\">\r" +
    "\n" +
    "                            <img ng-src=\"{{indicator.iconResource}}\" style=\"margin-right:5px;margin-bottom: 5px\" /> <label>{{indicator.displayName}}</label>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "                        <div class=\"col-lg-12\" >\r" +
    "\n" +
    "                            <indicator-band criteria-function=\"criteriaFunctionSet[selectedCriteriaFunctionIndex].criteriaFunctions[$index]\"></indicator-band>        \r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>   \r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/criteriaRadarPopupTemplate.html',
    "<div class=\"ngdialog-message\" \r" +
    "\n" +
    "     style=\"width:500px;min-width: 500px\"\r" +
    "\n" +
    "    criteria-radar \r" +
    "\n" +
    "    worldstates=\"ws\" \r" +
    "\n" +
    "    show-legend=\"false\"\r" +
    "\n" +
    "    show-axis-text=\"true\"\r" +
    "\n" +
    "    use-numbers=\"false\"\r" +
    "\n" +
    "    criteria-function=\"criteriaFunction\">\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/decisionStrategyManagerTemplate.html',
    "<div class=\"col-lg-12\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col-lg-3 col-md-12\">\r" +
    "\n" +
    "            <div class=\"list-group\">\r" +
    "\n" +
    "                <span id=\"importDs\" ng-show=\"fileAPIAvailable\"\r" +
    "\n" +
    "                      ng-style=\"getButtonStyle()\"\r" +
    "\n" +
    "                      style=\"margin-bottom: -30px; z-index: 50; font-size: 14px;\"\r" +
    "\n" +
    "                      class=\"glyphicon glyphicon-upload btn-file lg-margin-left\">\r" +
    "\n" +
    "                    <input ng-disabled=\"listItemsDisabled\" type=\"file\" file-input=\"decisionStrategyFile\" multiple>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <a class=\"list-group-item active\">\r" +
    "\n" +
    "                    Decision Strategies\r" +
    "\n" +
    "                    <i data-placement=\"top\" \r" +
    "\n" +
    "                       data-type=\"info\" \r" +
    "\n" +
    "                       data-delay=\"500\" \r" +
    "\n" +
    "                       data-container=\"body\"\r" +
    "\n" +
    "                       data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                       bs-tooltip=\"tooltipAdd.title\"\r" +
    "\n" +
    "                       ng-style=\"getButtonStyle()\"\r" +
    "\n" +
    "                       ng-click=\"addDecisionStrategy()\" class=\"pull-right glyphicon glyphicon-plus-sign\"></i>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "                <a ng-click=\"setSelectedDecisionStrategy($index)\"\r" +
    "\n" +
    "                   ng-class=\"getItemStyle($index)\" \r" +
    "\n" +
    "                   ng-repeat=\"cf in decisionStrategies\">\r" +
    "\n" +
    "                    <span ng-hide=\"editable[$index]\">{{cf.name}}</span>\r" +
    "\n" +
    "                    <input style =\"color:black; width:75%;\" ng-hide=\"!editable[$index]\" type=\"text\" ng-model=\"cf.name\">\r" +
    "\n" +
    "                    <div class=\"pull-right\" ng-hide=\"$index !== selectedDecisionStrategyIndex\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <i ng-hide=\"listItemsDisabled || editable[$index]\" \r" +
    "\n" +
    "                           data-placement=\"top\" data-type=\"info\" \r" +
    "\n" +
    "                           data-delay=\"500\" \r" +
    "\n" +
    "                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                           data-container=\"body\"\r" +
    "\n" +
    "                           bs-tooltip=\"tooltipRename.title\"\r" +
    "\n" +
    "                           ng-click=\"editable[$index] = true\" \r" +
    "\n" +
    "                           style=\"margin-right: 10px;\"\r" +
    "\n" +
    "                           class=\"glyphicon glyphicon-pencil\"></i>\r" +
    "\n" +
    "                        <i ng-hide=\"listItemDisabled || !editable[$index]\"\r" +
    "\n" +
    "                           data-placement=\"top\" \r" +
    "\n" +
    "                           data-type=\"info\" \r" +
    "\n" +
    "                           data-delay=\"500\" \r" +
    "\n" +
    "                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                           data-container=\"body\"\r" +
    "\n" +
    "                           bs-tooltip=\"tooltipRenameDone.title\"\r" +
    "\n" +
    "                           ng-click=\"editable[$index] = false\"\r" +
    "\n" +
    "                           style=\"margin-right: 10px;\"\r" +
    "\n" +
    "                           class=\"glyphicon glyphicon-ok\"></i>\r" +
    "\n" +
    "                        <i data-placement=\"top\" \r" +
    "\n" +
    "                           ng-hide=\"listItemsDisabled\"\r" +
    "\n" +
    "                           data-type=\"info\" \r" +
    "\n" +
    "                           data-delay=\"500\" \r" +
    "\n" +
    "                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                           bs-tooltip=\"tooltipDelete.title\"\r" +
    "\n" +
    "                           data-container=\"body\"\r" +
    "\n" +
    "                           ng-click=\"removeDecisionStrategy()\"\r" +
    "\n" +
    "                           class=\"glyphicon glyphicon-minus-sign\"></i>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </a>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-lg-9 col-md-12\" ng-if=\"listItemsDisabled\" style=\"margin-top: 20px\">\r" +
    "\n" +
    "            <div class=\"alert alert-warning\" role=\"alert\"><b>Warning:</b> No worldstates are selected</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-lg-9 col-md-12\" style=\"margin-top: 20px\" ng-if=\"!listItemsDisabled && selectedDecisionStrategyIndex >= 0 && decisionStrategies[selectedDecisionStrategyIndex]\">\r" +
    "\n" +
    "            <decision-strategy worldstates=\"worldstates\" decision-strategy=\"currentDecisionStrategy\">\r" +
    "\n" +
    "            </decision-strategy>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/decisionStrategyTemplate.html',
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-lg-3 col-md-12\">\r" +
    "\n" +
    "        <level-of-emphasis \r" +
    "\n" +
    "            satisfaction-emphasis=\"decisionStrategy.satisfactionEmphasis\"\r" +
    "\n" +
    "            indicator-size=\"indicatorSize\"\r" +
    "\n" +
    "            >\r" +
    "\n" +
    "        </level-of-emphasis>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"col-lg-9 col-md-12\">\r" +
    "\n" +
    "            <criteria-emphasis indicator-map=\"indicatorMap\" criteria-emphases=\"decisionStrategy.criteriaEmphases\">\r" +
    "\n" +
    "                \r" +
    "\n" +
    "            </criteria-emphasis>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/fileContextProviderTemplate.html',
    "<div class=\"row\">\r" +
    "\n" +
    "    <div ng-show=\"!fileAPIAvailable\" class=\"col-lg-12 col-md-12 col-sm-12\">\r" +
    "\n" +
    "        <div class=\"alert alert-danger\">\r" +
    "\n" +
    "            HTML 5 File APi is not available in your Browser. Please use a Browser that supports this.\r" +
    "\n" +
    "            see also http://caniuse.com/#search=file%20api\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-show=\"fileAPIAvailable\" class=\"col-lg-12 col-md-12 col-sm-12\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-12\">\r" +
    "\n" +
    "                <div class=\"panel-group\">\r" +
    "\n" +
    "                    <div class=\"panel panel-default\">\r" +
    "\n" +
    "                        <div class=\"panel-heading\" role=\"tab\" >\r" +
    "\n" +
    "                            <h4 class=\"panel-title\">\r" +
    "\n" +
    "                                <a ng-click=\"indicatorFileCollapsed = !indicatorFileCollapsed\">\r" +
    "\n" +
    "                                    <i ng-if=\"!indicatorFileCollapsed\" class=\"glyphicon glyphicon-chevron-up\"></i>\r" +
    "\n" +
    "                                    <i ng-if=\"indicatorFileCollapsed\" class=\"glyphicon glyphicon-chevron-down\"></i>\r" +
    "\n" +
    "                                    Indicator files\r" +
    "\n" +
    "                                </a>\r" +
    "\n" +
    "                                <span style=\"font-size: 14px\" \r" +
    "\n" +
    "                                      class=\"pull-right glyphicon glyphicon-plus-sign btn-file \">\r" +
    "\n" +
    "                                    <span\r" +
    "\n" +
    "                                        data-placement=\"top\" data-type=\"info\" \r" +
    "\n" +
    "                                        data-delay=\"500\" \r" +
    "\n" +
    "                                        data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                                        data-container=\"body\"\r" +
    "\n" +
    "                                        bs-tooltip=\"tooltipAdd.title\"></span>\r" +
    "\n" +
    "                                    <input type=\"file\" file-input=\"iccObjects\" multiple>\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                <span style=\"margin-right:5px; font-size: 14px\" \r" +
    "\n" +
    "                                      class=\"pull-right glyphicon glyphicon-minus-sign\"\r" +
    "\n" +
    "                                      data-placement=\"top\" data-type=\"info\" \r" +
    "\n" +
    "                                      data-delay=\"500\" \r" +
    "\n" +
    "                                      data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                                      data-container=\"body\"\r" +
    "\n" +
    "                                      bs-tooltip=\"tooltipDeleteSelection.title\"\r" +
    "\n" +
    "                                      ng-style=\"removeSelectionButtonStyle\"\r" +
    "\n" +
    "                                      ng-click=\"removeSelectedDummyWS()\">\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                            </h4>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                        <div class=\"panel-collapse\" collapse=\"indicatorFileCollapsed\" >\r" +
    "\n" +
    "                            <ul class=\"list-group\">\r" +
    "\n" +
    "                                <!--dummy item that indicates that no indicator objects are available-->\r" +
    "\n" +
    "                                <li class=\"list-group-item\" ng-show=\"showDummyListItem\">\r" +
    "\n" +
    "                                </li>\r" +
    "\n" +
    "                                <li ng-click=\"toggleSelection($index)\"\r" +
    "\n" +
    "                                    ng-class=\"getItemStyle($index)\"\r" +
    "\n" +
    "                                    class=\"list-group-item\" ng-repeat=\"ws in worldstates\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                    <span ng-hide=\"editable[$index]\" \r" +
    "\n" +
    "                                          style=\"width: 90%;\r" +
    "\n" +
    "                                          overflow: hidden;\r" +
    "\n" +
    "                                          text-overflow: ellipsis; \r" +
    "\n" +
    "                                          white-space: nowrap;\r" +
    "\n" +
    "                                          display:inline-block\">\r" +
    "\n" +
    "                                        {{ws.name}}\r" +
    "\n" +
    "                                    </span>\r" +
    "\n" +
    "                                    <input style =\"width: 90%; color:black;\" ng-hide=\"!editable[$index]\" type=\"text\" ng-model=\"ws.name\">\r" +
    "\n" +
    "                                    <div class=\"pull-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                                        <i ng-hide=\"listItemsDisabled || editable[$index]\" \r" +
    "\n" +
    "                                           data-placement=\"top\" data-type=\"info\" \r" +
    "\n" +
    "                                           data-delay=\"500\" \r" +
    "\n" +
    "                                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                                           data-container=\"body\"\r" +
    "\n" +
    "                                           bs-tooltip=\"tooltipRename.title\"\r" +
    "\n" +
    "                                           ng-click=\"editable[$index] = true\" \r" +
    "\n" +
    "                                           style=\"margin-right: 10px;\"\r" +
    "\n" +
    "                                           class=\"glyphicon glyphicon-pencil\"></i>\r" +
    "\n" +
    "                                        <i ng-hide=\"listItemDisabled || !editable[$index]\"\r" +
    "\n" +
    "                                           data-placement=\"top\" \r" +
    "\n" +
    "                                           data-type=\"info\" \r" +
    "\n" +
    "                                           data-delay=\"500\" \r" +
    "\n" +
    "                                           data-animation=\"am-fade-and-scale\" \r" +
    "\n" +
    "                                           data-container=\"body\"\r" +
    "\n" +
    "                                           bs-tooltip=\"tooltipRenameDone.title\"\r" +
    "\n" +
    "                                           ng-click=\"editable[$index] = false\"\r" +
    "\n" +
    "                                           style=\"margin-right: 10px;\"\r" +
    "\n" +
    "                                           class=\"glyphicon glyphicon-ok\"></i>\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </li>\r" +
    "\n" +
    "                            </ul>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <!--<select style=\"width:100%\" ng-model=\"selectedWorldstates\" ng-options=\"ws.name for ws in worldstates\" multiple></select>-->\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-show=\"fileLoading\" class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-12\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-show=\"fileLoadError\" class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-12 col-md-12 col-sm-12\">\r" +
    "\n" +
    "                <div class=\"alert alert-danger\">\r" +
    "\n" +
    "                    {{errorMessage}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-12\">\r" +
    "\n" +
    "                <label>Criteria function file</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\" style=\"margin-bottom: 20px;\">\r" +
    "\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\">\r" +
    "\n" +
    "                <span class=\"btn btn-default btn-file\"  ng-disabled=\"noIndicatorsLoaded\">\r" +
    "\n" +
    "                    Choose a file\r" +
    "\n" +
    "                    <input type=\"file\" ng-disabled=\"noIndicatorsLoaded\" file-input=\"cfConfigFile\">\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-10 col-md-10 col-sm-10\">\r" +
    "\n" +
    "                <div ng-if=\"noIndicatorsLoaded\" \r" +
    "\n" +
    "                     class=\"alert alert-warning\">\r" +
    "\n" +
    "                    <i class=\"glyphicon glyphicon-info-sign\"></i> \r" +
    "\n" +
    "                    No indicator files selected\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"cfFileLoadError\" \r" +
    "\n" +
    "                     class=\"alert alert-danger\"\r" +
    "\n" +
    "                     style=\"font-size: 14px;\">\r" +
    "\n" +
    "                    <i class=\"glyphicon glyphicon-warning-sign\"></i>\r" +
    "\n" +
    "                    {{cfFileLoadErrorMsg}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"alert alert-success\" ng-if=\"loadedCfFile\" style=\"vertical-align: middle\">\r" +
    "\n" +
    "                    Loaded File: {{loadedCfFile}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-12\">\r" +
    "\n" +
    "                <label>Decision strategy file</label>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\">\r" +
    "\n" +
    "                <span class=\"btn btn-default btn-file\" ng-disabled=\"noIndicatorsLoaded\">\r" +
    "\n" +
    "                    Choose a file\r" +
    "\n" +
    "                    <input type=\"file\" file-input=\"dsConfigFile\" ng-disabled=\"noIndicatorsLoaded\">\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-10 col-md-10 col-sm-10\">\r" +
    "\n" +
    "                <div ng-if=\"noIndicatorsLoaded\" \r" +
    "\n" +
    "                     class=\"alert alert-warning\">\r" +
    "\n" +
    "                    <i class=\"glyphicon glyphicon-info-sign\"></i> \r" +
    "\n" +
    "                    No indicator files selected\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div ng-if=\"dsFileLoadError\"\r" +
    "\n" +
    "                     class=\"alert alert-danger\">\r" +
    "\n" +
    "                    <i class=\"glyphicon glyphicon-warning-sign\"></i>\r" +
    "\n" +
    "                    {{dsFileLoadErrorMsg}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                 <div class=\"alert alert-success\" ng-if=\"loadedDsfFile\" style=\"vertical-align: middle\">\r" +
    "\n" +
    "                    Loaded File: {{loadedDsfFile}}\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/icmmContextProviderTemplate.html',
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-lg-12\">\r" +
    "\n" +
    "        <div class=\"row\" style=\"margin-bottom: 20px;\">\r" +
    "\n" +
    "            <div class=\"col-lg-4 col-md-6\">\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-12\">\r" +
    "\n" +
    "                        <label>ICMS instance</label>        \r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"col-lg-12 col-md-12\">\r" +
    "\n" +
    "                        <div class=\"btn-group\" style=\"width: 100%\" dropdown>\r" +
    "\n" +
    "                            <button type=\"button\" \r" +
    "\n" +
    "                                    class=\"btn btn-default btn-sm\"\r" +
    "\n" +
    "                                    style=\"width: 80%\">\r" +
    "\n" +
    "                                 {{selectedIcms.name}}\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\">\r" +
    "\n" +
    "                                <span class=\"caret\"></span>\r" +
    "\n" +
    "                                <span class=\"sr-only\">Toggle Dropdown</span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <ul class=\"dropdown-menu\" role=\"menu\" >\r" +
    "\n" +
    "                                <li ng-repeat=\"icms in backendUrls\" role=\"presentation\" ng-click=\"updateSelectedIcms($index)\">\r" +
    "\n" +
    "                                    <a>{{icms.name}}</a>\r" +
    "\n" +
    "                                </li>\r" +
    "\n" +
    "                            </ul>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-12\">\r" +
    "\n" +
    "                <catalogue-tree options=\"treeOptions\" nodes=\"treeNodes\" selection=\"treeSelection\" active-node=\"activeItem\"></catalogue-tree>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBandItemTemplate.html',
    "<div id=\"popover-parent\" class=\"progress-bar table-display\" \r" +
    "\n" +
    "     aria-valuemin=\"0\" aria-valuemax=\"100\"\r" +
    "\n" +
    "     aria-valunow=\"{{getPercent()}}\"\r" +
    "\n" +
    "     ng-style=\"intervalWidth()\"\r" +
    "\n" +
    "     ng-class=\"getColorClass()\"\r" +
    "\n" +
    "     ng-click=\"togglePopover($event)\"\r" +
    "\n" +
    "     style=\"cursor: pointer;\"\r" +
    "\n" +
    "     >\r" +
    "\n" +
    "    <div class=\"closeIcon vCenter\" ng-if=\"!lowerBoundary && !upperBoundary\"><i ng-click=\"del(previousInterval);\r" +
    "\n" +
    "                $event.stopPropagation()\" ng-hide=\"first\" class=\"glyphicon glyphicon-remove\"></i></div>\r" +
    "\n" +
    "    <div id=\"popover-target\" class=\"vCenter\" style=\"width:100%\">\r" +
    "\n" +
    "        <div ng-hide=\"actualHeightExceeded\" class=\"progress-labels\" style=\"width:100%\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "            <span ng-if=\"lowerBoundary\">0%</span>\r" +
    "\n" +
    "            <span ng-if=\"upperBoundary\">100%</span>\r" +
    "\n" +
    "            <span ng-if=\"!lowerBoundary && !upperBoundary\">{{previousInterval.criteriaValue||'0' | number}}% - {{interval.criteriaValue| number}}% </span>\r" +
    "\n" +
    "            <br/> \r" +
    "\n" +
    "            <span ng-if=\"lowerBoundary && interval.indicatorValue>=previousInterval.indicatorValue\">&gt;=</span>\r" +
    "\n" +
    "            <span ng-if=\"lowerBoundary && interval.indicatorValue<previousInterval.indicatorValue\">&lt;=</span>\r" +
    "\n" +
    "            <span ng-if=\"upperBoundary && interval.indicatorValue>previousInterval.indicatorValue\">&gt;=</span>\r" +
    "\n" +
    "            <span ng-if=\"upperBoundary && interval.indicatorValue<=previousInterval.indicatorValue\">&lt;=</span>\r" +
    "\n" +
    "            <span ng-if=\"!lowerBoundary && !upperBoundary\">{{previousInterval.indicatorValue||'0' | number}} -</span>\r" +
    "\n" +
    "            <span>{{interval.indicatorValue| number}}</span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-hide=\"!actualHeightExceeded\">\r" +
    "\n" +
    "            <i class=\"glyphicon glyphicon-info-sign \" style=\"color:black\" data-placement=\"top\" data-type=\"info\" data-animation=\"am-fade-and-scale\" bs-tooltip=\"tooltip\"></i>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div  class=\"closeIcon vCenter\" ng-if=\"!lowerBoundary && !upperBoundary\" ><i ng-click=\"del(interval);\r" +
    "\n" +
    "                $event.stopPropagation()\" ng-hide=\"last\" class=\"glyphicon glyphicon-remove\"></i>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBandPopoverContentTemplate.html',
    "<form role=\"form\" name=\"form\">\r" +
    "\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error has-feedback': form.losVal.$error.gpercent}\">\r" +
    "\n" +
    "        <label for=\"exampleInputEmail1\">Level of satisfaction</label>\r" +
    "\n" +
    "        <input ng-model=\"popOverItem.criteriaValue\"\r" +
    "\n" +
    "               ng-disabled=\"lowerBoundary || upperBoundary\"\r" +
    "\n" +
    "               gpercent\r" +
    "\n" +
    "               name=\"losVal\"\r" +
    "\n" +
    "               id=\"losVal\"\r" +
    "\n" +
    "               type=\"text\" class=\"form-control\"\r" +
    "\n" +
    "               placeholder=\"Level of satisfactory\">\r" +
    "\n" +
    "        <span class=\"glyphicon glyphicon-warning-sign form-control-feedback\"\r" +
    "\n" +
    "              ng-show=\"form.losVal.$error.gpercent\" \r" +
    "\n" +
    "              style=\"line-height: 34px; font-size: 16px;\"\r" +
    "\n" +
    "              data-toggle=\"tooltip\" data-placement=\"left\" title=\"Invalid level of satisfaction. Must be a percent value between 0 and 100.\"\r" +
    "\n" +
    "              >\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"form-group\" ng-class=\"{'has-error has-feedback': form.indicatorVal.$error.gnumber}\">\r" +
    "\n" +
    "        <label class=\"control-label\" for=\"indicatorVal\">Indicator value</label>\r" +
    "\n" +
    "        <input ng-model=\"popOverItem.indicatorValue\"\r" +
    "\n" +
    "               gnumber\r" +
    "\n" +
    "               name=\"indicatorVal\"\r" +
    "\n" +
    "               id=\"indicatorVal\"\r" +
    "\n" +
    "               type=\"text\" class=\"form-control\"  \r" +
    "\n" +
    "               placeholder=\"Indicator Value\">\r" +
    "\n" +
    "        <span class=\"glyphicon glyphicon-warning-sign form-control-feedback\"\r" +
    "\n" +
    "              ng-show=\"form.indicatorVal.$error.gnumber\" \r" +
    "\n" +
    "              style=\"line-height: 34px; font-size: 16px;\"\r" +
    "\n" +
    "              data-toggle=\"tooltip\" data-placement=\"left\" title=\"Invalid indicator value.\"\r" +
    "\n" +
    "              >\r" +
    "\n" +
    "        </span>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <button \r" +
    "\n" +
    "        type=\"submit\" \r" +
    "\n" +
    "        class=\"btn btn-default\" \r" +
    "\n" +
    "        ng-disabled=\"form.indicatorVal.$error.gnumber || form.losVal.$error.gpercent\"\r" +
    "\n" +
    "        ng-click=\"updateInterval($event);\r" +
    "\n" +
    "        $hide()\">\r" +
    "\n" +
    "        Save\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "</form>"
  );


  $templateCache.put('templates/indicatorBandPopoverTemplate.html',
    "<div class=\"popover\" style=\"color:black\" ng-click=\"$event.stopPropagation();\">\r" +
    "\n" +
    "  <div class=\"arrow\"></div>\r" +
    "\n" +
    "  <div>\r" +
    "\n" +
    "      <h3 class=\"popover-title\"  ng-show=\"title\">\r" +
    "\n" +
    "          {{title}}\r" +
    "\n" +
    "      </h3>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  </h3>\r" +
    "\n" +
    "  <div class=\"popover-content\" ng-bind=\"content\"></div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBandTemplate.html',
    "<div class=\"row\">\r" +
    "\n" +
    "    <div class=\"col-lg-12 col-md-12\">\r" +
    "\n" +
    "        <div class=\"row\">\r" +
    "\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\" style=\"padding-right:5px;width:12.5%\">\r" +
    "\n" +
    "<!--                we use the previous-interval binding to bind the upperBoundary\r" +
    "\n" +
    "                to this element. this is necessary to correctly set the labels. \r" +
    "\n" +
    "                see also \r" +
    "\n" +
    "                https://github.com/crismaproject/worldstate-analysis-widgets/issues/36-->\r" +
    "\n" +
    "                <div class=\"progress\">\r" +
    "\n" +
    "                    <indicator-band-item \r" +
    "\n" +
    "                        interval=\"criteriaFunction.lowerBoundary\" \r" +
    "\n" +
    "                        previous-interval=\"criteriaFunction.upperBoundary\"\r" +
    "\n" +
    "                        lower-boundary=\"true\"\r" +
    "\n" +
    "                        on-interval-changed=\"updateLowerBoundary(indicatorValue)\"\r" +
    "\n" +
    "                        title=\"Criteria / Indicator values\">\r" +
    "\n" +
    "                    </indicator-band-item>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-9 col-md-9 col-sm-9\">\r" +
    "\n" +
    "                <div class=\"row\">\r" +
    "\n" +
    "                    <div class=\"progress\">\r" +
    "\n" +
    "                        <indicator-band-item \r" +
    "\n" +
    "                            ng-repeat=\"interval in criteriaFunction.intervals\"\r" +
    "\n" +
    "                            interval=\"interval\"\r" +
    "\n" +
    "                            previous-interval=\"$first ? criteriaFunction.lowerBoundary : criteriaFunction.intervals[$index-1]\"\r" +
    "\n" +
    "                            first=\"$first\"\r" +
    "\n" +
    "                            delete-interval=\"deleteInterval(interval)\"\r" +
    "\n" +
    "                            on-interval-changed=\"createInterval(criteriaValue,indicatorValue)\"\r" +
    "\n" +
    "                            get-color=\"getIntervalColor(interval)\"\r" +
    "\n" +
    "                            >\r" +
    "\n" +
    "                        </indicator-band-item>\r" +
    "\n" +
    "                        <indicator-band-item \r" +
    "\n" +
    "                            interval=\"criteriaFunction.upperBoundary\" \r" +
    "\n" +
    "                            previous-interval=\"criteriaFunction.intervals[criteriaFunction.intervals.length-1] || criteriaFunction.lowerBoundary\"\r" +
    "\n" +
    "                            last=\"true\"\r" +
    "\n" +
    "                            first=\"criteriaFunction.intervals.length<=0\"\r" +
    "\n" +
    "                            on-interval-changed=\"createInterval(criteriaValue,indicatorValue)\"\r" +
    "\n" +
    "                            get-color=\"getIntervalColor(interval)\"\r" +
    "\n" +
    "                            >\r" +
    "\n" +
    "                        </indicator-band-item>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"row\" style=\"min-height: 20px;\">\r" +
    "\n" +
    "                    <div class=\"intervalMarker\" ng-style=\"getIntervalWidth(interval, criteriaFunction.intervals[$index - 1])\" ng-repeat=\"interval in criteriaFunction.intervals\">\r" +
    "\n" +
    "                        <span class=\"glyphicon glyphicon-chevron-up\" style=\"width:16px;float:right;margin-right: -8px;\"></span>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"col-lg-2 col-md-2 col-sm-2\"  style=\"padding-left:5px;width: 12.5%\">\r" +
    "\n" +
    "                <!-- we use the previous-interval binding to bind the lowerBoundary\r" +
    "\n" +
    "                to this element. this is necessary to correctly set the labels. \r" +
    "\n" +
    "                see also \r" +
    "\n" +
    "                https://github.com/crismaproject/worldstate-analysis-widgets/issues/36-->\r" +
    "\n" +
    "                <div class=\"progress\">\r" +
    "\n" +
    "                    <indicator-band-item \r" +
    "\n" +
    "                        interval=\"criteriaFunction.upperBoundary\" \r" +
    "\n" +
    "                        previous-interval=\"criteriaFunction.lowerBoundary\"\r" +
    "\n" +
    "                        upper-boundary=\"true\"\r" +
    "\n" +
    "                        on-interval-changed=\"updateUpperBoundary(indicatorValue)\"\r" +
    "\n" +
    "                        title=\"Criteria / Indicator values\">\r" +
    "\n" +
    "                    </indicator-band-item>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorBarChartTemplate.html',
    "<div>\r" +
    "\n" +
    "    <div class=\"row\"ng-if=\"!worldstates || worldstates.length <= 0\">\r" +
    "\n" +
    "        <div class=\"col-lg-12\">\r" +
    "\n" +
    "            <div ng-hide=\"worldstates.length > 0\" class=\"alert alert-warning\">\r" +
    "\n" +
    "                <strong>Warning: </strong>There are no worldstates selected.\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" ng-if=\"worldstates && worldstates.length > 0\" >\r" +
    "\n" +
    "        <div class=\"col-lg-12\" style=\"text-align: center; margin: 20px 0px;\">\r" +
    "\n" +
    "            <span ng-repeat=\"ws in worldstates\" style=\"margin:0px 10px;\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-stop\" ng-style=\"getLegendColor($index)\"></i>{{ws.name}}\r" +
    "\n" +
    "            </span>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\" ng-if=\"worldstates && worldstates.length > 0\">\r" +
    "\n" +
    "        <div class=\"col-lg-4 col-md-6 col-sm-6\"  ng-repeat=\"chartModel in chartModels\">\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <div class=\"col-lg-12\" style=\"text-align: center\">\r" +
    "\n" +
    "                    <label>{{chartModel[0].key}}</label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"row\">\r" +
    "\n" +
    "                <div class=\"col-lg-12\" nvd3-discrete-bar-chart style=\"margin-top: -40px;\"\r" +
    "\n" +
    "                     data=\"chartModel\"\r" +
    "\n" +
    "                     width=\"400\"\r" +
    "\n" +
    "                     height=\"200\"\r" +
    "\n" +
    "                     showXAxis=\"false\"\r" +
    "\n" +
    "                     showYAxis=\"true\"\r" +
    "\n" +
    "                     interactive=\"true\"\r" +
    "\n" +
    "                     showValues=\"true\"\r" +
    "\n" +
    "                     staggerlabels=\"true\"\r" +
    "\n" +
    "                     forceY=\"{{chartModel.forceY}}\"\r" +
    "\n" +
    "                     yaxistickformat=\"yAxisTickFormat\"\r" +
    "\n" +
    "                     valueFormat=\"yAxisTickFormat\"\r" +
    "\n" +
    "                     color=\"colorFunction()\"\r" +
    "\n" +
    "                     tooltips=\"true\"\r" +
    "\n" +
    "                     tooltipcontent=\"toolTipContentFunction()\">\r" +
    "\n" +
    "                    <svg></svg>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorCriteriaAxisChooserTemplate.html',
    "<div class=\"btn-group\"  dropdown>\r" +
    "\n" +
    "    <button type=\"button\" \r" +
    "\n" +
    "            class=\"btn btn-default btn-sm\">\r" +
    "\n" +
    "        <img ng-src=\"{{selectedAxis.icon}}\" style=\"margin-right:5px;float:left\"/>{{selectedAxis.name}}\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "    <button type=\"button\" class=\"btn btn-default btn-sm dropdown-toggle\">\r" +
    "\n" +
    "        <span class=\"caret\"></span>\r" +
    "\n" +
    "        <span class=\"sr-only\">Toggle Dropdown</span>\r" +
    "\n" +
    "    </button>\r" +
    "\n" +
    "     <ul class=\"dropdown-menu\" role=\"menu\" >\r" +
    "\n" +
    "        <li ng-repeat=\"scale in scales\" role=\"presentation\" ng-click=\"axisSelected($index)\" ng-class=\"{'dropdown-header':scale.isGroup}\">\r" +
    "\n" +
    "            <a ng-if=\"!scale.isGroup\">{{scale.name}}</a>\r" +
    "\n" +
    "            <img ng-if=\"scale.isGroup\" ng-src=\"{{scale.icon}}\" style=\"margin-right:5px;float:left\"/>\r" +
    "\n" +
    "            <span ng-if=\"scale.isGroup\" style=\"margin-top: 4px\">{{scale.name}}</span>\r" +
    "\n" +
    "        </li>\r" +
    "\n" +
    "    </ul>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/indicatorCriteriaTableHeader.html',
    "<tr>\r" +
    "\n" +
    "    <th ng-repeat=\"column in columns\" class=\"text-left\" ng-style=\"getCellStyle($index)\">\r" +
    "\n" +
    "        {{column.title}}\r" +
    "\n" +
    "    </th>\r" +
    "\n" +
    "</tr>"
  );


  $templateCache.put('templates/indicatorCriteriaTableTemplate.html',
    "<div id=\"indicatorCriteriaTable\">\r" +
    "\n" +
    "    <div ng-if=\"!(worldstates.length > 0)\" class=\"alert alert-warning\">\r" +
    "\n" +
    "        <strong>Warning: </strong>There are no worldstates selected.\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"forCriteria && !criteriaFunction\" class=\"alert alert-warning\">\r" +
    "\n" +
    "        <strong>Warning: </strong>No criteria function selected.\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-show=\"!(worldstates.length <= 0 || (forCriteria && !criteriaFunction))\">\r" +
    "\n" +
    "        <table  data-ng-table=\"tableParams\" class=\"table\" template-pagination=\"templates/nopager.html\"  template-header=\"templates/indicatorCriteriaTableHeader.html\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "                <tr data-ng-repeat=\"row in $data\" ng-class=\"{'info':isGroupRow(row)}\" \r" +
    "\n" +
    "                    ng-style=\"getRowStyle($index)\">\r" +
    "\n" +
    "                    <td data-ng-repeat=\"col in columns\" ng-style=\"getCellStyle($index)\">\r" +
    "\n" +
    "                        <img ng-if=\"isGroupRow(row) || detailIcons\" ng-src=\"{{row[col.field].icon}}\"/>\r" +
    "\n" +
    "                        {{row[col.field].name}}\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>  \r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/levelOfEmphasisTemplate.html',
    "<div class=\"panel panel-default\">\r" +
    "\n" +
    "    <div class=\"panel-heading\" style=\" white-space: nowrap;\r" +
    "\n" +
    "         overflow: hidden;\r" +
    "\n" +
    "         text-overflow: ellipsis;\">\r" +
    "\n" +
    "        Level of satisfaction emphasis\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"panel-body\" >\r" +
    "\n" +
    "        <div ng-if=\"!expertMode && indicatorSize>=1\">\r" +
    "\n" +
    "            <form name=\"myForm\" >\r" +
    "\n" +
    "\r" +
    "\n" +
    "                <div class=\"radio\">\r" +
    "\n" +
    "                    <label>\r" +
    "\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"2\">\r" +
    "\n" +
    "                        only positive\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"radio\">\r" +
    "\n" +
    "                    <label>\r" +
    "\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"1\">\r" +
    "\n" +
    "                        over-emphasise positives\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"radio\">\r" +
    "\n" +
    "                    <label>\r" +
    "\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"0\" checked=\"true\">\r" +
    "\n" +
    "                        neutral\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"radio\">\r" +
    "\n" +
    "                    <label>\r" +
    "\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\"  value=\"-1\">\r" +
    "\n" +
    "                        over-emphasise negatives\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"radio\">\r" +
    "\n" +
    "                    <label>\r" +
    "\n" +
    "                        <input type=\"radio\" ng-model=\"model.lse\" value=\"-2\">\r" +
    "\n" +
    "                        only negative\r" +
    "\n" +
    "                    </label>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </form>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div ng-if=\"expertMode\">\r" +
    "\n" +
    "            <div class=\"alert alert-warning\" role=\"alert\">Expert Mode not yet implemented!</div>    \r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('templates/nopager.html',
    ""
  );


  $templateCache.put('templates/rankingTableHeader.html',
    "<tr>\r" +
    "\n" +
    "    <th ng-repeat=\"column in columns\"\r" +
    "\n" +
    "        ng-if=\"$index < 3\"\r" +
    "\n" +
    "        >\r" +
    "\n" +
    "        {{column.title}}\r" +
    "\n" +
    "    </th>\r" +
    "\n" +
    "    <th ng-if=\"showRadarChart\">\r" +
    "\n" +
    "        Criteria radar\r" +
    "\n" +
    "    </th>\r" +
    "\n" +
    "    <th ng-repeat=\"column in columns\"\r" +
    "\n" +
    "        ng-if=\"showIndicators && $index >= 3\"\r" +
    "\n" +
    "        >\r" +
    "\n" +
    "        {{column.title}}\r" +
    "\n" +
    "    </th>\r" +
    "\n" +
    "</tr>"
  );


  $templateCache.put('templates/relationAnalysisChartTemplate.html',
    "<div class=\"col-lg-12\">\r" +
    "\n" +
    "    <style>\r" +
    "\n" +
    "        .nvd3 .nv-axis.nv-x path.domain {\r" +
    "\n" +
    "            stroke-opacity: .75;\r" +
    "\n" +
    "        }\r" +
    "\n" +
    "    </style>\r" +
    "\n" +
    "    <div  ng-hide=\"worldstates().length > 0\" class=\"row\">\r" +
    "\n" +
    "        <!--two dropdowns for x and y axis-->\r" +
    "\n" +
    "        <div class=\"alert alert-warning\">\r" +
    "\n" +
    "            <strong>Warning: </strong>There are no worldstates selected.\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div  ng-hide=\"!(worldstates() && worldstates().length > 0)\" class=\"row\">\r" +
    "\n" +
    "        <!--two dropdowns for x and y axis-->\r" +
    "\n" +
    "        <div style=\"float: right;margin-bottom: 10px;\">\r" +
    "\n" +
    "            <indicator-criteria-axis-chooser is-x-axis=\"false\" icc-object=\"iccObject\" selected-axis=\"yAxis\"></indicator-criteria-axis-chooser>\r" +
    "\n" +
    "            <indicator-criteria-axis-chooser is-x-axis=\"true\" icc-object=\"iccObject\" selected-axis=\"xAxis\"></indicator-criteria-axis-chooser>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div  ng-hide=\"!(worldstates() && worldstates().length > 0)\" class=\"row\"> \r" +
    "\n" +
    "        <!--chart-->\r" +
    "\n" +
    "        <div class=\"col-lg-12\" ng-hide=\"forCriteria && !(yAxisCriteriaFunction && xAxisCriteriaFunction)\">\r" +
    "\n" +
    "            <div nvd3-scatter-chart\r" +
    "\n" +
    "                 data=\"chartdata\"\r" +
    "\n" +
    "                 showLegend=\"true\"\r" +
    "\n" +
    "                 interactive=\"true\"\r" +
    "\n" +
    "                 tooltips=\"true\"\r" +
    "\n" +
    "                 sizerange=\"[80,80]\"\r" +
    "\n" +
    "                 zscale=\"zScale\"\r" +
    "\n" +
    "                 showDistX=\"true\"\r" +
    "\n" +
    "                 showDistY=\"true\"\r" +
    "\n" +
    "                 xaxislabel=\"{{xAxis.name}}\"\r" +
    "\n" +
    "                 yaxislabel=\"{{yAxis.name}}\"\r" +
    "\n" +
    "                 margin='{left:90,top:0,bottom:50,right:50}'\r" +
    "\n" +
    "                 yAxisTickFormat=\"yAxisTickFormatFunction()\"\r" +
    "\n" +
    "                 xAxisTickFormat=\"xAxisTickFormatFunction()\"\r" +
    "\n" +
    "                 height=\"{{chartHeight}}\"\r" +
    "\n" +
    "                 >\r" +
    "\n" +
    "                <svg></svg>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"col-lg-12\" ng-hide=\"!forCriteria || (yAxisCriteriaFunction && xAxisCriteriaFunction)\" >\r" +
    "\n" +
    "            <div class=\"alert alert-warning\">\r" +
    "\n" +
    "                <strong>Warning: </strong>No criteria function selected.\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );


  $templateCache.put('templates/worldstateAnalysisWidgetTemplate.html',
    "<div class=\"col-lg-12\">\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\" style=\"display:table;width:100%\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-list-alt\"></i>\r" +
    "\n" +
    "                <h3 style=\"display:table-cell;vertical-align: middle\r" +
    "\n" +
    "                    \" class=\"panel-title\">Worldstate ranking table</h3>\r" +
    "\n" +
    "                <div class=\"pull-right\">\r" +
    "\n" +
    "                    <div class=\"input-group \">\r" +
    "\n" +
    "                        <div class=\"input-group-btn \" style=\"display: block\" ng-click=\"persistDecisionStrategies()\">\r" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"disabled\">\r" +
    "\n" +
    "                                Change Mode <span class=\"caret\"></span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                            <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                                <li style=\"padding-left: 10px;\"> \r" +
    "\n" +
    "                                    <input type=\"checkbox\" ng-model=\"showTableIndicators\"> Show Indicators\r" +
    "\n" +
    "                                </li>\r" +
    "\n" +
    "                                <li style=\"padding-left: 10px;\"> \r" +
    "\n" +
    "                                    <input type=\"checkbox\" ng-model=\"showTableRadarChart\"> Show radar chart\r" +
    "\n" +
    "                                </li>\r" +
    "\n" +
    "                            </ul>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <worldstate-ranking-table \r" +
    "\n" +
    "                    worldstates=\"worldstates\"\r" +
    "\n" +
    "                    criteria-function=\"selectedCriteriaFunction\"\r" +
    "\n" +
    "                    decision-strategy=\"selectedDecisionStrategy\"\r" +
    "\n" +
    "                    show-indicators=\"showTableIndicators\"\r" +
    "\n" +
    "                    show-radar-chart=\"showTableRadarChart\">  \r" +
    "\n" +
    "                </worldstate-ranking-table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <span class=\"pull-left\">\r" +
    "\n" +
    "                    <i class=\"glyphicon glyphicon-list-alt\"></i>\r" +
    "\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\" ng-if=\"!forCriteriaTable\">Indicator table</h3>\r" +
    "\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\" ng-if=\"forCriteriaTable\">Criteria table</h3>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span class=\"pull-right\">\r" +
    "\n" +
    "                    <div class=\"btn-group\">\r" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"disabled\">\r" +
    "\n" +
    "                            Change Mode <span class=\"caret\"></span>\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                            <li><a ng-click=\"forCriteriaTable = false\"><i ng-show=\"!forCriteriaTable\" class=\"glyphicon glyphicon-ok-circle\"></i> <span ng-style=\"{\r" +
    "\n" +
    "                                                        'padding-left'\r" +
    "\n" +
    "                                                        : !forCriteriaTable? '0px': '19px'}\">Indicator</span></a></li>\r" +
    "\n" +
    "                            <li><a ng-click=\"forCriteriaTable = true\"><i ng-show=\"forCriteriaTable\" class=\"glyphicon glyphicon-ok-circle\"> </i>  <span ng-style=\"{\r" +
    "\n" +
    "                                                        'padding-left'\r" +
    "\n" +
    "                                                        : forCriteriaTable? '0px': '19px'}\">Criteria</span></a></li>\r" +
    "\n" +
    "                        </ul>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span class=\"clearfix\"></span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <indicator-criteria-table worldstates='worldstates' \r" +
    "\n" +
    "                                          for-criteria='forCriteriaTable'\r" +
    "\n" +
    "                                          criteria-function=\"selectedCriteriaFunction\"\r" +
    "\n" +
    "                                          >\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </indicator-criteria-table>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <i class=\"glyphicon glyphicon-stats\"></i>\r" +
    "\n" +
    "                <h3 style=\"display:inline\" class=\"panel-title\" >Indicator bar charts</h3>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <indicator-bar-charts\r" +
    "\n" +
    "                    worldstates=\"worldstates\"\r" +
    "\n" +
    "                    >\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </indicator-bar-charts>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <!-- end widget -->\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <span class=\"pull-left\">\r" +
    "\n" +
    "                    <span class=\"widget-icon\"> <i class=\"fa fa-table\"></i> </span>\r" +
    "\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\">Worldstate relation analysis chart</h3>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span class=\"pull-right\">\r" +
    "\n" +
    "                    <div class=\"btn-group\">\r" +
    "\n" +
    "                        <button type=\"button\" class=\"btn btn-sm btn-primary dropdown-toggle\" data-toggle=\"dropdown\" ng-disabled=\"disabled\">\r" +
    "\n" +
    "                            Change Mode <span class=\"caret\"></span>\r" +
    "\n" +
    "                        </button>\r" +
    "\n" +
    "                        <ul class=\"dropdown-menu\" role=\"menu\">\r" +
    "\n" +
    "                            <li><a ng-click=\"isCriteria = false\"><i ng-show=\"!isCriteria\" class=\"glyphicon glyphicon-ok-circle\"></i> <span ng-style=\"{\r" +
    "\n" +
    "                                                        'padding-left'\r" +
    "\n" +
    "                                                        : !isCriteria? '0px': '19px'}\">Indicator</span></a></li>\r" +
    "\n" +
    "                            <li><a ng-click=\"isCriteria = true\"><i ng-show=\"isCriteria\" class=\"glyphicon glyphicon-ok-circle\"> </i>  <span ng-style=\"{\r" +
    "\n" +
    "                                                        'padding-left'\r" +
    "\n" +
    "                                                        : isCriteria? '0px': '19px'}\">Criteria</span></a></li>\r" +
    "\n" +
    "                        </ul>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span class=\"clearfix\"></span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <relation-analysis-chart style=\"padding-left:50px\" height=\"350\" \r" +
    "\n" +
    "                                         for-criteria='isCriteria' \r" +
    "\n" +
    "                                         worldstates=\"worldstates\"\r" +
    "\n" +
    "                                         criteria-function=\"selectedCriteriaFunction\"\r" +
    "\n" +
    "                                         >\r" +
    "\n" +
    "                </relation-analysis-chart>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\">\r" +
    "\n" +
    "                <span class=\"pull-left\">\r" +
    "\n" +
    "                    <span class=\"widget-icon\"> <i class=\"fa fa-table\"></i> </span>\r" +
    "\n" +
    "                    <h3 style=\"display:inline\" class=\"panel-title\">Criteria radar chart comparison</h3>\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span class=\"pull-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </span>\r" +
    "\n" +
    "                <span class=\"clearfix\"></span>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <div class=\"col-lg-3\">\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "                        <label>Reference Worldstate</label>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        <select multiple=\"\" ng-model=\"worldstateRef\" \r" +
    "\n" +
    "                                ng-options=\"ws.name for ws in allWorldstates\"\r" +
    "\n" +
    "                                style=\"width: 100%;height: 100%\">\r" +
    "\n" +
    "                        </select>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col-lg-9\">\r" +
    "\n" +
    "                    <div class=\"row\">\r" +
    "\n" +
    "                        <div class=\"col-lg-4\" ng-repeat=\"chartModel in chartModels\">\r" +
    "\n" +
    "                            <div class=\"panel panel-default\">\r" +
    "\n" +
    "                                <div class=\"panel-heading\">\r" +
    "\n" +
    "                                    <h3 class=\"panel-title ng-binding\">\r" +
    "\n" +
    "                                        <i class=\"fa fa-globe\"></i>\r" +
    "\n" +
    "                                        {{chartModel[0].name}}</h3>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                                <div class=\"panel-body no-padding text-align-center\">\r" +
    "\n" +
    "                                    <div style=\"margin: 0 auto; padding-top: 20px\"  \r" +
    "\n" +
    "                                         criteria-radar \r" +
    "\n" +
    "                                         worldstates=\"chartModel\"\r" +
    "\n" +
    "                                         criteria-function=\"selectedCriteriaFunction\"\r" +
    "\n" +
    "                                         show-legend=\"true\"\r" +
    "\n" +
    "                                         show-axis-text=true\r" +
    "\n" +
    "                                         >\r" +
    "\n" +
    "                                    </div>\r" +
    "\n" +
    "                                </div>\r" +
    "\n" +
    "                            </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\" style=\"display:table;width:100%\">\r" +
    "\n" +
    "                <h3 style=\"display:table-cell;vertical-align: middle\r" +
    "\n" +
    "                    \" class=\"panel-title\">Decision strategies</h3>\r" +
    "\n" +
    "                <div class=\"pull-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"input-group \">\r" +
    "\n" +
    "                        <div class=\"input-group-btn \" style=\"display: block\" ng-click=\"persistDecisionStrategies()\">\r" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-success btn-sm\" style=\"min-width: 80px;\">\r" +
    "\n" +
    "                                <span style=\"display:block;float:left\">\r" +
    "\n" +
    "                                    <i ng-if=\"!showDsPersistSpinner && !showDsPersistDone\" class=\"glyphicon glyphicon-floppy-disk\"></i>\r" +
    "\n" +
    "                                    <i ng-if=\"showDsPersistSpinner\" class=\"spin glyphicon glyphicon-refresh\" ></i>\r" +
    "\n" +
    "                                    <i ng-if=\"showDsPersistDone\" class=\"glyphicon glyphicon-ok\"></i>\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                <span style=\"display:block;float:right\">\r" +
    "\n" +
    "                                    Persist\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <decision-strategy-manager worldstates=\"worldstates\" decision-strategies=\"decisionStrategies\"></decision-strategy-manager>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading\" style=\"display:table;width:100%\">\r" +
    "\n" +
    "                <h3 style=\"display:table-cell;vertical-align: middle\r" +
    "\n" +
    "                    \" class=\"panel-title\">Criteria functions</h3>\r" +
    "\n" +
    "                <div class=\"pull-right\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "                    <div class=\"input-group \">\r" +
    "\n" +
    "                        <div class=\"input-group-btn \" style=\"display: block\" ng-click=\"persistCriteriaFunctions()\">\r" +
    "\n" +
    "                            <button type=\"button\" class=\"btn btn-success btn-sm\" style=\"min-width: 80px;\">\r" +
    "\n" +
    "                                <span style=\"display:block;float:left\">\r" +
    "\n" +
    "                                    <i ng-if=\"!showPersistSpinner && !showPersistDone\" class=\"glyphicon glyphicon-floppy-disk\"></i>\r" +
    "\n" +
    "                                    <i ng-if=\"showPersistSpinner\" class=\"spin glyphicon glyphicon-refresh\" ></i>\r" +
    "\n" +
    "                                    <i ng-if=\"showPersistDone\" class=\"glyphicon glyphicon-ok\"></i>\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                                <span style=\"display:block;float:right\">\r" +
    "\n" +
    "                                    Persist\r" +
    "\n" +
    "                                </span>\r" +
    "\n" +
    "                            </button>\r" +
    "\n" +
    "                        </div>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body\">\r" +
    "\n" +
    "                <criteria-function-manager worldstates=\"worldstates\"  criteria-functions=\"criteriaFunctionSets\"></criteria-function-manager>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "\r" +
    "\n" +
    "</div>\r" +
    "\n" +
    "<!-- end widget -->"
  );


  $templateCache.put('templates/worldstateRankingTableTemplate.html',
    "<div id=\"worldstateRankingTable\" style=\"overflow-x: auto\">\r" +
    "\n" +
    "\r" +
    "\n" +
    "    <div ng-if=\"!(worldstates.length > 0)\" class=\"alert alert-warning\">\r" +
    "\n" +
    "        <strong>Warning: </strong>There are no worldstates selected.\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"!(criteriaFunction || worldstates.length <= 0)\" class=\"alert alert-warning\">\r" +
    "\n" +
    "        <strong>Warning: </strong>No criteria function selected.\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-if=\"!(decisionStrategy || worldstates.length <= 0)\" class=\"alert alert-warning\">\r" +
    "\n" +
    "        <strong>Warning: </strong>No decision strategy selected.\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div ng-show=\"((worldstates.length > 0) && criteriaFunction && decisionStrategy)\">\r" +
    "\n" +
    "        <table  \r" +
    "\n" +
    "            ng-table=\"tableParams\"\r" +
    "\n" +
    "            template-header=\"templates/rankingTableHeader.html\"\r" +
    "\n" +
    "            show-filter=\"false\" \r" +
    "\n" +
    "            class=\"table table-striped\"\r" +
    "\n" +
    "            style=\"white-space: nowrap\">\r" +
    "\n" +
    "            <tbody>\r" +
    "\n" +
    "                <tr ng-repeat=\"item in $data\">\r" +
    "\n" +
    "                    <td ng-repeat=\"col in columns\" ng-if=\"$index < 3\" style=\"vertical-align: middle\">\r" +
    "\n" +
    "                        {{item[col.field]}}\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                    <td ng-if=\"showRadarChart\"\r" +
    "\n" +
    "                        style=\"min-width:150px; width:150px; margin: 0 auto; padding-top: 20px\" \r" +
    "\n" +
    "                        criteria-radar \r" +
    "\n" +
    "                        worldstates=\"[item.ws]\" \r" +
    "\n" +
    "                        show-legend=\"false\"\r" +
    "\n" +
    "                        show-axis-text=\"true\"\r" +
    "\n" +
    "                        use-numbers=\"true\"\r" +
    "\n" +
    "                        criteria-function=\"criteriaFunction\"\r" +
    "\n" +
    "                        ng-click=\"clickToOpen($index)\"\r" +
    "\n" +
    "                        >\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "                    <td ng-repeat=\"col in columns\"  ng-if=\"showIndicators && $index >= 3\" style=\"vertical-align: middle\">\r" +
    "\n" +
    "                        <span>\r" +
    "\n" +
    "                            {{item[col.field].indicator}}\r" +
    "\n" +
    "                            <br/>\r" +
    "\n" +
    "                            {{item[col.field].los}}\r" +
    "\n" +
    "                        </span>\r" +
    "\n" +
    "                    </td>\r" +
    "\n" +
    "\r" +
    "\n" +
    "                </tr>\r" +
    "\n" +
    "            </tbody>\r" +
    "\n" +
    "        </table>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>"
  );

}]);
