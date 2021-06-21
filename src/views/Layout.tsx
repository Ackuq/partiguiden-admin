import React, { useState, useEffect } from 'react';
import makeStyles from '@material-ui/styles/makeStyles';

import MenuIcon from '@material-ui/icons/Menu';

import { Theme } from '@material-ui/core';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import AccountItems from '../components/AccountItems';
import NavItems from '../components/NavItems';
import { isAuthenticated, refreshToken } from '../lib/ApiStore';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },

  drawerPaper: {
    justifyContent: 'space-between',
    width: drawerWidth,
  },

  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },

  toolbar: { [theme.breakpoints.down('xs')]: theme.mixins.toolbar },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

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

const Layout: React.FC = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    if (!isAuthenticated()) {
      refreshToken();
    }
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <Hidden smUp implementation="js">
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
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
              keepMounted: true, // Better open performance on mobile.
            }}
            classes={{
              paper: classes.drawerPaper,
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
              paper: classes.drawerPaper,
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
  );
};

export default Layout;
