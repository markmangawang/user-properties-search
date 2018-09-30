import React from 'react';
import { Input, Form, Grid } from 'semantic-ui-react';

export default class SearchInput extends React.PureComponent {
  state = {
    value: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);
  }

  handleChange = (e) => {
    this.setState({ value: e.target.value });
  }

  render() {
    const { value } = this.state;

    return (
      <Grid centered>
        <Grid.Column width={16}>
          <Form onSubmit={this.handleSubmit}>
            <Input
              value={value}
              onChange={this.handleChange}
              action={{ icon: 'search' }}
              placeholder="Search" />
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}
