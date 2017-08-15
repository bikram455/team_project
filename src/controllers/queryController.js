import url from 'url';
import { connectClient } from '../connection';
import { Router } from 'express';
import * as services from '../services/queryService';

let controller = Router();

controller.get('/' , (req , res , next) => {
  let add=req.url;
  let query = url.parse(add,true).query;   
  let database = req.headers.schema;
  

  let action = query.query.split(' ')[0];

  if(action != 'select'){    
    let err={
      message:'Please use the appropriate function',
      instruction:'delete for drop, put for update , post for create'  
    };
    
    return next(err);
  }
  
  if(query.query && database){
    services.queryServiceGet(query.query , database)
    .then( element => {
      res.json(element);
    })
    .catch(err => {
     next(err);
    });
  }
  else if(query.query){
    services.queryServiceGet(query.query )
    .then( element => {
      res.json(element);
    })
    .catch(err => next(err));;
  }
  else {
    query='select * from pg_database';
    services.queryServiceGet(query)
    .then( element => {
      res.json(element);
    })
    .catch(err => next(err));;
  }
 
});

controller.post('/' , (req , res , next) => {
  
  let add=req.url;
  let query = url.parse(add,true).query;   
  let database = req.headers.schema;
  
  let statement=query.query;
  let action = query.query.split(' ')[0];
  
  if(action != 'create'){    
    let err={
      message:'Please use the appropriate function',
      instruction:'delete for drop, put for update , get for select'  
    };    
    return next(err);
  }

  let key;
  let value;
  let arrayAttr =[] ;
  let attributes = req.body;
  
  for(let i=0;i<Object.keys(attributes).length;i++){
    key = Object.keys(attributes)[i];
    value=Object.values(attributes)[i];
    arrayAttr[i] = `${key} ${value}`  
  }

  if(query.query.split(' ')[1] == 'table'){
    query =`${statement} (${arrayAttr})`;
  }
  else{
   query = statement; 
  }
  console.log(query);
  services.queryServicePost(query , database)
  .then(reply => res.json(reply))
  .catch(err => next(err));
})

export default controller;