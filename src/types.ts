import { DataQuery, DataSourceJsonData } from '@grafana/data';

export interface MyQuery extends DataQuery {
  queryText?: string;
}

export interface MyDataSourceOptions extends DataSourceJsonData {
  Server?: string;
  Port?: string;
}

/**
 * Value that is used in the backend, but never sent over HTTP to the frontend
 */

export const defaultQuery: Partial<MyQuery> = {
  queryText: 'CUM',
};
