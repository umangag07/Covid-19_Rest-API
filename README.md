# Covid-19 Rest-API
### It is hosted on heroku and starting url is https://covid--19-livetracker.herokuapp.com/
### Other URI endpoints are as follows-:

## 1. Total cases in the world from starting of covid-19
*  /total_covid_cases_world/get_data  -: Request type(GET) will give you all the data in json format.

## 2. Total cases in the india from starting of covid-19
*  /total_covid_cases_india/get_data  -: Request type(GET) will give you all the data in json format.

## 3. Data of all the country 
* /covid_data_world/get_data  -: Request type(GET) will give you the data in json format.
* /covid_data_world/get_data_table  -: Request type(GET) will give you the data in json format.
* /covid_data_world/get_data/Countryname -: Request type(GET), type the country name is capitalize format  will give you the data of specific country in json format.

## 4. Data of all the India states 
* /covid_data_india/get_data  -: Request type(GET) will give you the data in json format.
* /covid_data_india/get_data_table  -: Request type(GET) will give you the data in json format.
* /covid_data_india/get_data/Statename -: Request type(GET), type the state name is capitalize format  will give you the data of specific state in json format.

## 5. 7 days predicted data
* /predictedData/india -: Request type(GET) will give you the data in json format for India.
* /predictedData/world -: Request type(GET) will give you the data in json format for World.
