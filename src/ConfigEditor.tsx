import React, { ChangeEvent, PureComponent } from 'react';
import { LegacyForms, LinkButton } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MyDataSourceOptions } from './types';

const { FormField } = LegacyForms;

interface Props extends DataSourcePluginOptionsEditorProps<MyDataSourceOptions> {}

interface State {}

export class ConfigEditor extends PureComponent<Props, State> {
  onPortChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      Port: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  onServerChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { onOptionsChange, options } = this.props;
    const jsonData = {
      ...options.jsonData,
      Server: event.target.value,
    };
    onOptionsChange({ ...options, jsonData });
  };

  render() {
    const { options } = this.props;
    const { jsonData } = options;

    return (
      <div className="gf-form-group">
        <div className="gf-form">
          <FormField
            label="YottaDB Metrics Server Address"
            labelWidth={15}
            inputWidth={15}
            onChange={this.onServerChange}
            value={jsonData.Server || ''}
            placeholder="localhost"
          />
          <FormField
            label="YottaDB Metrics Server Port"
            labelWidth={15}
            inputWidth={4}
            onChange={this.onPortChange}
            value={jsonData.Port || ''}
            placeholder="5000"
          />
        </div>

        <div className="gf-form-inline">
          <div className="gf-form"></div>
        </div>
        <p style={{ marginInline: '30px', marginBlock: '15px', textAlign: 'center' }}>
          <LinkButton
            variant="secondary"
            size="md"
            target="_blank"
            href="https://github.com/RamSailopal/YottaDB-Grafana-Plugin"
            rel="noreferrer"
            style={{ marginInlineEnd: '5px' }}
          >
            Give us a star in Github
          </LinkButton>
        </p>
      </div>
    );
  }
}
