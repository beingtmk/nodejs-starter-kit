import React from 'react';
import PropTypes from 'prop-types';

import { Form } from 'antd';

import { convertToRaw } from 'draft-js';
// if using webpack
import { ImageSideButton, Block, addNewBlock, Editor, createEditorState } from 'medium-draft';
import mediumDraftExporter from 'medium-draft/lib/exporter';
import mediumDraftImporter from 'medium-draft/lib/importer';

// import "isomorphic-fetch";
const FormItem = Form.Item;

class CustomImageSideButton extends ImageSideButton {
  onChange = async e => {
    const convertTobase64 = file => {
      return new Promise((resolve, reject) => {
        const reader = new window.FileReader();
        reader.readAsDataURL(file);
        reader.onload = function() {
          resolve(reader.result);
        };
        reader.onerror = function() {
          reject('Error');
        };
      });
    };
    convertTobase64(e.target.files[0]).then(res => {
      return this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src: res
        })
      );
    });
    this.props.close();
  };
}

export default class RenderContentField extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorState: this.props.value
        ? createEditorState(convertToRaw(mediumDraftImporter(this.props.value)))
        : createEditorState() // for empty content
    };

    this.sideButtons = [
      {
        title: 'Image',
        component: CustomImageSideButton
      }
    ];

    this.onChange = editorState => {
      this.setState({ editorState });
      this.props.DataUpdate(mediumDraftExporter(editorState.getCurrentContent()));
    };

    this.refsEditor = React.createRef();
  }

  componentDidMount() {
    this.refsEditor.current.focus();
  }

  render() {
    const { editorState } = this.state;
    const {
      label,
      meta: { touched, error },
      placeholder
    } = this.props;
    let validateStatus = '';
    if (touched && error) {
      validateStatus = 'error';
    }
    return (
      <FormItem label={label} validateStatus={validateStatus} help={touched && error}>
        <div style={{ border: '0.3px solid #ddd', padding: '0.4px' }}>
          <Editor
            ref={this.refsEditor}
            editorState={editorState}
            placeholder={placeholder || label}
            sideButtons={this.sideButtons}
            onChange={this.onChange}
          />
        </div>
      </FormItem>
    );
  }
}

RenderContentField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  DataUpdate: PropTypes.func,
  placeholder: PropTypes.string,
  meta: PropTypes.object
};
