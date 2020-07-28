Scenario Analysis Component  [![Zenodo](https://zenodo.org/badge/DOI/10.5281/zenodo.3862012.svg)](https://zenodo.org/record/3862012)
===========================

This is the [AngularJS (version 1.x)](https://angularjs.org/) implementation of the Scenario Comparison and Analysis and the Multi-Criteria-Analysis and Decision Support Functional Building Block based on [CRISMA Worldstate Analysis Widgets](https://github.com/crismaproject/worldstate-analysis-widgets).

## Description

The Multi Criteria Decision Analysis Tool supports the analysis and comparison of (adaptation) scenarios regarding performance indicators that can be defined by the end user and thus leverages what-if decision support to investigate the effects of adaptation measures and risk reduction options in the specific project context, and allows the comparison of alternative strategies. Thereby the tool provides multi-criteria ranking functions to compare and rank different scenarios and corresponding adaptation plans according to different criteria and their relative weight and level of importance. More information can be found [here](https://clarity-h2020.github.io/csis-architecture/docs/building-blocks/Multi-Criteria-Decision-Analysis-Tool).

## Implementation

### JavaScript API
The Scenario Analysis Component exposes a JavaScript "API" which is fed by [seamless.js iFrame integration](https://github.com/travist/seamless.js/) when embedded in Drupal. It accepts a `studyInfo` object which is injected into the main Drupal CSIS Website via the [CSIS Helpers Drupal Module](https://github.com/clarity-h2020/csis-helpers-module/), in particular by [StudyInfoGenerator.php](https://github.com/clarity-h2020/csis-helpers-module/blob/dev/src/Utils/StudyInfoGenerator.php). The `studyInfo` object is processed in  method `onSeamlessEvent` in [drupalContextProviderDirectiveController.js](https://github.com/clarity-h2020/scenario-analysis/blob/dev/app/scripts/controllers/drupalContextProviderDirectiveController.js). Among others, here the unique EMIKAT Scenario (`SZ_ID`) is extracted. In the JavaScript code of the Drupal Main Website, the `studyInfo` can be accessed via `drupalSettings.csisHelpers.studyInfo`. It looks like:

```JSON
{
  "id": "25",
  "uuid": "9359e741-df40-4bcd-9faf-2093b499c65c",
  "write_permissions": 1,
  "name": null,
  "step": "5110",
  "step_uuid": "2634b1f7-2060-4ad1-a3e8-1812e1430c52",
  "step_name": "risk",
  "study": "25",
  "study_uuid": "9359e741-df40-4bcd-9faf-2093b499c65c",
  "study_emikat_id": 3183,
  "calculation_status": "0",
  "study_datapackage_uuid": "2434ce93-93d4-4ca2-8618-a2de768d3f16",
  "study_area": "POLYGON ((16.346111 48.223997, 16.346111 48.238634, 16.376667 48.238634, 16.376667 48.223997, 16.346111 48.223997))",
  "eea_city_name": "Wien",
  "city_code": "AT001",
  "study_presets": {
    "time_period": "Baseline",
    "emission_scenario": "Baseline",
    "event_frequency": "Rare"
  },
  "study_scenarios": [
    {
      "label": "historical, yearly",
      "time_period": "Baseline",
      "emission_scenario": "Baseline",
      "event_frequency": "Frequent"
    },
    {
      "label": "worst case, 20y, adapted",
      "time_period": "20710101-21001231",
      "emission_scenario": "rcp85",
      "event_frequency": "Rare"
    },
    {
      "label": "Effective measures, yearly",
      "time_period": "20710101-21001231",
      "emission_scenario": "rcp45",
      "event_frequency": "Frequent"
    },
    {
      "label": "Worst case, 20 y",
      "time_period": "20710101-21001231",
      "emission_scenario": "rcp85",
      "event_frequency": "Rare"
    },
    {
      "label": "historical, 20y",
      "time_period": "Baseline",
      "emission_scenario": "Baseline",
      "event_frequency": "Rare"
    }
  ],
  "has_adapted_scenario": true,
  "is_anonymous": false,
  "is_member": true,
  "__id": "MPPTOBJBTA1QBVI9OQ70SF9BCTP1A5C6"
}
```


### Drupal REST API

We just need to access the [Drupal REST API](https://csis-dev.myclimateservice.eu/jsonapi/user/user/) to retrieve the Basic Auth Credentials for accessing the EMIKAT REST API. The credentials are stored in the user profile in field `field_basic_auth_credentials`. The request will fail if the user is not logged-in in CSIS. The relevant code is in operation `drupalRestApi.initEmikatCredentials` in [drupalService.js](https://github.com/clarity-h2020/scenario-analysis/blob/dev/app/scripts/services/drupalService.js). 

### EMIKAT API

EMIKAT defines one table view for **aggregated** heat wave and pluvial flood impact scenarios. The id of the view is `2994`. An Example *request* for scenario `3183` looks like:
[https://service.emikat.at/EmiKatTst/api/scenarios/3183/feature/view.2994/table/data?rownum=1000&filter=SZ_ID=3183](https://service.emikat.at/EmiKatTst/api/scenarios/3183/feature/view.2994/table/data?rownum=1000&filter=SZ_ID=3183)

The respective *response* looks like:

```JSON
{
    "name": "TAB Aggregated impact for all event types",
    "description": "TAB Aggregated impact for all event types\nThe sum or AVG of the cell values are calculated for the whole study area. \nAll event tpes are included\n",
    "columnnames": [
        "STUDY_VARIANT",
        "TIME_PERIOD",
        "EMISSIONS_SCENARIO",
        "EVENT_FREQUENCY",
        "SZM_SZENARIO_REF",
        "HW_EXPOSEDQUANTITY",
        "HW_DAMAGEQUANTITY",
        "HW_DISCOMFORT_LEVEL",
        "HW_HEAT_WAVE_IMPACT",
        "AO_COST_DEVELOPMENT",
        "AO_COST_MAINTENANCE",
        "AO_COST_RETROFITTING",
        "PF_FLOOD_IMPACT_EURO",
        "PF_DAMAGEPROBABILITY",
        "PF_DAMAGE_CLASS"
    ],
    "rows": [
        {
            "rownum": 0,
            "values": [
                "ADAPTATION-01",
                "20110101-20401231",
                "rcp26",
                "Frequent",
                3183.0,
                171640.0,
                63.68035987323578,
                4.0,
                18.0,
                1229608.0,
                0.0,
                614794.0,
                4.338972211625E7,
                54.0,
                4.0
            ]
        },
```

The request is made in method `emikatRestApi.getImpactScenario` in [drupalService.js](https://github.com/clarity-h2020/scenario-analysis/blob/dev/app/scripts/services/drupalService.js).

###  ICC DATA Vector

The "ICC DATA Vector" (Indicators, Criteria and Cost) is the internal JSON data format of the scenario analysis application. The method `emikatHelper.transformImpactScenario` in [drupalService.js](https://github.com/clarity-h2020/scenario-analysis/blob/dev/app/scripts/services/drupalService.js) is responsible for transforming the proprietary EMIKAT API response to an "ICC DATA Vector". **If the EMIKAT format changes or new indicators are added, the code has to be updated accordingly.** Also the Indicator Groups, the units, the format of values, the icons, etc. are defined in this method. An example of a transformed EMIKAT response into the ICC JSON format looks like:

```JSON
[
    {
        "name": "ADAPTATION-01: RCP26 (2011-2040)",
        "iccdata": {
            "indicatorsetHeatWave": {
                "displayName": "Impact following Heat Wave Events",
                "iconResource": "fire.png",
                "indicatorMortalityRateFrequent": {
                    "displayName": "Increase in Mortality Rate (Frequent)",
                    "iconResource": "flower_injured_16.png",
                    "unit": "‰",
                    "value": 0.367047308319739
                },
                "indicatorDiscomfortLevelFrequent": {
                    "displayName": "Discomfort Level (Frequent)",
                    "iconResource": "flower_homeless_16.png",
                    "unit": "",
                    "value": 4
                }
            },
            "indicatorsetPluvialFlood": {
                "displayName": "Impact following Pluvial Flood Events",
                "iconResource": "rain.png",
                "indicatorPluvialFloodDamageProbabilityFrequent": {
                    "displayName": "Damage Probability (Frequent)",
                    "iconResource": "rain.png",
                    "unit": "",
                    "value": 54
                },
                "indicatorPluvialFloodDamageClassFrequent": {
                    "displayName": "Damage Class (Frequent)",
                    "iconResource": "rain.png",
                    "unit": "",
                    "value": 4
                }
```

### User Interface

Several UI components, in particular criteria and ranking diagrams, that are not needed or are not working due to the absence of **Criteria Functions** and **Decision Strategies** had to be disabled so that they do not interfere with [report generation](https://github.com/clarity-h2020/csis-helpers-module/issues/13). If such functions and strategies become avilable in the future, the ui components can be re-enabled by removing the `ng-if` directives in [index.html](https://github.com/clarity-h2020/scenario-analysis/blob/dev/app/index.html):

`<div class="row" ng-if="false">`

## Installation

### Development Environment

The application uses an outdated / deprecated build process based on `bower` and `grunt`. Furthermore, the build process will only work with Node **v6.11.4**. 
However, there is no need to build the application since minification, obfuscation, cdn-dification, etc. are not needed. The source code can directly be deployed.

### Dependencies

Dependencies declared in `package.json` and `bower.json` can be installed with:

```
npm install
bower install
```

Please note that installation may fail, e.g. if deprecated bower registry is finally shut down. In this case, the dependencies can be downloaded from [GiutHub](https://github.com/clarity-h2020/scenario-analysis/releases/tag/2.2): `node_modules.zip` has to be extracted into the repository root and `bower_components.zip` into the `/apps` directory. 

### Build Process

The application can be built with `grunt build`, however this is not needed as mentioned avove.

### Deployment on CSIS 

The application is deployed at `/docker/100-csis/drupal-data/web/apps/scenario-analysis`.
Updating is straightforward, the code can directly be pulled from GitHub:

```sh
sudo su docker
cd /docker/100-csis/drupal-data/web/apps/scenario-analysis

git reset --hard
git pull

docker exec --user 999 csis-drupal drush cr
```

On [CSIS-DEV](https://csis-dev.myclimateservice.eu/) usually the `dev` branch is used while on [CSIS-PROD](https://csis.myclimateservice.eu/) the `master` branch or a particular [release](https://github.com/clarity-h2020/scenario-analysis/releases) tag is used.

### Integration in CSIS

The application is integrated with help of [seamless.js](https://github.com/travist/seamless.js/) as *"Extended iFrame"* in [CSIS Drupal System](https://csis-dev.myclimateservice.eu/). The respective Drupal *Node* that contains the [iFrame](https://csis-dev.myclimateservice.eu/apps/scenario-analysis/app/index.html) is the "[Extended iFrame MCDA Component: Scenario Analysis](https://csis-dev.myclimateservice.eu/node/21/edit)". The source code of the  iFrame and the needed Drupal Java Script helper function (`window.Drupal.behaviors`) is also available in [nodeConnector.js](https://github.com/clarity-h2020/scenario-analysis/blob/dev/app/scripts/connectors/nodeConnector.js). 

The *"Extended iFrame"* node itself is used in several [EU-GL Step Templates](https://csis-dev.myclimateservice.eu/admin/content?title=Template&type=gl_step&status=1&langcode=All) as **Scenario Analysis Application**, e.g. in EU-GL Steps Impact/Risk Assessment and Adaptation Options Appraisal.