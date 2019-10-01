// Karma configuration
// http://karma-runner.github.io/0.10/config/configuration-file.html

module.exports = function (config) {
config.set({
// base path, that will be used to resolve files and exclude
basePath: '',
    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],
//    plugins: [
//        // these plugins will be require() by Karma
//        'karma-ng-html2js-preprocessor',
//        ],
    // list of files / patterns to load in the browser
    files: [
        'target/dist/bower_components/es5-shim/es5-shim.js',
        'target/dist/bower_components/json3/lib/json3.min.js',
        'target/dist/bower_components/jquery/dist/jquery.js',
        'target/dist/bower_components/jquery-ui/ui/jquery-ui.js',
        'target/dist/bower_components/dynatree/dist/jquery.dynatree.js',
        'target/dist/bower_components/jquery-knob/js/jquery.knob.js',
        'target/dist/bower_components/bootstrap/dist/js/bootstrap.js',
        'target/dist/bower_components/angular/angular.js',
        'target/dist/bower_components/angular-resource/angular-resource.js',
        'target/dist/bower_components/angular-cookies/angular-cookies.min.js',
        'target/dist/bower_components/ng-table/ng-table.js',
        'target/dist/bower_components/angular-bootstrap/ui-bootstrap.js',
        'target/dist/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
        'target/dist/bower_components/angular-strap/dist/angular-strap.js',
        'target/dist/bower_components/angular-strap/dist/angular-strap.tpl.js',
        'target/dist/bower_components/angular-commons/dist/scripts/angular-commons.js',
        'target/dist/bower_components/icmm_js/dist/scripts/icmm_js.js',
        'target/dist/bower_components/crisma-worldstate-tree-widget-angular/dist/scripts/crisma-worldstate-tree-widget-angular.js',
        'target/dist/bower_components/crisma-worldstate-tree-widget-angular/dist/scripts/crisma-worldstate-tree-widget-angular-tpl.js',
        'target/dist/bower_components/d3/d3.js',
        'target/dist/bower_components/radar-chart-d3/src/radar-chart.js',
        'target/dist/bower_components/nvd3/nv.d3.js',
        'target/dist/bower_components/angularjs-nvd3-directives/dist/angularjs-nvd3-directives.js',
        'target/dist/bower_components/ngDialog/js/ngDialog.js',
        'target/dist/scripts/app.js',
        'target/dist/scripts/controllers/_module.js',
        'target/dist/scripts/directives/_module.js',
        'target/dist/scripts/services/_module.js',
        'target/dist/scripts/controllers/mainController.js',
        'target/dist/scripts/controllers/indicatorCriteriaTableDirectiveController.js',
        'target/dist/scripts/directives/indicatorCriteriaTableDirective.js',
        'target/dist/scripts/directives/angularKnob.js',
        'target/dist/scripts/controllers/criteriaRadarChartDirectiveController.js',
        'target/dist/scripts/directives/criteriaRadarChartDirective.js',
        'target/dist/scripts/controllers/indicatorCriteriaAxisChooserDirectiveController.js',
        'target/dist/scripts/directives/indicatorCriteriaAxisChooserDirective.js',
        'target/dist/scripts/controllers/relationAnalysisChartDirectiveController.js',
        'target/dist/scripts/directives/relationAnalysisChartDirective.js',
        'target/dist/scripts/controllers/indicatorBandDirectiveController.js',
        'target/dist/scripts/controllers/indicatorBandItemDirectiveController.js',
        'target/dist/scripts/directives/indicatorBandDirective.js',
        'target/dist/scripts/controllers/criteriaFunctionManagerDirectiveController.js',
        'target/dist/scripts/directives/criteriaFunctionManagerDirective.js',
        'target/dist/scripts/services/analysisService.js',
        'target/dist/scripts/services/criteriaCalculationService.js',
        'target/dist/scripts/controllers/worldstateAnalysisWidgetDirectiveController.js',
        'target/dist/scripts/directives/worldstateAnalysisWidget.js',
        'target/dist/scripts/controllers/levelOfEmphasisDirectiveController.js',
        'target/dist/scripts/directives/levelOfEmphasisDirective.js',
        'target/dist/scripts/controllers/criteriaEmphasesDirectiveController.js',
        'target/dist/scripts/directives/criteriaEmphasesDirective.js',
        'target/dist/scripts/controllers/decisionStrategyDirectiveController.js',
        'target/dist/scripts/directives/decisionStrategyDirective.js',
        'target/dist/scripts/controllers/decisionStrategyManagerDirectiveController.js',
        'target/dist/scripts/directives/decisionStrategyManagerDirective.js',
        'target/dist/scripts/controllers/worldstateRankingTableDirectiveController.js',
        'target/dist/scripts/directives/worldstateRankingTableDirective.js',
        'target/dist/scripts/controllers/indicatorBarChartDirectiveController.js',
        'target/dist/scripts/directives/indicatorBarChartDirective.js',
        'target/dist/scripts/directives/fileReader.js',
        'target/dist/scripts/controllers/fileContextProviderDirectiveController.js',
        'target/dist/scripts/directives/fileBasedAnalysisContextProvider.js',
        'target/dist/scripts/services/filesPersistanceService.js',
        'target/dist/scripts/controllers/icmmContextProviderDirectiveController.js',
        'target/dist/scripts/directives/icmmBasedAnalysisContextProvider.js',
        'target/dist/scripts/services/icmmPersistanceService.js',
        'target/dist/scripts/services/icmmCriteriaFunctions.js',
        'target/dist/scripts/services/icmmDecisionStrategies.js',
        'target/dist/scripts/services/drupalService.js',
        'target/dist/scripts/controllers/drupalContextProviderDirectiveController.js',
        'target/dist/bower_components/angular-mocks/angular-mocks.js',
        'app/templates/criteriaEmphasesTemplate.html',
        'app/templates/criteriaFunctionManagerTemplate.html',
        'app/templates/criteriaRadarPopupTemplate.html',
        'app/templates/decisionStrategyManagerTemplate.html',
        'app/templates/decisionStrategyTemplate.html',
        'app/templates/drupalContextProviderTemplate.html',
        'app/templates/fileContextProviderTemplate.html',
        'app/templates/icmmContextProviderTemplate.html',
        'app/templates/indicatorBandItemTemplate.html',
        'app/templates/indicatorBandPopoverContentTemplate.html',
        'app/templates/indicatorBandPopoverTemplate.html',
        'app/templates/indicatorBandTemplate.html',
        'app/templates/indicatorBarChartTemplate.html',
        'app/templates/indicatorCriteriaAxisChooserTemplate.html',
        'app/templates/indicatorCriteriaTableHeader.html',
        'app/templates/indicatorCriteriaTableTemplate.html',
        'app/templates/levelOfEmphasisTemplate.html',
        'app/templates/nopager.html',
        'app/templates/rankingTableHeader.html',
        'app/templates/relationAnalysisChartTemplate.html',
        'app/templates/worldstateAnalysisWidgetTemplate.html',
        'app/templates/worldstateRankingTableTemplate.html',
        'test/spec/controllers/CriteriaRadarChartDirectiveTest.js',
        'test/spec/controllers/IndiciatorCriteriaTableDirectiveControllerTest.js',
        'test/spec/controllers/RelationAnalysisChartDirectiveControllerTest.js',
        'test/spec/controllers/indicatorBandDirectiveTests.js',
        'test/spec/controllers/indicatorBarChartTests.js',
        'test/spec/controllers/worldstateRankingTableTests.js',
        'test/spec/services/AnalysisServiceTest.js',
        'test/spec/services/CriteriaCalculationServiceTests.js'
    ],
    preprocessors: {
    'app/templates/*.html': 'ng-html2js'
    },
    ngHtml2JsPreprocessor: {
    stripPrefix: 'app/'
    },
    // list of files / patterns to exclude
    exclude: [],
    // web server port
    port: 8080,
    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,
    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['PhantomJS'],
    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,
    
    reporters: ['progress', 'junit'],
    junitReporter: {
        outputFile: 'test-results.xml'
    }
});
    };
