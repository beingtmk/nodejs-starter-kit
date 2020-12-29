import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';

import Space from './Space';
import FormItem from './FormItem';
import Modal from './Modal';
import Icon from './Icon';

const RenderUploadWithCrop = props => {
  const { height, width, label, formik, icon = 'UploadOutlined', name, setload, cropPropSettings = {}, value } = props;
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState(
    value
      ? [
          {
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: value
          }
        ]
      : []
  );

  const onChangeHandler = ({ file, fileList }) => {
    if (file.status === 'uploading') {
      setload(true);
    }

    if (file.status == 'done') {
      setload(false);
      if (file.response) {
        let url = file.response.secure_url;
        if (url) {
          //set value in form
          formik.handleChange({ target: { value: url, name } });
        }
      }
    } else if (file.status == 'removed') {
      setload(false);
      //remove value in form
      formik.handleChange({ target: { value: '', name } });
      // input.onChange('');
    }
    setFileList(fileList);
  };

  const handleCancel = () => setPreviewVisible(false);

  const handlePreview = file => {
    setPreviewImage(file.url || file.thumbUrl);
    setPreviewVisible(true);
  };

  const uploadButton = (
    <div>
      <Icon type="PlusOutlined" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );

  const cloudinary_url = 'https://api.cloudinary.com/v1_1/nodejs-starter-kit/image/upload';
  const cloudinary_data = { upload_preset: 'hycdtdxe' };
  let validateStatus = '';

  const cropSettings = {
    aspect: width / height,
    modalTitle: 'Align image',
    ...cropPropSettings
  };

  // console.log('props', shape);
  return (
    <FormItem
      label={
        <Space align="center">
          {icon && <Icon type={icon} />}
          {label}
        </Space>
      }
      validateStatus={validateStatus}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
    >
      <div className="clearfix">
        <ImgCrop {...cropSettings}>
          <Upload
            action={cloudinary_url}
            data={cloudinary_data}
            listType="picture-card"
            fileList={fileList}
            onPreview={handlePreview}
            onChange={onChangeHandler}
          >
            {fileList.length >= 1 ? null : uploadButton}
          </Upload>
        </ImgCrop>
        <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
          <img alt="image" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>{' '}
    </FormItem>
  );
};

RenderUploadWithCrop.propTypes = {
  input: PropTypes.object,
  label: PropTypes.string,
  setload: PropTypes.func,
  value: PropTypes.string,
  height: PropTypes.number,
  width: PropTypes.number,
  formik: PropTypes.object,
  cropPropSettings: PropTypes.object,
  name: PropTypes.string,
  icon: PropTypes.string,
  shape: PropTypes.string
};

export default RenderUploadWithCrop;
