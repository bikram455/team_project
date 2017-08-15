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

    let action = query.split(' ')[0];
    let element = query.split(' ')[1];
    
    let reply;
    client.query(query)
    .then(elements => {
      if(action == 'create' ){
        reply = `${element} ${action}d`;
        resolve({reply});
      }
      else if(action == 'drop'){
        reply = `${element} ${action}ped`;
        resolve({reply});
      }
      else if(action == 'insert'){
        reply = `${action}ed`;
        resolve({reply});
      }
      resolve(elements.rows);
    })
    .catch(err => {      
      reject(err.stack.split('\n')[0]);
    });
  })
}