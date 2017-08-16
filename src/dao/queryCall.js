import url from 'url';
import { connectClient } from '../connection';
let client = connectClient();

export function queryCall(query , database){
  let action = query.split(' ')[0];
  action = action.toLowerCase();
  
  if(action == 'select'){
    return querySelect(query , database);
  }
  else if(action == 'insert'){
    return queryInsert(query , database);
  }   
}

//Select Queries
function querySelect(query , database){

  return new Promise((resolve , reject) => {
    if(database){
    client = connectClient(database);
  }
  client.query(query)
  .then(result => resolve({result}))
  .catch(err => {
    let error = err.stack.split('\n')[0];
    reject(error)
  });
  })

}

//Insert Queries
function queryInsert(query , database){
  
  return new Promise((resolve , reject) => {
    if(database){
    client = connectClient(database);
  }
  client.query(query)
  .then(result => {
    let reply =result.rowCount;
    reply = `${reply} rows inserted`;
    resolve({reply});
  })
  .catch(err => {
    let error = err.stack.split('\n')[0];
    
    reject(error);
  });;
  })

}