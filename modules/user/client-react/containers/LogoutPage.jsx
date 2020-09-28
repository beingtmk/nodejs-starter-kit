import React from 'react';
import PropTypes from 'prop-types';
import { Result, Button } from 'antd';

import { PageLayout } from '@gqlapp/look-client-react';


const LogoutPage = props => {

  return (
    <PageLayout>
<Result
    status="success"
    title="Successfully Logged Out"
    subTitle="Hey awesome manager, it was a pleasure having you here. And see you again soon!"
    extra={[
      <Button href='/' type="primary" key="console">
        Go to Home
      </Button>,
      <Button key="buy" href='/login'>SignIn</Button>,
    ]}
  />
      </PageLayout>
  );
};

LogoutPage.propTypes = {

};

export default (LogoutPage);
