var cron = require('node-cron')
var count = 0;
function schedule(){
cron.schedule('0 0 0 * * *',()=>{
    
    var d = new Date()
   
    console.log(`Task was done at ${d.toTimeString()}`);
  })
}

module.exports = schedule()
