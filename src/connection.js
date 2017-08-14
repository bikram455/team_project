import pg from 'pg';


export function connectClient(database){

  let user='postgres';
  let password='pdnejoh';
  let port=5432;
  let host='127.0.0.1';
  let dbname=database || 'tododb';

  const connectionString=`postgres://${user}:${password}@${host}:${port}/${dbname}`;

  const client=new pg.Client(connectionString);

  client.connect();
return client;
}

