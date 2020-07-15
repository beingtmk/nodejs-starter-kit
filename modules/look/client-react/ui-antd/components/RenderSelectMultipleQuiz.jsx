import React from 'react';
import PropTypes from 'prop-types';
import { Form,Select } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

const RenderSelectMultipleQuiz = props => {
  const {
    input,
    label,
    type,
    children,
    mode,
    arrayHelpers,
    setload,
    dictKey,
    value,
    data,
    currentUserId,
    // meta: { touched, error }
  } = props;
  let validateStatus = '';
  // if (touched && error) {
  //   validateStatus = 'error';
  // }

  // onChangeHandler = (e) => {
  //   // console.log(file.response.secure_url);
  //   const arrayHelpers = arrayHelpers;
  //   if (file.status == 'done') {
  //     setload(false);
  //     if (file.response) {
  //       let url = file.response.secure_url;
  //       if (url) {
  //         //set value in form
  //         const dictKey = dictKey;
  //         let obj = {};
  //         obj[dictKey] = url;
  //         arrayHelpers.push(obj);
  //       }
  //     }
  //   } else if (file.status == 'removed') {
  //     //remove value in form
  //     setload(false);
  //     arrayHelpers.remove(file.uid);
  //   }
  // };

  const handleSelect = (e) =>{
    console.log('selec', e)
    var obj = {};
    obj['choiceId'] = e;
    obj['userId'] = currentUserId;
    obj['questionId'] = data.id;
    obj['content'] = '';
    arrayHelpers.push(obj)
  }
  const handleDeSelect = (e) =>{
    console.log('deselec', e)
    const item = value.find(v=> v.choiceId === e);
    arrayHelpers.pop(item);


  }
  console.log('mselect', arrayHelpers)
  var defaultValues = [];
  data && data.answers && data.answers.map((item, key)=>{
    defaultValues.push(item.choiceId)
  })
  return (
    <FormItem label={label} validateStatus={validateStatus} 
    // help={error}
    >
      <div>
        <Select
          mode='multiple'
          // showSearch
          // optionFilterProp="children"
          placeholder={label}
          // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          defaultValue={defaultValues}
          // type={type}
          onSelect={handleSelect}
          onDeselect={handleDeSelect}
        >
          {data.choices.map((d, i)=>(
            <Option value = {d.id} key={i}>{d.description}</Option>
          ))}
        </Select>
      </div>
    </FormItem>
  );
};

RenderSelectMultipleQuiz.propTypes = {
  formik: PropTypes.object.isRequired,
  input: PropTypes.object,
  label: PropTypes.string,
  type: PropTypes.string,
  meta: PropTypes.object,
  name: PropTypes.string.isRequired,
  children: PropTypes.node
};

export default RenderSelectMultipleQuiz;
