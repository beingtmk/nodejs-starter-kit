/* eslint-disable react/display-name */

import React from 'react';
import PropTypes from 'prop-types';
import { Table, Loading } from '@gqlapp/look-client-react';
import { Popconfirm, Button, message } from 'antd';

import ModelsFormComponent from './ModelsFormComponent';

const ModelsComponent = ({
  // orderBy,
  // onOrderBy,
  loading,
  models,
  // currentUser,
  addModel,
  deleteModel,
  updateModel
}) => {
  const cancel = () => {
    message.error('Task cancelled');
  };

  // const renderOrderByArrow = name => {
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === "desc") {
  //       return <span className="badge badge-primary">&#8595;</span>;
  //     } else {
  //       return <span className="badge badge-primary">&#8593;</span>;
  //     }
  //   } else {
  //     return <span className="badge badge-secondary">&#8645;</span>;
  //   }
  // };

  // const handleOrderBy = (e, name) => {
  //   e.preventDefault();
  //   let order = "asc";
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === "asc") {
  //       order = "desc";
  //     } else if (orderBy.order === "desc") {
  //       return onOrderBy({
  //         column: "",
  //         order: ""
  //       });
  //     }
  //   }
  //   return onOrderBy({ column: name, order });
  // };

  const handleDelete = id => {
    return deleteModel(id);
  };

  const columns = [
    {
      title: (
        <a /*onClick={e => handleOrderBy(e, 'name')}*/ href="#">
          {'Name'} {/*renderOrderByArrow('name')*/}
        </a>
      ),
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: (
        <a /*onClick={e => handleOrderBy(e, ' gearCategory')}*/ href="#">
          {'Description'} {/*renderOrderByArrow(' gearCategory')*/}
        </a>
      ),
      dataIndex: 'desc',
      key: 'desc',
      sorter: (a, b) => a.desc.length - b.desc.length,
      sortDirections: ['descend', 'ascend']
    },
    {
      title: 'Delete',
      key: 'actions',
      dataIndex: 'id',
      render: (text, record) => (
        <>
          <Popconfirm
            title="Cancel Request?"
            onConfirm={() => handleDelete(text)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button shape="circle" icon="delete" type="danger" size="small" />
          </Popconfirm>
          <ModelsFormComponent model={record} title={'Edit the Model'} onSubmit={updateModel} />
        </>
      )
    }
  ];

  return (
    <>
      {loading && !models ? (
        <Loading text="Loading... " />
      ) : (
        <>
          <Table
            dataSource={models}
            columns={columns}
            title={() => <ModelsFormComponent title={'Add a Model'} onSubmit={addModel} />}
          />
        </>
      )}
    </>
  );
};

ModelsComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  models: PropTypes.array,
  // orderBy: PropTypes.object,
  // onOrderBy: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  addModel: PropTypes.func,
  updateModel: PropTypes.func,
  deleteModel: PropTypes.func
};

export default ModelsComponent;
