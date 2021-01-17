import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';
import filesize from 'filesize';

import { Row, Col, PageLayout, Table, Alert, DeleteIcon, MetaTags } from '@gqlapp/look-client-react';

const UploadView = ({ files, error, loading, handleUploadFiles, handleRemoveFile, t }) => {
  const columns = [
    {
      title: t('table.column.name'),
      dataIndex: 'name',
      key: 'name',
      render(text, record) {
        return (
          <a href={record.path} download={text}>
            {text} ({filesize(record.size)})
          </a>
        );
      }
    },
    {
      title: t('table.column.actions'),
      key: 'actions',
      width: 50,
      render(text, record) {
        return <DeleteIcon onClick={() => handleRemoveFile(record.id)} />;
      }
    }
  ];

  return (
    <PageLayout>
      {/* <div className="text-center">
        <Row>
          <Col xs={4}>
            <Dropzone onDrop={handleUploadFiles}>
              <p>{t('message')}</p>
            </Dropzone>
          </Col>
          <Col xs={8}>
            {loading && <span>Loading...</span>}
            {error && <Alert color="error">{error}</Alert>}
            {files && <Table dataSource={files} columns={columns} />}
          </Col>
        </Row>
      </div>  */}

      <MetaTags title={t('title')} description={t('meta')} />
      <Row justify="center">
        <Col xs={24} sm={8} md={6} lg={4}>
          <Dropzone onDrop={handleUploadFiles}>
            <p style={{ padding: '10px' }}>{t('message')}</p>
          </Dropzone>
        </Col>
        <Col xs={24} sm={{ span: 13, offset: 2 }} md={{ span: 17, offset: 1 }} lg={{ span: 19, offset: 1 }}>
          {loading && <span>Loading...</span>}
          {error && <Alert color="error">{error}</Alert>}
          {files && <Table dataSource={files} columns={columns} />}
        </Col>
      </Row>
    </PageLayout>
  );
};

UploadView.propTypes = {
  files: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool,
  handleUploadFiles: PropTypes.func.isRequired,
  handleRemoveFile: PropTypes.func.isRequired,
  t: PropTypes.func
};

export default UploadView;
