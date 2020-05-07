import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Form, DatePicker, Card, Select } from 'antd';
import { withFormik, FieldArray } from 'formik';

import { isFormError, FieldAdapter as Field } from '@gqlapp/forms-client-react';
import { minLength, required, validate } from '@gqlapp/validation-common-react';
import { RenderField, RenderUploadMultiple, Button } from '@gqlapp/look-client-react';

const ListingFormSchema = {
  // title: [required, minLength(3)],
  // description: [required, minLength(20)]
};

class ListingFormComponent extends React.Component {
  state = {
    load: false
  };
  render() {
    const { cardTitle, values, handleSubmit } = this.props;

    // console.log('load', load);

    console.log('props form component', this.props.values);
    return (
      <Card
        title={
          <h1>
            <strong>{cardTitle}</strong>
          </h1>
        }
      >
        <Form onSubmit={handleSubmit}>
          <Field
            name="title"
            component={RenderField}
            placeholder="Listing Title"
            type="text"
            label="Listing Title"
            value={values.title}
          />
          <Field
            name="description"
            component={RenderField}
            placeholder="Description"
            type="textarea"
            label="Description"
            value={values.description}
          />

          <Field
            name="listingCost.cost"
            component={RenderField}
            placeholder="Cost"
            type="number"
            label="Cost"
            value={values.listingCost.cost}
          />
          {/* <Field
            name='listingImage'
            component={RenderUploadMultiple}
            type='text'
            setload={(load) => this.setState({ load: load })}
            label={'Listing Image'}
            value={values.listingImage}
          /> */}
          <FieldArray
            name="listingImage"
            label={'Listing Image'}
            render={arrayHelpers => (
              <RenderUploadMultiple
                setload={load => this.setState({ load: load })}
                arrayHelpers={arrayHelpers}
                values={values.listingImage}
                dictKey="imageUrl"
              />
            )}
          />

          <Button color="primary" type="submit" disabled={this.state.load}>
            Submit
          </Button>
        </Form>
      </Card>
    );
  }
}

ListingFormComponent.propTypes = {
  cardTitle: PropTypes.string,
  t: PropTypes.func,
  handleSubmit: PropTypes.func,
  values: PropTypes.object
};

const ListingWithFormik = withFormik({
  mapPropsToValues: props => {
    function getListingImage(listingImg) {
      return {
        id: (listingImg && listingImg.id) || null,
        description: (listingImg && listingImg.description) || '',
        imageUrl: (listingImg && listingImg.imageUrl) || ''
      };
    }

    return {
      id: (props.listing && props.listing.id) || null,
      userId: (props.listing && props.listing.userId) || (props.currentUser && props.currentUser.id) || null,
      isActive: (props.listing && props.listing.isActive) || false,
      title: (props.listing && props.listing.title) || '',
      description: (props.listing && props.listing.description) || '',
      listingCost: (props.listing && props.listing.listingCost.cost) || { cost: null },
      listingImage:
        (props.listing && props.listing.listingImage && props.listing.listingImage.map(getListingImage)) || []
    };
  },
  async handleSubmit(values, { setErrors, props: { onSubmit } }) {
    console.log('on submit called');
    await onSubmit(values).catch(e => {
      if (isFormError(e)) {
        setErrors(e.errors);
      } else {
        throw e;
      }
    });
  },
  validate: values => validate(values, ListingFormSchema),
  displayName: 'Listing Form' // helps with React DevTools
});

export default ListingWithFormik(ListingFormComponent);
