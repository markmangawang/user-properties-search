import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Icon, Segment, Loader } from 'semantic-ui-react';

function Properties({ list, loading }) {
  if (loading) {
    return (
      <Loader
        inline="centered"
        active
        size="large">
        Loading
      </Loader>
    );
  }

  if (!list || list.length === 0) {
    return <Segment>No results found.</Segment>;
  }

  return (
    <Grid centered stackable columns={3}>
      { list.map((property) => {
        return (
          <Grid.Column key={property.id}>
            <Card>
              <Card.Content>
                <Card.Header>{ property.street }</Card.Header>
                <Card.Meta>
                  <span>{ property.city }, { property.state }</span>
                </Card.Meta>
                <Card.Description>${ property.rent }</Card.Description>
              </Card.Content>
              <Card.Content extra>
                <a>
                  <Icon name='user' />
                  { property.user.firstName } { property.user.lastName }
                </a>
              </Card.Content>
            </Card>
          </Grid.Column>
        );
      }) }
    </Grid>
  );
}

Properties.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      street: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      state: PropTypes.string.isRequired,
      rent: PropTypes.number.isRequired,
      user: PropTypes.shape({
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
}

export default Properties;
