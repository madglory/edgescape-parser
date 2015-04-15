# edgescape-parser

> Middleware for parsing the Akamai EdgeScape header


## Install

```
$ npm install --save edgescape-parser
```


## Usage

```js
var express = require('express');
var edgescapeParser = require('edgescape-parser');

var app = express();

app.use(edgescapeParser());

app.get('/:country_code?', function(req, res) {

  // redirect homepage to country code
  if(_.isUndefined(req.params.country_code)) {
    var country_code = req.akamai.edgescape.country_code.toLowerCase() || 'us';
    res.redirect(302, '/' country_code);
  } else {
    // Render country specific page
  }

});
```


## API

### edgescapeParser([options])

#### options

##### header

Type: `string`  
Default: `x-akamai-edgescape`

Parses the header into a JSON object containing all of the EdgeScape variables.

| Attribute Name | Availability | Value Type | Description |
|----------------|--------------|------------|-------------|
| country_code | global | string | Two-letter ISO-3166-1 country code |
| region_code | global | string/integer | Province, region or state code. Not available in all countries. |
| city | global | string | |
| dma | United States | integer | Designated Marketing Area - the same as the Nielson definition. |
| pmsa | United States | integer | Primary Metropolitan Statistical Area, a measure by the US government. There is no direct correlation for these measures outside the US. |
| msa | United States | integer | A number representing the Metropolitan Statistical Area. |
| area code | United States | integer-array | ‘+’ delimited array of phone area codes associated with the client IP address. |
| county | United | States string | |
| fips | United States | integer | Numerical value for the county |
| lat | global | float | Global latitude position |
| long | global | float | Global longitude position |
| timezone | global | string GMT + offset |
| zip | United States + Canada | zipcode-range-array | ‘+’ delimited array of zipcode ranges. ‘-’ indicates the range. Note that this field is based on the ‘city’ field, so that is the current granularity level. |
| continent | global | string | |
| throughput | global | string | See the “Actual Connection Speed (throughput)” file under Support > User and Developer Guides > Content Targeting > Data Codes. |
| bw | global | integer | Provides additional granularity to the ‘throughput’ field. |
| asnum | global | integer-array | ‘+’ delimited array of Autonomous System (AS) numbers. |
| network | global, select networks | string | The name of the network/ISP that owns the IP address, including wireless carriers. Select networks only. |
| network_type | global | string | The connection type seen in the end user’s request (e.g., dialup, cable, dsl) |
| proxy | global | string | This value is set if the IP is a proxy. |


## License

MIT © [MadGlory](http://madglory.com)
