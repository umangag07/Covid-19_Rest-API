const { default: axios } = require("axios");
 async function WorldData(){ 
    try{
     const response = await axios.get("https://covid19.who.int/page-data/index/page-data.json");
     var Data = response.data;
     var required_data = Data.result.pageContext.rawDataSets.byDay.rows;
     const data_length = required_data.length;
     for(let i=0;i<data_length;i++){
        let payload = {
            Day: i+1,
            Timestamp:required_data[i][0],
            TotalConfirmed: required_data[i][7],
            TotalDeaths: required_data[i][2],
            DailyConfirmed: required_data[i][6],
            DailyDeaths: required_data[i][1],
          };
          try{
            let res = await axios.post(
                "http://localhost:3000/total_covid_cases_world/post_data",
                payload
              );
              console.log(res.data);
    
          }catch(error){
              console.log({"Erro in post":error})
          }
            
     }
     
    }catch(e){
        console.log({"Error ":e});
    }
}

module.export= WorldData();


