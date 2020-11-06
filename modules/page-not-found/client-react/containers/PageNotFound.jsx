import React from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';
import Helmet from 'react-helmet';
import styled from 'styled-components';

import { translate } from '@gqlapp/i18n-client-react';
import {
  PageLayout,
  Result
  // Button
} from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

const Section = styled.section`
  text-align: center;
`;

const PageNotFound = ({ staticContext = {}, t }) => {
  staticContext.pageNotFound = true;
  return (
    <PageLayout>
      <Section>
        <Helmet
          title={`${settings.app.name} - ${t('title')}`}
          meta={[
            {
              name: 'description',
              content: `${settings.app.name} - ${t('meta')}`
            }
          ]}
        />
        <Result
          status="404"
          title="404"
          subTitle="Sorry, the page you visited does not exist."
          // extra={
          //   <Button href="/" type="primary">
          //     Back Home
          //   </Button>
          // }
        />
      </Section>
    </PageLayout>
  );
};

PageNotFound.propTypes = {
  staticContext: PropTypes.object,
  t: PropTypes.func
};

export default translate('notFound')(PageNotFound);
