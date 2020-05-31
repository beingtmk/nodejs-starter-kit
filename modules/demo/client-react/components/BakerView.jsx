import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Row, Col, Divider, Spin } from 'antd';
import { PageLayout } from '@gqlapp/look-client-react';

import SuggestedCardListComponent from '@gqlapp/listing-client-react/components/SuggestedCardListComponent';

// import ListingItemComponent from './ListingItemComponent';
import UserDisplayDetailComponent from './UserDisplayDetailComponent';
// import ProfileComponenet from './ProfileComponenet';
// import ProfileMenuItem from './ProfileMenuItem';
// import UserDisplayComponent from './UserDisplayComponent';
// import HomeSlick from './HomeSlick';
// import CategoryIconSlick from './CategoryIconSlick';
import CategorySlick from './CategorySlick';
// import Cakes from '../Icons/cakes.svg';
// import MenuBar from './MenuBar';

const Profile = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: bold;
  font-size: 34px;
  line-height: 42px;

  /* Black */

  color: #222222;
`;

const BakerView = props => {
  const { loading, listings, t, users, user, homeSlick, categorySlick, profileList } = props;

  // const renderHome = () => {
  //   return (
  //     <>
  //       <HomeSlick data={homeSlick} />
  //       <CategoryIconSlick data={categorySlick} />
  //       {users.map(user => {
  //         return <UserDisplayComponent user={user} />;
  //       })}
  //     </>
  //   );
  // };

  // const renderCart = () => {
  //   return <h1>Empty...</h1>;
  // };

  // const renderFavorites = () => {
  //   return <h1>Empty...</h1>;
  // };

  // const renderProfile = () => {
  //   return (
  //     <div style={{ padding: '20px' }}>
  //       <Profile>My Profile</Profile>
  //       <ProfileComponenet user={user} />
  //       {profileList.map(item => {
  //         return <ProfileMenuItem data={item} />;
  //       })}
  //     </div>
  //   );
  // };
  // const renderContent = () => {
  //   return (
  //     !props.loading && (
  //       <PageLayout selectedTab="HOME">
  //         <UserDisplayDetailComponent user={user} />
  //         <CategorySlick data={categorySlick} />
  //         {console.log('props bkaerview', props)}
  //         <div style={{ padding: '20px' }}>
  //           <SuggestedCardListComponent {...props} />
  //         </div>
  //         {/* <div style={{ padding: '20px' }}>
  //           <MenuBar
  //             selectedTab="NONE"
  //             home={renderHome}
  //             cart={renderCart}
  //             favorites={renderFavorites}
  //             profile={renderProfile}
  //           ></MenuBar>
  //         </div> */}
  //       </PageLayout>
  //     )
  //   );
  // };

  const RenderListings = () => (
    <div>
      <Divider style={{ margin: '5px 0px 10px' }} />
      <SuggestedCardListComponent {...props} />
    </div>
  );

  return (
    <PageLayout>
      <UserDisplayDetailComponent user={user} />
      <CategorySlick data={categorySlick} />
      {console.log('props bkaerview', props)}
      {listings && listings.totalCount ? <RenderListings /> : !loading ? <NoListingsMessage t={t} /> : <Spin />}
      {/* <div style={{ padding: '20px' }}>
            <MenuBar
              selectedTab="NONE"
              home={renderHome}
              cart={renderCart}
              favorites={renderFavorites}
              profile={renderProfile}
            ></MenuBar>
          </div> */}
    </PageLayout>
  );
};

BakerView.propTypes = {
  t: PropTypes.func,
  loading: PropTypes.bool,
  listings: PropTypes.object
};

export default BakerView;

const NoListingsMessage = ({ t }) => <div className="text-center">{t('listing.noListingsMsg')}</div>;
NoListingsMessage.propTypes = { t: PropTypes.func };
