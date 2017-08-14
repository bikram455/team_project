import url from 'url';
import { connectClient } from '../connection';
let client = connectClient();
export function queryCall(query , database){
  return new Promise ((resolve , reject) => {
    if(database){
     client = connectClient(database);
    }
    else{
      client = connectClient();
    }
    client.query(query)
    .then(elements => {
      resolve(elements.rows);
    })
    .catch(err => resolve(err));
  })
}