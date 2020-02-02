import React, { useState } from 'react';
import { func, node, oneOfType } from 'prop-types';
import makeStyles from '@material-ui/styles/makeStyles';

import MenuIcon from '@material-ui/icons/Menu';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import { useAuthorization } from '../../lib/Sessions';
import styles from './styles';
import AccountItems from './components/AccountItems';
import NavItems from './components/NavItems';

const useStyles = makeStyles(styles);

const DrawerItems = () => (
  <>
    <List>
      <NavItems />
    </List>
    <List>
      <Divider />
      <AccountItems />
    </List>
  </>
);

const Layout = ({ children }) => {
  const classes = useStyles();
  const isAuthed = useAuthorization();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

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
              <DrawerItems />
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
              <DrawerItems />
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
  children: oneOfType([func, node]).isRequired
};

export default Layout;
