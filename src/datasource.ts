import { getBackendSrv } from '@grafana/runtime';
import {
  DataQueryRequest,
  DataQueryResponse,
  DataSourceApi,
  DataSourceInstanceSettings,
  MutableDataFrame,
  FieldType,
} from '@grafana/data';

import { MyQuery, MyDataSourceOptions } from './types';

export class DataSource extends DataSourceApi<MyQuery, MyDataSourceOptions> {
  Server: string;
  Port: string;

  constructor(instanceSettings: DataSourceInstanceSettings<MyDataSourceOptions>) {
    super(instanceSettings);

    this.Server = instanceSettings.jsonData.Server || 'localhost';
    this.Port = instanceSettings.jsonData.Port || '5000';
  }

  async doRequest(query: MyQuery) {
    var fdsep = query.fdsep || '@';
    var datasep = query.datasep || ',';
    var fieldsep = query.fieldsep || ',';
    var recordsep = query.recordsep || ';';
    var keyvalsep = query.keyvalsep || '#';
    var rout = 'CUM';
    if (query.queryText !== 'POT' && query.queryText !== 'CUM' && query.queryText !== 'CUS') {
      rout = 'CUM';
    } else {
      rout = query.queryText;
    }
    if (rout === 'POT' || rout === 'CUM') {
      const result = await getBackendSrv().datasourceRequest({
        method: 'GET',
        url: 'http://' + this.Server + ':' + this.Port + '/' + rout,
      });
      return result;
    } else {
      const result = await getBackendSrv().datasourceRequest({
        method: 'GET',
        url:
          'http://' +
          this.Server +
          ':' +
          this.Port +
          '/' +
          rout +
          '?dbfunc=' +
          query.dbfunc +
          '&fdsep=' +
          fdsep +
          '&datasep=' +
          datasep +
          '&fieldsep=' +
          fieldsep +
          '&recordsep=' +
          recordsep +
          '&keyvalsep=' +
          keyvalsep,
      });
      return result;
    }
  }

  async query(options: DataQueryRequest<MyQuery>): Promise<DataQueryResponse> {
    const promises = options.targets.map((query) =>
      this.doRequest(query).then((response) => {
        if (query.queryText !== 'CUS') {
          const frame = new MutableDataFrame({
            refId: query.refId,
            fields: [
              { name: 'BTD', type: FieldType.number },
              { name: 'CAT', type: FieldType.number },
              { name: 'CFE', type: FieldType.number },
              { name: 'CFS', type: FieldType.number },
              { name: 'CFT', type: FieldType.number },
              { name: 'CFavg', type: FieldType.number },
              { name: 'CFsigma', type: FieldType.number },
              { name: 'CFvar', type: FieldType.number },
              { name: 'CQS', type: FieldType.number },
              { name: 'CQT', type: FieldType.number },
              { name: 'CQAvg', type: FieldType.number },
              { name: 'CQsigma', type: FieldType.number },
              { name: 'CQvar', type: FieldType.number },
              { name: 'CTN', type: FieldType.number },
              { name: 'CYS', type: FieldType.number },
              { name: 'CYT', type: FieldType.number },
              { name: 'CYavg', type: FieldType.number },
              { name: 'CYsigma', type: FieldType.number },
              { name: 'CYvar', type: FieldType.number },
              { name: 'DEX', type: FieldType.number },
              { name: 'DFL', type: FieldType.number },
              { name: 'DFS', type: FieldType.number },
              { name: 'DRD', type: FieldType.number },
              { name: 'DTA', type: FieldType.number },
              { name: 'DWT', type: FieldType.number },
              { name: 'GET', type: FieldType.number },
              { name: 'JBB', type: FieldType.number },
              { name: 'JEX', type: FieldType.number },
              { name: 'JFB', type: FieldType.number },
              { name: 'JFL', type: FieldType.number },
              { name: 'JFS', type: FieldType.number },
              { name: 'JFW', type: FieldType.number },
              { name: 'JRE', type: FieldType.number },
              { name: 'JRI', type: FieldType.number },
              { name: 'JRL', type: FieldType.number },
              { name: 'JRO', type: FieldType.number },
              { name: 'JRP', type: FieldType.number },
              { name: 'KIL', type: FieldType.number },
              { name: 'LKF', type: FieldType.number },
              { name: 'LKS', type: FieldType.number },
              { name: 'LKfrate', type: FieldType.number },
              { name: 'NBR', type: FieldType.number },
              { name: 'NBW', type: FieldType.number },
              { name: 'NR0', type: FieldType.number },
              { name: 'NR1', type: FieldType.number },
              { name: 'NR2', type: FieldType.number },
              { name: 'NR3', type: FieldType.number },
              { name: 'NTR', type: FieldType.number },
              { name: 'NTW', type: FieldType.number },
              { name: 'ORD', type: FieldType.number },
              { name: 'QRY', type: FieldType.number },
              { name: 'SET', type: FieldType.number },
              { name: 'TBR', type: FieldType.number },
              { name: 'TBW', type: FieldType.number },
              { name: 'TC0', type: FieldType.number },
              { name: 'TC1', type: FieldType.number },
              { name: 'TC2', type: FieldType.number },
              { name: 'TC3', type: FieldType.number },
              { name: 'TC4', type: FieldType.number },
              { name: 'TR0', type: FieldType.number },
              { name: 'TR1', type: FieldType.number },
              { name: 'TR2', type: FieldType.number },
              { name: 'TR3', type: FieldType.number },
              { name: 'TR4', type: FieldType.number },
              { name: 'TRB', type: FieldType.number },
              { name: 'TTR', type: FieldType.number },
              { name: 'TTW', type: FieldType.number },
              { name: 'ZPR', type: FieldType.number },
              { name: 'ZTR', type: FieldType.number },
              { name: 'time', type: FieldType.time },
            ],
          });
          response.data.metrics.forEach((point: any) => {
            frame.add(point);
          });
          return frame;
        } else {
          const frame = new MutableDataFrame({
            refId: query.refId,
            fields: response.data.fields,
          });
          response.data.metrics.forEach((point: any) => {
            frame.add(point);
          });
          return frame;
        }
      })
    );
    return Promise.all(promises).then((data) => ({ data }));
  }

  async testDatasource() {
    // Implement a health check for your data source.
    return {
      status: 'success',
      message: 'Success',
    };
  }
}
