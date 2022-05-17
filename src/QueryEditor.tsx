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
  render() {
    const query = defaults(this.props.query);
    const { queryText, dbfunc, fdsep, datasep, fieldsep, recordsep, keyvalsep } = query;
    return (
      <div className="gf-form">
        <div>
          <p style={{ marginInline: '30px', marginBlock: '15px', textAlign: 'center' }}>
            <p>
              <b>
                Additional information for configuration of Custom metrics is available by clicking the button below.
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
              Click here plugin documentation website
            </LinkButton>
          </p>
        </div>
        <div>
          <FormField
            labelWidth={15}
            value={queryText || ''}
            onChange={this.onQueryTextChange}
            label="Enter CUM,POT,CUS"
            tooltip="Enter either CUM for cumulative metrics over time, POT for metrics over a single period of time, or CUS for custom metrics (data attained from according to the function/routine entered in the next field)"
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
            value={fdsep || ''}
            onChange={this.onfdsepChange}
            label="Field/data seperator for CUS"
            tooltip="Only used with CUS for metrics. The symbol that seperates the fields from the data"
          />
        </div>
        <div>
          <FormField
            labelWidth={15}
            value={datasep || ''}
            onChange={this.ondatasepChange}
            label="Data seperator for CUS"
            tooltip="Only used with CUS for metrics. The symbol that seperates the data columns"
          />
          <FormField
            labelWidth={15}
            value={fieldsep || ''}
            onChange={this.onfieldsepChange}
            label="Field seperator for CUS"
            tooltip="Only used with CUS for metrics. The symbol that seperates the field columns"
          />
          <FormField
            labelWidth={15}
            value={recordsep || ''}
            onChange={this.onrecordsepChange}
            label="Record seperator for CUS"
            tooltip="Only used with CUS for metrics. The symbol that seperates each row"
          />
          <FormField
            labelWidth={15}
            value={keyvalsep || ''}
            onChange={this.onkeyvalsepChange}
            label="Key/value seperator for CUS"
            tooltip="Only used with CUS for metrics. The symbol that seperates the key from the value for each entry"
          />
        </div>
      </div>
    );
  }
}
