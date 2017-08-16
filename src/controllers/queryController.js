import url from 'url';
import { connectClient } from '../connection';
import { Router } from 'express';
import * as services from '../services/queryService';

let controller = Router();

//Select Queries
controller.get('/' , (req , res , next) => {
  let add=req.url;
  let query = url.parse(add,true).query;   
  let database = req.headers.schema;
  

  let action = query.query.split(' ')[0];

  if(action != 'select'){    
    let err={
      message:'Please use the appropriate function',
      instruction:'delete for drop, put for update , post for create/insert'  
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

//insert or create queries

controller.post('/' , (req , res , next) => {
  
  let add=req.url;
  let query = url.parse(add,true).query;   
  let database = req.headers.schema;
  
  let statement=query.query;
  let action = query.query.split(' ')[0];
  
  if(action != 'create' ){
    if(action != 'insert'){
      let err={
      message:'Please use the appropriate function',
      instruction:'delete for drop, put for update , get for select'  
    };    
    return next(err);
    }    
    
  }

  let keys = [];
  let values = [];
  let arrayAttr =[] ;
  let attributes = req.body;
  
  for(let i=0;i<Object.keys(attributes).length;i++){
    keys[i] = Object.keys(attributes)[i];
    values[i]=Object.values(attributes)[i];
    if(typeof(values[i])=='string'){
      values[i]=`'${values[i]}'`
      console.log(values[i]);
    }
    arrayAttr[i] = `${keys[i]} ${values[i]}`;
    
  }

  if(action == 'create'){
    if(query.query.split(' ')[1] == 'table'){
      query =`${statement} (${arrayAttr})`;
    }
    else{
      query = statement; 
    }
  }
  else if(action == 'insert'){
    query =`${statement} (${keys}) values (${values})`;
    
  }
  console.log(query);
  services.queryServicePost(query , database)
  .then(reply => res.json(reply))
  .catch(err => next(err));
})

export default controller;