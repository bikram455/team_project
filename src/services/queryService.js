import { queryCall } from '../dao/queryCall';

export function queryService(query , database){
  console.log(query , database);
  return queryCall(query , database);
}