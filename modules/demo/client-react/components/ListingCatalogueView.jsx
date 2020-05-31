import React from 'react';
import styled from 'styled-components';
import { PageLayout } from '@gqlapp/look-client-react';

// import ListingItemComponent from './ListingItemComponent';
// import UserDisplayDetailComponent from './UserDisplayDetailComponent';
import ProfileComponenet from './ProfileComponenet';
import ProfileMenuItem from './ProfileMenuItem';
import UserDisplayComponent from './UserDisplayComponent';
import HomeSlick from './HomeSlick';
import CategoryIconSlick from './CategoryIconSlick';
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

const ListingCatalogueView = props => {
  const { listings, history, users, user, homeSlick, categorySlick, profileList } = props;
  console.log('props', props);

  const renderHome = () => {
    return (
      <>
        <HomeSlick data={homeSlick} />
        <CategoryIconSlick data={categorySlick} />
        {users.map(user => {
          return <UserDisplayComponent user={user} />;
        })}
        {/* {listings.map(item => {
          return <ListingItemComponent listing={item} />;
        })} */}
        {/* <UserDisplayDetailComponent user={user} /> */}
      </>
    );
  };

  const renderCart = () => {
    return <h1>Empty...</h1>;
  };

  const renderFavorites = () => {
    return <h1>Empty...</h1>;
  };

  const renderProfile = () => {
    return (
      <div style={{ padding: '20px' }}>
        <Profile>My Profile</Profile>
        <ProfileComponenet user={user} />
        {profileList.map(item => {
          return <ProfileMenuItem data={item} />;
        })}
      </div>
    );
  };

  const renderContent = () => {
    return (
      <PageLayout selectedTab="HOME" history={history}>
        <HomeSlick data={homeSlick} />
        <CategoryIconSlick data={categorySlick} />
        {users.map(user => {
          return <UserDisplayComponent user={user} />;
        })}
        {/* <MenuBar
          selectedTab="HOME"
          home={renderHome}
          cart={renderCart}
          favorites={renderFavorites}
          profile={renderProfile}
        /> */}
      </PageLayout>
    );
  };

  return (
    <>
      {renderContent()}
      {/* <PageLayout>
        <HomeSlick data={homeSlick} />
        <CategoryIconSlick data={categorySlick} />
        {users.map(user => {
          return <UserDisplayComponent user={user} />;
        })}
        {listings.map(item => {
          return <ListingItemComponent listing={item} />;
        })}
        <UserDisplayDetailComponent user={user} />
      </PageLayout> */}
    </>
  );
};

export default ListingCatalogueView;
