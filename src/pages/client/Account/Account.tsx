import { Button, Grid, Skeleton, TableRow, TableCell, Table, TableBody } from '@mui/material';
import React from 'react';
import CameraIcon from '@mui/icons-material/Camera';

import { ContainerGrey } from '../../../components/MuiStyling/MuiStyling';
import { User } from '../../../reduxToolKit-Saga/types/auth';
import clientService from '../../../services/clientService';
import './Account.scss';
import TimeHelper from '../../../common/helper/time';

import Profile from './Components/Profile';
import { Coupon } from './Components/Coupon';
import WishList from './Components/WishList';
import History from './Components/History';

enum Tab {
  PROFILE = 'Profile',
  WISH_LIST = 'Wish List',
  COUPON = 'Coupon',
  HISTORY = 'Bought History',
}
const tabExist = [Tab.PROFILE, Tab.WISH_LIST, Tab.COUPON, Tab.HISTORY];

export const Account = () => {
  const [client, setClient] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [tab, setTab] = React.useState<Tab>(Tab.PROFILE);

  React.useEffect(() => {
    async function fetchClient() {
      try {
        setLoading(true);
        const user = await clientService.getClientData();
        setClient(user);
      } catch (error) {
        console.log('error: ', error);
      } finally {
        setLoading(false);
      }
    }

    fetchClient();
  }, []);

  const renderTab = () =>
    tabExist.map((each) => {
      return (
        <>
          {each === tab ? (
            <div className="account-tab account-tab-active">{each}</div>
          ) : (
            <div className="account-tab" onClick={() => setTab(each)}>
              {each}
            </div>
          )}
        </>
      );
    });

  const renderView = () => {
    if (tab === Tab.PROFILE) {
      return <Profile info={client?.info} />;
    }
    if (tab === Tab.COUPON) {
      return <Coupon />;
    }
    if (tab === Tab.HISTORY) {
      return <History />;
    }
    if (tab === Tab.WISH_LIST) {
      return <WishList />;
    }
  };

  return (
    <ContainerGrey>
      <Grid container className="pt-20">
        <Grid item sm={12} md={4}>
          <div className="flex px-6 pt-2 flex-col items-center">
            {!loading && client !== null ? (
              <>
                <div className="relative">
                  <img alt="" src={client?.info.avatar} className="account-avatar" />
                  <Button variant="contained" className="account-change-avatar-btn">
                    <CameraIcon />
                  </Button>
                </div>
                <div className="bg-white mt-8 rounded-2xl ">
                  <h1 className="account-text-headline text-center">
                    {client?.info.firstName + ' ' + client?.info.lastName}
                  </h1>
                  <Table sx={{ marginBlock: '1rem', width: '100%' }}>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <span className="font-poppin font-semibold">Account Status:</span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {client?.status}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <span className="font-poppin font-semibold">Last Seen:</span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {client?.lastLoginTime === null
                            ? TimeHelper.formatDate(new Date())
                            : TimeHelper.formatDate(String(client?.lastLoginTime))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <span className="font-poppin font-semibold">Joined Date:</span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {TimeHelper.formatDate(String(client?.createdAt))}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <span className="font-poppin font-semibold">Email:</span>
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {client?.email}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </>
            ) : (
              <>
                <Skeleton variant="circular" width={'15rem'} height={'15rem'} />
                <div className="bg-white mt-3 rounded-t-2xl w-full px-5 ">
                  <Skeleton variant="text" width={'100%'} height={'4rem'} sx={{ marginTop: '1.5rem' }} />
                  <Skeleton variant="text" width={'100%'} height={'4rem'} />
                  <Skeleton variant="text" width={'100%'} height={'4rem'} />
                  <Skeleton variant="text" width={'100%'} height={'4rem'} />
                  <Skeleton variant="text" width={'100%'} height={'4rem'} />
                </div>
              </>
            )}
          </div>
          {renderTab()}
        </Grid>
        <Grid item sm={12} md={8}>
          <div className="px-16 ">{renderView()}</div>
        </Grid>
      </Grid>
    </ContainerGrey>
  );
};