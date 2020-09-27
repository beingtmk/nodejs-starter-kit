import React, { useState } from "react";
import PropTypes from "prop-types";
import { DebounceInput } from "react-debounce-input";
import {Switch} from 'antd';
import { translate } from "@gqlapp/i18n-client-react";
import {
  Form,
  FormItem,
  Select,
  Option,
  Input,
} from "@gqlapp/look-client-react";

const FaqFilterComponent = (props) => {
  const {
    filter: { searchText, isFeatured },
    orderBy,
    onSearchTextChange,
    onIsFeaturedChange,
  } = props;

  return (
    <Form layout="inline">
      <FormItem>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          placeholder="Search FAQ's"
          element={Input}
          value={searchText}
          onChange={(e) => onSearchTextChange(e.target.value)}
        />
      </FormItem>
    </Form>
  );
};

FaqFilterComponent.propTypes = {
  filter: PropTypes.object.isRequired,
  onSearchTextChange: PropTypes.func.isRequired,
  onFaqCategoryChange: PropTypes.func.isRequired,
};

export default translate("events")(FaqFilterComponent);
