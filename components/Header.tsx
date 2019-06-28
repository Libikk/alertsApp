import React from 'react';
import { Button, Icon, Box, IconButton } from '@material-ui/core';
import { Visibility, Chat } from '@material-ui/icons';

export default class Header extends React.Component {

  test = (title :String) => {
    return title
  }

  render() {
    return (
      <div>
        <Box my={4}>

              <Button color="primary">One</Button>
              <Button color="secondary">Two</Button>
              <Button>Three</Button>
              <Chat />
              <Visibility />
              <Icon>card_travel</Icon>
          <IconButton ></IconButton>
          <Icon>star</Icon>
        </Box>
          {this.test('juuh')}
     </div>
    );
  }
}
