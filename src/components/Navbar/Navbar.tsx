import React from 'react';
import { Toolbar, Typography, IconButton, AppBar, Menu, MenuItem, Container } from '@mui/material';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { AccountCircle, Menu as MenuIcon } from '@mui/icons-material';

import { MuiNavBarButton } from '../MuiStyling/MuiStyling';
import { routerPath } from '../../common/constants/routerPath';
import { getCookie } from '../../common/helper/storage';
import { useAppDispatch } from '../../common/hooks/ReduxHook';
import { AuthActionType } from '../../reduxToolKit-Saga/types/auth';
import CustomFooter from '../Footer/CustomFooter';
import { useWindowWidth } from '../../common/hooks/Window';

const Navbar = () => {
  const { pathname } = useLocation();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [open, setOpen] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const [windowWidth] = useWindowWidth();
  const token = getCookie('token');

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch({
      type: AuthActionType.LOGOUT,
    });
  };

  const renderMenuItem = () => {
    if (token === undefined) {
      let result = (
        <div>
          <MenuItem>
            <Link to={routerPath.auth.LOG_IN}>Sign In</Link>
          </MenuItem>
        </div>
      );

      if (windowWidth < 600) {
        result = (
          <div>
            <MenuItem>
              <Link to={routerPath.common.HOME}>Home</Link>
            </MenuItem>
            <MenuItem>
              <Link to={routerPath.common.BRAND}>Brand</Link>
            </MenuItem>
            <MenuItem>
              <Link to={routerPath.common.BLOGS}>Blog</Link>
            </MenuItem>
            <MenuItem>
              <Link to={routerPath.auth.LOG_IN}>Sign In</Link>
            </MenuItem>
          </div>
        );
      }

      return result;
    }

    return windowWidth > 600 ? (
      <div>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
        <MenuItem>
          <Link to={routerPath.auth.MY_ACCOUNT}>My Account</Link>
        </MenuItem>
      </div>
    ) : (
      <div>
        <MenuItem>
          <Link to={routerPath.common.HOME}>Home</Link>
        </MenuItem>
        <MenuItem>
          <Link to={routerPath.common.BRAND}>Brand</Link>
        </MenuItem>
        <MenuItem>
          <Link to={routerPath.common.BLOGS}>Blog</Link>
        </MenuItem>
        <MenuItem onClick={handleLogout}>Log out</MenuItem>
        <MenuItem>
          <Link to={routerPath.auth.MY_ACCOUNT}>My Account</Link>
        </MenuItem>
      </div>
    );
  };

  return (
    <div>
      <AppBar position="fixed" sx={{ backgroundColor: '#fff' }}>
        <Toolbar variant="regular" sx={{ width: '100%', paddingBlock: '20px' }}>
          <Typography variant="h6" color="inherit" sx={{ letterSpacing: '2px', color: 'black', fontWeight: 600 }}>
            Gara-Auto
          </Typography>
          <Container sx={{ display: 'flex', justifyContent: 'flex-end', marginInline: '0', ml: 'auto' }}>
            {windowWidth > 600 ? (
              <div>
                <MuiNavBarButton sx={{ color: `${pathname.includes('home') ? 'black' : '#C4C4C4'}` }}>
                  <Link to={routerPath.common.HOME}>Home</Link>
                </MuiNavBarButton>
                <MuiNavBarButton sx={{ color: `${pathname.includes('brand') ? 'black' : '#C4C4C4'}` }}>
                  <Link to={routerPath.common.BRAND}>Brand</Link>
                </MuiNavBarButton>
                <MuiNavBarButton sx={{ color: `${pathname.includes('blog') ? 'black' : '#C4C4C4'}` }}>
                  <Link to={routerPath.common.BLOGS}>Blog</Link>
                </MuiNavBarButton>
                <IconButton sx={{ color: 'black' }} onClick={handleClick}>
                  <AccountCircle fontSize="large" />
                  <Menu id="basic-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {renderMenuItem()}
                  </Menu>
                </IconButton>
              </div>
            ) : (
              <div>
                <IconButton sx={{ color: 'black' }} onClick={handleClick}>
                  <MenuIcon fontSize="large" />
                  <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                    {renderMenuItem()}
                  </Menu>
                </IconButton>
              </div>
            )}
          </Container>
        </Toolbar>
      </AppBar>
      <Outlet />
      <CustomFooter windowWidth={windowWidth} />
    </div>
  );
};

export default Navbar;
