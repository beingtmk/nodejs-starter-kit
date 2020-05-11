import React from 'react';
import Helmet from 'react-helmet';
import {Spin as Loader} from 'antd';
import { PageLayout, Card } from '@gqlapp/look-client-react';
import { TranslateFunction } from '@gqlapp/i18n-client-react';
import settings from '@gqlapp/config';
import QuizForm from './QuizForm';

const renderMetaData = (t) => (
  <Helmet
    title={`${settings.app.name} - ${t('title')}`}
    meta={[{ name: 'description', content: `${settings.app.name} - ${t('meta')}` }]}
  />
);

const QuizView = (props) => {
  return (
    <PageLayout type='forms'>
      {renderMetaData(props.t)}
  {props.quizLoading || props.currentUserLoading ? <div style={{marginTop:'10vh'}} align='center'><Loader /></div> : (<Card style={{maxWidth:'500px', margin:'auto'}} title={<h1>{props.quiz && props.quiz.title}</h1>}><QuizForm {...props} /></Card>)}
    </PageLayout>
  );
};

export default QuizView;
