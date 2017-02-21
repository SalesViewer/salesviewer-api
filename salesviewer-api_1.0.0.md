FORMAT: 1A
HOST: https://www.salesviewer.com/api

# SalesViewer API
SalesViewer API is a simple API allowing consumers to sessions and website interactions of their website.

## Authentication
This API uses Custom Query Parameter for its authentication.

The parameters that are needed to be sent for this type of authentication are as follows:
+ `apiKey` - Authentication for each request with api key in query.

# Group sessions

## SessionsJson [/sessions.json{?from,to,timezone,locale,page,pageSize,includeHidden,includeCompany,includeCompanySector,includeVisits,query}]

### getSessionsJSON [GET]
List visitor sessions based on filter
+ Parameters
    + from (string, optional) -

        Starting DateTime (any valid DateTime [e.g. RFC3339], relative values [-30 days, -10 Minutes] or UNIX-Timestamps): `-1 year`, `-30 days`, `now`, `2017-02-01`, `2017-02-01 22:30:15`, `1985-04-12T23:20:50.52Z`, `1996-12-19T16:39:57-08:00`, `1937-01-01T12:00:27.87+00:20`

        + Default: -30 days
    + to (string, optional) -

        Ending DateTime (see `from`-paramter)

        + Default: now
    + timezone (string, optional) -

        Timezone of input and output DateTimes [see List of Timezones](https://www.w3schools.com/php/php_ref_timezones.asp)

        + Default: Europe/Berlin
    + locale (string, optional) -

        A valid linux system locale [see List of Locales](https://docs.moodle.org/dev/Table_of_locales#Table)

        + Default: de-DE
    + page (number, optional) -

        Selected result page

        + Default: 1
    + pageSize (number, optional) -

        Number of entries per page

        + Default: 100
    + includeHidden (boolean, optional) -

        Include frontend-hidden companies

        + Default: False
    + includeCompany (boolean, optional) -

        Include company-details

        + Default: True
    + includeCompanySector (boolean, optional) -

        Include company-sector (Note applies only if `includeCompany`-paramter is `true`)

        + Default: True
    + includeVisits (boolean, optional) -

        Include visits details

        + Default: True
    + query (string, optional)

        An RQL (__R__esource __Q__uery __L__anguage) formatted query. __Available fields__ are a _superset_ of Session-Object (see model definitions), with dot as field separator (e.g. `sesssion.visits.url`) _Syntax documentation_ see * [RQL Standard](https://doc.apsstandard.org/2.1/spec/rql/) * [Persvr/RQL Github](https://github.com/persvr/rql)
        
        __Example__ ``` session.duration>='00:00:50' & count(session.visits)=4 ``` _Hint URL parameters should be URL-Encoded_


+ Response 200 (application/json)

        sessions response

    + Attributes (GetSessionsResponse)


+ Response 400 

        Bad Request - see Error




+ Response 401 

        Not authenticated by apiKey as query-parameter or header-value.




+ Response 403 

        Authentication wrong or project selection error




+ Response 429 

        Rate limiting (see headers)




+ Response 0 

        see X-Error-Description header or errorDescription in answer





## SessionsJson [/sessions.json]

### postSessionsJSON [POST]
List visitor sessions based on filter
+ Attributes
    + from (string, optional) -

        Starting DateTime (any valid DateTime [e.g. RFC3339], relative values [-30 days, -10 Minutes] or UNIX-Timestamps) e.g. * `-1 year` * `-30 days` * `now` * `2017-02-01` * `2017-02-01 22:30:15` * `1985-04-12T23:20:50.52Z` * `1996-12-19T16:39:57-08:00` * `1937-01-01T12:00:27.87+00:20`

        + Default: -30 days
    + to (string, optional) -

        Ending DateTime (see `from`-paramter)

        + Default: now
    + timezone (string, optional) -

        Timezone of input and output DateTimes [see List of Timezones](https://www.w3schools.com/php/php_ref_timezones.asp)

        + Default: Europe/Berlin
    + locale (string, optional) -

        A valid linux system locale [see List of Locales](https://docs.moodle.org/dev/Table_of_locales#Table)

        + Default: de-DE
    + page (number, optional) -

        Selected result page

        + Default: 1
    + pageSize (number, optional) -

        Number of entries per page

        + Default: 100
    + includeHidden (boolean, optional) -

        Include frontend-hidden companies

        + Default: False
    + includeCompany (boolean, optional) -

        Include company-details

        + Default: True
    + includeCompanySector (boolean, optional) -

        Include company-sector (Note applies only if `includeCompany`-paramter is `true`)

        + Default: True
    + includeVisits (boolean, optional) -

        Include visits details

        + Default: True
    + query (string, optional)

        An RQL (__R__esource __Q__uery __L__anguage) formatted query. __Available fields__ are a _nearly-equal subset_ of Session-Object (see model definitions), with dot as field separator (e.g. `sesssion.visits.url`) _Syntax documentation_ see * [RQL Standard](https://doc.apsstandard.org/2.1/spec/rql/) * [Persvr/RQL Github](https://github.com/persvr/rql)
        
        __Example__ ``` session.duration>='00:00:50' & count(session.visits)=4 ``` _Hint URL parameters should be URL-Encoded_


+ Request (application/x-www-form-urlencoded)



+ Response 200 (application/json)

        sessions response

    + Attributes (GetSessionsResponse)


+ Response 400 

        Bad Request - see Error




+ Response 401 

        Not authenticated by apiKey as query-parameter or header-value.




+ Response 403 

        Authentication wrong or project selection error




+ Response 429 

        Rate limiting (see headers)




+ Response 0 

        see X-Error-Description header or errorDescription in answer






# Data Structures

## PaginatedResult (object)


### Properties
+ `pagination` (ResultPagination, required) 


## ResultPagination (object)


### Properties
+ `total` (number, required) - Number of total entries
+ `isFirst` (boolean, required) - Current page is first page
+ `current` (number, required) - Current page number (1-based)
+ `isLast` (boolean, required) - Current page is last page
+ `pageSize` (number, required) - Size (=number of entries) of each page


## ErrorResponse (object)


### Properties
+ `error` (boolean, optional) - Indicated that it' an error
+ `errorDescription` (string, optional) - Error description
+ `errorType` (string, optional) - Error type


## CompanySector (object)


### Properties
+ `id` (number, required) - ID of sector
+ `name` (string, required) - Name of sector


## GetSessionsResponse (PaginatedResult)


### Properties
+ `totals` (GetSessionsResultTotals, required) 
+ `result` (array[Session], optional) - Array of `Session`


## GetSessionsResultTotals (object)


### Properties
+ `sessions` (number, required) - Total number of unique sessions
+ `companies` (number, required) - Total number of unique companies
+ `visits` (number, required) - Total number of page visits
+ `interest_visits` (number, required) - Total number of page visits which triggered interest
+ `interests` (number, required) - Total number of interests triggered


## Session (object)


### Properties
+ `guid` (string, required) - UUID of Session
+ `startedAt_ts_server` (string, required) - Session started at UNIX-Time
+ `startedAt` (string, required) - Session started at (in given timezone)
+ `lastActivityAt_ts_server` (string, required) - Session last activity at UNIX-Time
+ `lastActivityAt` (string, required) - Session last activity at (in given timezone)
+ `duration` (string, required) - Duration of session in TIME format (Rfc3339 time components)
+ `duration_secs` (number, required) - Duration of session in seconds
+ `language` (string, required) - Session language/locale
+ `isCustomer` (string, required) 
+ `company` (Company, optional) 
+ `visits` (array[SessionVisit], optional) - Session visits of this session. NOTE: if `includeVisits`-parameter set to `false`, result won't contain visits field.


## Company (object)


### Properties
+ `id` (string, required) - ID of company
+ `street` (string, optional) - Street of company
+ `zip` (string, optional) - Zip of company
+ `name` (string, optional) - Name of company
+ `phone` (string, optional) - Phone of company
+ `email` (string, optional) - E-Mail address of company
+ `city` (string, optional) - City of company
+ `latitude` (number, optional) - Geographical latitude of company's address
+ `longitude` (number, optional) - Geographical longitude of company's address
+ `url` (string, optional) - URL of company's website
+ `countyCode` (string, optional) - Country code in (ISO 3166 Alpha 2) format (e.g. `DE`)
+ `countyCode3` (string, optional) - Country code in (ISO 3166 Alpha 3) format (e.g. `DEU`)
+ `isCustomer` (boolean, optional) - Indicates if company is marked as customer
+ `isFavorite` (boolean, optional) - Indicates if company is marked as favorite
+ `isCompetitor` (boolean, optional) - Indicates if company is marked as competitor
+ `sector` (CompanySector, optional) 


## SessionVisit (object)


### Properties
+ `id` (number, required) - UUID of Session visit
+ `startedAt_ts_server` (string, required) - Session visit started at UNIX-Time
+ `startedAt` (string, required) - Session visit started at (in given timezone)
+ `lastActivityAt_ts_server` (string, required) - Session visit last activity at UNIX-Time
+ `lastActivityAt` (string, required) - Session visit last activity at (in given timezone)
+ `duration` (string, required) - Duration of session visit in TIME format (Rfc3339 time components)
+ `duration_secs` (number, required) - Duration of session visit in seconds
+ `url` (string, required) - URL of the session visit
+ `refererMedium` (string, required) - Referer parsed `medium`-component
+ `numEvents` (number, required) - Number of events collected during website session
+ `referer` (string, optional) - Referer URL of the session visit
+ `refererSource` (string, optional) - Referer parsed `source`-component
+ `refererTerm` (string, optional) - Referer parsed `term`-component

