import React from 'react';
import PropTypes from 'prop-types';
import { Card, Icon, Image, Grid } from 'semantic-ui-react';

const CardExampleCard = ({ image, name, listingsCount }) => (
  <Grid centered style={{ margin: '1em 0' }}>
    <Card color="blue">
      <Image src={ image } />
      <Card.Content>
        <Card.Header>{ name }</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <a>
          <Icon name='home' />
          { listingsCount } Listing/s
        </a>
      </Card.Content>
    </Card>
  </Grid>
);

CardExampleCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  listingsCount: PropTypes.number.isRequired,
};

export default CardExampleCard;
