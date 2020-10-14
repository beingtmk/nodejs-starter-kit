/* eslint-disable react/display-name */

import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { Spin as Loader, Tooltip, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { translate } from "@gqlapp/i18n-client-react";
import {
  Table,
  Button,
  CatalogueWithInfiniteScroll,
  RenderTableLoading,
} from "@gqlapp/look-client-react";

const QuizzesView = ({
  loading,
  quizList,
  t,
  deleteQuiz,
  duplicateQuiz,
  currentUser,
  loadDataQuizList,
}) => {
  //

  // const renderOrderByArrow = name => {
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'desc') {
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

  //   let order = 'asc';
  //   if (orderBy && orderBy.column === name) {
  //     if (orderBy.order === 'asc') {
  //       order = 'desc';
  //     } else if (orderBy.order === 'desc') {
  //       return onOrderBy({
  //         column: '',
  //         order: ''
  //       });
  //     }
  //   }

  //   return onOrderBy({ column: name, order });
  // };

  const cancel = () => {
    message.error("Task cancelled");
  };

  const columns = [
    {
      title: (
        <>
          <h5>Id</h5>
          {/* <a onClick={e => handleOrderBy(e, 'username')} href="#">
          {t('users.column.name')} {renderOrderByArrow('username')}
        </a> */}
        </>
      ),
      dataIndex: "id",
      key: "id",
      render: (text, record) => (
        <>
          {record.node.id}
          {/* <Link className="user-link" to={`/users/${record.id}`}>
          {text}
        </Link> */}
        </>
      ),
    },
    {
      title: (
        <>
          <h5>Title</h5>
          {/* <a onClick={e => handleOrderBy(e, 'description')} href="#">
          {t('users.column.email')} {renderOrderByArrow('email')}
        </a> */}
        </>
      ),
      dataIndex: "node.title",
      key: "title",
    },
    {
      title: (
        <>
          <h5>User</h5>
          {/* <a onClick={e => handleOrderBy(e, 'isActive')} href="#">
          {t('users.column.active')} {renderOrderByArrow('isActive')}
        </a> */}
        </>
      ),
      dataIndex: "record.user.username",
      key: "username",
      render: (text, record) => (
        <h5>{record.node.user && record.node.user.username}</h5>
      ),
    },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'role')} href="#">
    //       {t('users.column.role')} {renderOrderByArrow('role')}
    //     </a>
    //   ),
    //   dataIndex: 'role',
    //   key: 'role'
    // },
    {
      title: "View Answer Count",
      key: "count",
      render: (text, record) => (
        <Button color="primary" size="sm" href={`/quiz/count/${record.id}`}>
          View Answer Count
        </Button>
      ),
    },
    {
      title: "View Userwise Result",
      key: "userWiseResult",
      render: (text, record) => (
        <Button color="primary" size="sm" href={`/quiz/report/${record.id}`}>
          View Report
        </Button>
      ),
    },
    {
      title: "View Attendees",
      key: "attendees",
      render: (text, record) => (
        <Button color="primary" size="sm" href={`/quiz/attendees/${record.id}`}>
          View Attendees
        </Button>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <>
          <Tooltip title="Edit">
            <Button
              href={`quiz/edit/${record.id}`}
              shape="circle"
              icon="edit"
              type="secondary"
              size="medium"
              style={{ marginBottom: "10px", marginRight: "3px" }}
            />
          </Tooltip>
          <Tooltip title="Duplicate Quiz">
            <Popconfirm
              title="Duplicate Quiz?"
              onConfirm={() =>
                duplicateQuiz({
                  quizId: record.id,
                  userId: currentUser && currentUser.id,
                })
              }
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button type="primary" icon="copy" shape="circle" size="md" />
            </Popconfirm>
          </Tooltip>

          <Popconfirm
            title="Delete Quiz?"
            onConfirm={() => deleteQuiz(record.id)}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon="delete" shape="circle" size="md" />
          </Popconfirm>
        </>
      ),
    },
  ];

  const RenderQuizComponent = () => {
    return (
      <Fragment>
        <Table dataSource={quizList.edges} columns={columns} />
      </Fragment>
    );
  };

  return (
    <>
      <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
        {loading && <RenderTableLoading rows={6} columns={5} />}
        {/* Render main quizzes content */}
        {quizList && !loading && (
          <CatalogueWithInfiniteScroll
            grid={{
              gutter: 24,
              xs: 1,
              sm: 2,
              md: 3,
              lg: 4,
              xl: 4,
              xxl: 4,
            }}
            TableComponent={RenderQuizComponent}
            endMessage={"End Of Quizzes"}
            loadData={loadDataQuizList}
            list={quizList}
            loading={loading}
            hasMore={quizList.pageInfo.hasNextPage}
            endCursor={quizList.pageInfo.endCursor}
            totalCount={quizList.totalCount}
          />
        )}
      </div>
    </>
  );
};

QuizzesView.propTypes = {
  loadingQuizzes: PropTypes.bool.isRequired,
  quizzes: PropTypes.array,
  // orderBy: PropTypes.object,
  // onOrderBy: PropTypes.func.isRequired,
  // deleteUser: PropTypes.func.isRequired,
  t: PropTypes.func,
};

export default translate("quiz")(QuizzesView);
