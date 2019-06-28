import React, { useState } from 'react';
import { func, node, oneOfType, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu as MenuIcon } from '@material-ui/icons';
import {
  Drawer,
  List,
  Container,
  Hidden,
  Toolbar,
  AppBar,
  IconButton,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import { useAuthorization } from '../../lib/Sessions';
import styles from './styles';
import AccountItems from './components/AccountItems';
import NavItems from './components/NavItems';

const useStyles = makeStyles(styles);

const Layout = ({ children, history }) => {
  const classes = useStyles();
  const isAuthed = useAuthorization(history);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <React.Fragment>
      <List>
        <NavItems />
      </List>
      <List>
        <Divider />
        <AccountItems />
      </List>
    </React.Fragment>
  );

  return (
    isAuthed && (
      <div style={{ display: 'flex' }}>
        <Hidden smUp implementation="js">
          <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        </Hidden>
        <nav className={classes.drawer}>
          <Hidden smUp implementation="js">
            <Drawer
              variant="temporary"
              anchor="left"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="js">
            <Drawer
              variant="permanent"
              open
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <Container component="main" className={classes.content}>
          <div className={classes.toolbar} />
          {children}
        </Container>
      </div>
    )
  );
};

Layout.propTypes = {
  children: oneOfType([func, node]).isRequired,
  history: object.isRequired
};

export default withRouter(Layout);
