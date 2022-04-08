import React, { useState, useEffect } from 'react';

import MenuIcon from '@mui/icons-material/Menu';

import {
  Theme,
  styled,
  AppBar,
  Container,
  Toolbar,
  Drawer,
  List,
  Divider,
  DrawerProps,
  useMediaQuery,
} from '@mui/material';
import { Outlet } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';

import AccountItems from '../components/AccountItems';
import NavItems from '../components/NavItems';
import { isAuthenticated, refreshToken } from '../lib/ApiStore';

const drawerWidth = 240;

const RootDrawer = styled('nav')(
  ({ theme }) => `
    ${theme.breakpoints.up('sm')} {
      width: ${drawerWidth}px;
      flex-shrink: 0;
    }
`
);

const drawerPaperProps: DrawerProps['PaperProps'] = {
  sx: {
    justifyContent: 'space-between',
    width: drawerWidth,
  },
};

const TopBar = styled(AppBar)(
  ({ theme }) => `
  margin-left: ${drawerWidth};
  ${theme.breakpoints.up('sm')} {
    width: calc(100% - ${drawerWidth}px);
  }
`
);

const ToolbarOffset = styled('div')(({ theme }) => theme.mixins.toolbar);

const MainContainer = styled(Container)<{ component: string }>(
  ({ theme }) => `
    flex-grow: 1;
    padding: ${theme.spacing(3)};
`
);

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

const Layout: React.FC = () => {
  const smDown = useMediaQuery<Theme>((theme) => theme.breakpoints.down('sm'));
  const smUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up('sm'));
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
      {!smUp && (
        <TopBar position="fixed">
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
        </TopBar>
      )}
      <RootDrawer>
        {!smUp && (
          <Drawer
            variant="temporary"
            anchor="left"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            PaperProps={drawerPaperProps}
          >
            <DrawerItems />
          </Drawer>
        )}
        {!smDown && (
          <Drawer variant="permanent" open PaperProps={drawerPaperProps}>
            <DrawerItems />
          </Drawer>
        )}
      </RootDrawer>
      <MainContainer component="main">
        {!smUp && <ToolbarOffset />}
        <Outlet />
      </MainContainer>
    </div>
  );
};

export default Layout;
