import React from 'react';
import PropTypes from 'prop-types';

import { Form, Upload, Icon } from 'antd';

const FormItem = Form.Item;

export default class RenderUpload extends React.Component {
  onChangeHandler = ({ file }) => {
    // console.log(file.response.secure_url);
    const arrayHelpers = this.props.arrayHelpers;

    if (file.status === 'uploading') {
      this.props.setload(true);
    }
    if (file.status == 'done') {
      this.props.setload(false);
      if (file.response) {
        let url = file.response.secure_url;
        if (url) {
          //set value in form
          const dictKey = this.props.dictKey;
          let obj = {};
          obj[dictKey] = url;
          arrayHelpers.push(obj);
        }
      }
    } else if (file.status == 'removed') {
      //remove value in form
      this.props.setload(false);
      arrayHelpers.remove(file.uid);
    }
  };
  render() {
    // { input, label, meta: { touched, error }, defaultFileList }) = this.props
    // const touched = this.props.meta.touched;
    // const error = this.props.meta.error;
    const label = this.props.label;
    // const input = this.props.input;
    // const defaultFileList = this.props.defaultFileList;

    const cloudinary_url = 'https://api.cloudinary.com/v1_1/nodejs-starter-kit/image/upload';
    // const cloudinary_url =
    //   'https://api.cloudinary.com/v1_1/www-lenshood-in/image/upload';
    // { upload_preset: 'nxzf2ip6' }
    // const headers = { 'Content-Type': 'application/x-www-form-urlencoded' };
    // const cloudinary_data = { upload_preset: 'nxzf2ip6' };
    const cloudinary_data = { upload_preset: 'hycdtdxe' };

    let validateStatus = '';
    // if (touched && error) {
    //   validateStatus = 'error';
    // }
    let defaultFileList = [];
    if (this.props.values) {
      defaultFileList = this.props.values.map((img, index) => ({
        uid: index,
        name: 'link',
        status: 'done',
        url: img.imageUrl,
        thumbUrl: img.imageUrl
      }));
    }

    return (
      <FormItem label={label} validateStatus={validateStatus}>
        <div className="dropbox">
          <Upload.Dragger
            defaultFileList={defaultFileList}
            name="file"
            listType="picture"
            className="upload-list-inline"
            onChange={this.onChangeHandler}
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
  }
}
RenderUpload.propTypes = {
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
