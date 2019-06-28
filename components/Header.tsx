import React from 'react';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ButtonGroup from '@material-ui/core/ButtonGroup';

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

          <IconButton ></IconButton>
          <Icon>star</Icon>
        </Box>
          {this.test('juuh')}
     </div>
    );
  }
}
