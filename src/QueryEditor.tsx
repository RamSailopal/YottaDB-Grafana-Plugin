import defaults from 'lodash/defaults';

import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms, LinkButton } from '@grafana/ui';
import { QueryEditorProps } from '@grafana/data';
import { DataSource } from './datasource';
import { MyDataSourceOptions, MyQuery } from './types';

const { FormField } = LegacyForms;

type Props = QueryEditorProps<DataSource, MyQuery, MyDataSourceOptions>;

export class QueryEditor extends PureComponent<Props> {
  onQueryTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, queryText: event.target.value });
  };
  onFuncTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, dbfunc: event.target.value });
  };
  onfdsepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, fdsep: event.target.value });
  };
  ondatasepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, datasep: event.target.value });
  };
  onfieldsepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, fieldsep: event.target.value });
  };
  onrecordsepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, recordsep: event.target.value });
  };
  onkeyvalsepChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, keyvalsep: event.target.value });
  };
  onreccntChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, reccnt: event.target.value });
  };
  onregionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onChange, query } = this.props;
    onChange({ ...query, region: event.target.value });
  };

  render() {
    const query = defaults(this.props.query);
    const { queryText, dbfunc, fdsep, datasep, fieldsep, recordsep, keyvalsep, reccnt, region } = query;
    return (
      <div className="gf-form">
        <div>
          <p style={{ marginInline: '30px', marginBlock: '15px', textAlign: 'center' }}>
            <p>
              <b>
                Additional information about the metrics and configuration of Custom metrics is available by clicking
                the buttons below.
              </b>
            </p>
            <LinkButton
              variant="secondary"
              size="md"
              target="_blank"
              href="https://github.com/RamSailopal/YottaDB-Grafana-Plugin"
              rel="noreferrer"
              style={{ marginInlineEnd: '5px' }}
            >
              Click here for plugin documentation website
            </LinkButton>
            <LinkButton
              variant="secondary"
              size="md"
              target="_blank"
              href="https://docs.yottadb.com/ProgrammersGuide/commands.html#zshow"
              rel="noreferrer"
              style={{ marginInlineEnd: '5px' }}
            >
              Click here for metrics explanation
            </LinkButton>
          </p>
        </div>
        <div>
          <FormField
            labelWidth={15}
            value={queryText || ''}
            onChange={this.onQueryTextChange}
            label="CUM,POT or CUS"
            placeholder="CUM"
            inputWidth={4}
            tooltip="Enter either CUM for cumulative metrics over time, POT for metrics over a single period of time, or CUS for custom metrics (data attained according to the function/routine entered in the function/routine field)"
          />
          <FormField
            labelWidth={15}
            value={region || ''}
            onChange={this.onregionChange}
            label="YottaDB region"
            placeholder="DEFAULT"
            tooltip="Enter region to attain metrics from (only for CUM and POT)"
          />
          <FormField
            labelWidth={15}
            value={dbfunc || ''}
            onChange={this.onFuncTextChange}
            label="Function/Routine for CUS"
            tooltip="Only used with CUS for metrics. Data will be attained by calling the function/routine in this field"
          />
          <FormField
            labelWidth={15}
            value={reccnt}
            onChange={this.onreccntChange}
            label="Number of records to attain"
            placeholder="60"
            tooltip="Only used with CUM and POT metrics. Use 'all' for all available records. Please note that the higher the entry, the longer the time taken to attain the data"
          />
          <FormField
            labelWidth={15}
            inputWidth={3}
            value={fdsep || ''}
            onChange={this.onfdsepChange}
            label="Field/data separator for CUS"
            placeholder="@"
            tooltip="Only used with CUS for metrics. The symbol that separates the fields from the data"
          />
        </div>
        <div>
          <FormField
            labelWidth={15}
            inputWidth={3}
            value={datasep || ''}
            onChange={this.ondatasepChange}
            label="Data separator for CUS"
            placeholder=","
            tooltip="Only used with CUS for metrics. The symbol that separates the data columns"
          />
          <FormField
            labelWidth={15}
            inputWidth={3}
            value={fieldsep || ''}
            onChange={this.onfieldsepChange}
            label="Field separator for CUS"
            placeholder=","
            tooltip="Only used with CUS for metrics. The symbol that separates the field columns"
          />
          <FormField
            labelWidth={15}
            inputWidth={3}
            value={recordsep || ''}
            onChange={this.onrecordsepChange}
            label="Record separator for CUS"
            placeholder=";"
            tooltip="Only used with CUS for metrics. The symbol that separates each row"
          />
          <FormField
            labelWidth={15}
            inputWidth={3}
            value={keyvalsep || ''}
            onChange={this.onkeyvalsepChange}
            label="Key/value separator for CUS"
            placeholder="#"
            tooltip="Only used with CUS for metrics. The symbol that separates the key from the value for each entry"
          />
        </div>
      </div>
    );
  }
}
