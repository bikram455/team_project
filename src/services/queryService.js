import { querySelect } from '../dao/querySelect';
import { queryCreate } from '../dao/queryCreate';

export function queryServiceGet(query , database){
  
  return querySelect(query , database);
}

export function queryServicePost(query , database){
  return queryCreate(query , database);
}