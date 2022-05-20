import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface MyQuery extends DataQuery {
  queryText?: string;
  dbfunc?: string;
  fdsep?: string;
  datasep?: string;
  fieldsep?: string;
  recordsep?: string;
  keyvalsep?: string;
  reccnt?: string;
  region?: string;
}

export interface MyDataSourceOptions extends DataSourceJsonData {
  Server?: string;
  Port?: string;
  WebT?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */

export const defaultQuery: Partial<MyQuery> = {
  queryText: 'CUM',
  fdsep: '@',
  datasep: ';',
  fieldsep: ',',
  recordsep: ';',
  keyvalsep: '#',
  reccnt: '60',
  region: 'DEFAULT',
};
