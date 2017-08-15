import { queryCall } from '../dao/queryCall';

export function queryService(query , database){
  
  return queryCall(query , database);
}