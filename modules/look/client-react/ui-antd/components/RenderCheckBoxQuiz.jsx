import React from "react";
import PropTypes from "prop-types";
import { Form, Checkbox } from "antd";

const FormItem = Form.Item;
const { Group } = Checkbox;

const RenderSelectMultipleQuiz = (props) => {
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
  let validateStatus = "";
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

  const handleChange = (e) => {
    value && value.map((val, valI) => {
      var valExists = e.find((eA) => eA === val.choiceId);
      if(!valExists){
        arrayHelpers.pop(val);
      }
    });
    e.map((eItem, eI) => {
      var checkExists = value && value.find((va) => va.choiceId === eItem);
      if (!checkExists) {
        var obj = {};
        obj["choiceId"] = eItem;
        obj["userId"] = currentUserId;
        obj["questionId"] = data.id;
        obj["content"] = "";
        arrayHelpers.push(obj);
      }
    });
  };
  // const handleDeSelect = (e) =>{
  //   console.log('deselec', e)
  //   const item = value.find(v=> v.choiceId === e);
  //   arrayHelpers.pop(item);

  // }
  var defaultValues = [];
  value &&
    value.map((item, key) => {
      defaultValues.push(item.choiceId);
    });
  return (
    <FormItem
      label={label}
      validateStatus={validateStatus}
      // help={error}
    >
      <div>
        <Group
          // mode='multiple'
          // showSearch
          // optionFilterProp="children"
          placeholder={label}
          // filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          value={defaultValues}
          defaultValue={defaultValues}
          // type={type}
          onChange={handleChange}
          // onDeselect={handleDeSelect}
        >
          {data.choices.map((d, i) => (
            <Checkbox value={d.id} key={i}>
              {d.description}
            </Checkbox>
          ))}
        </Group>
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
  children: PropTypes.node,
};

export default RenderSelectMultipleQuiz;
