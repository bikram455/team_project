import { Router } from 'express';
import { connectClient } from './connection';
import url from 'url';

let routes = Router();

routes.get('/', (req , res) => {
  let add=req.url;
  let query = url.parse(add,true).query;   
  let database = req.headers.schema;
  let client;
  
  if(database){
     client = connectClient(database);
  }
  else{
     client = connectClient();
  }
  
  if(query.query){
    console.log(query);
    client.query(query.query)
  .then(users => {
    if(JSON.stringify(users.rows)== '[]'){
      res.json('element created');
    }  
    else{
      res.json(users.rows);
    }      
    
  });
    
  }
  else{
    console.log('m here');
    query='select * from information_schema.tables';
    client.query(query)
    .then(tables => res.json(tables.rows));    
  }
  
  
})

export default routes;