import url from 'url';
import { connectClient } from '../connection';
import { Router } from 'express';
import { queryService } from '../services/queryService';

let controller = Router();

controller.get('/' , (req , res , next) => {
  let add=req.url;
  let query = url.parse(add,true).query;   
  let database = req.headers.schema;
  let client;
  
  if(query.query && database){
    queryService(query.query , database)
    .then( element => {
      res.json(element);
    })
    .catch(err => {
     next(err);
    });
  }
  else if(query.query){
    queryService(query.query )
    .then( element => {
      res.json(element);
    })
    .catch(err => next(err));;
  }
  else {
    query='select * from pg_database';
    queryService(query)
    .then( element => {
      res.json(element);
    })
    .catch(err => next(err));;
  }
 
});

export default controller;