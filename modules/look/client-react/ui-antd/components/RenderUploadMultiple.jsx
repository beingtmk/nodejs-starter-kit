import React from 'react';
import PropTypes from 'prop-types';

import { Form, Upload, Icon } from 'antd';

const FormItem = Form.Item;

const RenderUploadMultiple = props => {
  const { values, label, setload, arrayHelpers } = props;

  const cloudinary_url = 'https://api.cloudinary.com/v1_1/gemspremium/image/upload';
  const cloudinary_data = { upload_preset: 'nu4nfnxt' };

  let validateStatus = '';
  let defaultFileList = [];
  if (values) {
    defaultFileList = values.map((img, index) => ({
      uid: index,
      name: 'link',
      status: 'done',
      url: img.url,
      thumbUrl: img.url
    }));
  }
  const onChangeHandler = ({ file }) => {
    // console.log(file.response.secure_url);

    if (file.status === 'uploading') {
      setload(true);
    }
    if (file.status == 'done') {
      setload(false);
      if (file.response) {
        let url = file.response.secure_url;
        if (url) {
          //set value in form
          const dictKey = dictKey;
          let obj = {};
          obj[dictKey] = url;
          arrayHelpers.push(obj);
        }
      }
    } else if (file.status == 'removed') {
      //remove value in form
      const index = defaultFileList.indexOf(
        defaultFileList.filter(f => file.url == f.url && file.status == 'removed' && f)[0]
      );
      setload(false);
      arrayHelpers.remove(index);
    }
  };
  console.log(defaultFileList);

  return (
    <FormItem label={label} validateStatus={validateStatus}>
      <div className="dropbox">
        <Upload.Dragger
          defaultFileList={defaultFileList}
          name="file"
          listType="picture"
          className="upload-list-inline"
          onChange={onChangeHandler}
          action={cloudinary_url}
          data={cloudinary_data}
          // headers={headers}
        >
          <p className="ant-upload-drag-icon">
            <Icon type="inbox" />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">Support for a single or bulk upload.</p>
        </Upload.Dragger>
      </div>
    </FormItem>
  );
};

RenderUploadMultiple.propTypes = {
  dictKey: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  setload: PropTypes.func,
  defaultFileList: PropTypes.arrayOf(
    PropTypes.shape({
      uid: PropTypes.number,
      name: PropTypes.string,
      status: PropTypes.string,
      url: PropTypes.string,
      thumbUrl: PropTypes.string
    })
  ),
  arrayHelpers: PropTypes.object,
  values: PropTypes.array
};
export default RenderUploadMultiple;
