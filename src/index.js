import express from 'express';
import bodyParser from 'body-parser';

import routes from './routes';

let app = express();
let PORT=4553;

app.set('port' , PORT);



app.get('/' , (req , res ) => {
  res.json({
    message:'Welcome to the api',
    instruction:'/api to enter api'
  });
});

app.use('/api' , routes);

app.listen(app.get('port') , () => {
  console.log(`Port started: ${app.get('port')}`);  
})