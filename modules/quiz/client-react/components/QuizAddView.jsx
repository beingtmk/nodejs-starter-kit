import React from "react";
// import Grid from "hedron";
import Helmet from "react-helmet";

// import { TranslateFunction } from "@gqlapp/i18n-client-react";
import {
  // LayoutCenter,
  PageLayout,
  Card,
  CardTitle,
  Icon,
} from "@gqlapp/look-client-react";
import {Spin as Loader} from 'antd';
import settings from "@gqlapp/config";

import QuizAddForm from "./QuizAddForm";
// import { QuizAddForm as IQuizAddForm } from "../types";

const QuizAddView = (props) => {
  const { t } = props;
  const renderContent = (loading) => (
    <div style={{ maxWidth: '800px', margin: 'auto' }}>
      <Card style={{marginBottom:'30px'}}>
        <h1 style={{fontSize:"25px"}}>
        <Icon type="plus" /> {'Add Quiz'}
        </h1>
      </Card>
      {loading? <div align='center' style={{marginTop:'50px'}}><Loader /></div> : (<QuizAddForm {...props} />)}
    </div>
  );
  return (
    <PageLayout type="forms" align='center'>
      <Helmet
        title={`${settings.app.name} - ${'Quiz'}`}
        meta={[
          {
            name: "description",
            content: `${settings.app.name} - ${'Add'}`,
          },
        ]}
      />

      {renderContent(props.quizLoading)}
    </PageLayout>
  );
};

export default QuizAddView;
