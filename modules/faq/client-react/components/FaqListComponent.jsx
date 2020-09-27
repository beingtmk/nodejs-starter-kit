/* eslint-disable react/display-name */
import React, { Fragment } from "react";
import PropTypes from "prop-types";
import {
  Popconfirm,
  Icon,
  message,
  Dropdown,
  Menu,
  Tooltip,
  Skeleton,
} from "antd";
import { Link } from "react-router-dom";
import { translate } from "@gqlapp/i18n-client-react";
import {
  Table,
  Button,
  Pagination,
  // CatalogueWithInfiniteScroll
  // UserCardAdmin
  // , ListingTitle
} from "@gqlapp/look-client-react";
import CatalogueWithInfiniteScroll from "@gqlapp/look-client-react/ui-antd/components/CatalogueWithInfiniteScroll";
import RenderTableLoading from "@gqlapp/look-client-react/ui-antd/components/RenderTableLoading";

import settings from "../../../../settings";
// import { ONSHELF, IDLE } from '../constants/ListingStates';
// import ListingDrawerComponent from './ListingDrawerComponent';

const { itemsNumber, type } = settings.pagination.web;

const NoFaqsMessage = ({ t }) => (
  <div className="text-center">{t("faqs.noListingsMsg")}</div>
);
NoFaqsMessage.propTypes = { t: PropTypes.func };

const FaqListComponent = (props) => {
  const {
    orderBy,
    onOrderBy,
    loading,
    faqs,
    t,
    loadData,
    deleteFaq,
    toggleFeatured,
    toggleListingStatus,
    history,
    doDuplicateList,
  } = props;
  const renderOrderByArrow = (name) => {
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === "desc") {
        return <span className="badge badge-primary">&#8595;</span>;
      } else {
        return <span className="badge badge-primary">&#8593;</span>;
      }
    } else {
      return <span className="badge badge-secondary">&#8645;</span>;
    }
  };
  const handleOrderBy = (e, name) => {
    e.preventDefault();
    let order = "asc";
    if (orderBy && orderBy.column === name) {
      if (orderBy.order === "asc") {
        order = "desc";
      } else if (orderBy.order === "desc") {
        return onOrderBy({
          column: "",
          order: "",
        });
      }
    }
    return onOrderBy({ column: name, order });
  };
  // const handleToggleUserFeature = async (event, record, isFeatured) => {
  //   event.persist();
  //   const result = await toggleFeatured(record.id, isFeatured);
  //   if (!result) {
  //     record.isFeatured = isFeatured;
  //     event.target.innerHTML = isFeatured ? 'Featured' : 'UnFeatured';
  //   }
  // };
  // const handleToggleListingStatus = async (event, record, isFeatured) => {
  //   event.persist();
  //   const result = await toggleListingStatus(record.id);
  //   // if (!result) {
  //   //   record.status = status;
  //   //   event.target.innerHTML = status === IDLE ? IDLE : ONSHELF;
  //   // }
  // };
  const columns = [
    {
      title: (
        <a onClick={(e) => handleOrderBy(e, "question")} href="#">
          Title {renderOrderByArrow("question")}
        </a>
      ),
      dataIndex: "question",
      key: "question",
      render: (text, record) => (
        <div>{record.node && record.node.question}</div>
      ),
    },
    {
      title: <>{"Is Featured"}</>,
      dataIndex: "isFeatured",
      key: "isFeatured",
      render: (text, record) => (
        <Button onClick={() => toggleFeatured(record.node && record.node.id)}>
          {record.node && record.node.isFeatured ? "Featured" : "UnFeatured"}
        </Button>
      ),
    },
    // {
    //   title: (
    //     <a onClick={e => handleOrderBy(e, 'remarks')} href="#">
    //       Remarks {renderOrderByArrow('remarks')}
    //     </a>
    //   ),
    //   dataIndex: 'remarks',
    //   key: 'remarks',
    //   render: text => <div>{text}</div>
    // },

    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (text, record) => (
        <div>
          <Link
            className="faqs-link"
            to={`/edit-faq/${record.node && record.node.id}`}
          >
            <Button shape="circle" size="sm">
              <Icon type="edit" />
            </Button>
          </Link>
          <br />
          {"   "}
          {/* <ListingDrawerComponent faqs={record} /> */}
          <Popconfirm
            title="Are you sure for deleting this faq?"
            onConfirm={() => deleteFaq(record.node && record.node.id)}
            okText="Yes"
          >
            <Button type="danger" shape="circle" size="sm">
              <Icon type="delete" />
            </Button>
          </Popconfirm>{" "}
          {/* <Tooltip placement="topLeft" title="Duplicate this faqs!">
            <Button onClick={() => doDuplicateList(record.user.id, record.id, history)} shape="circle" size="sm">
              <Icon type="copy" />
            </Button>
          </Tooltip> */}
        </div>
      ),
    },
  ];

  const RenderFaqComponent = () => {
    return (
      <Fragment>
        <Table dataSource={faqs.edges} columns={columns} />
      </Fragment>
    );
  };

  return (
    <div style={{ overflowX: "scroll", overflowY: "hidden" }}>
      {/* Render loader */}
      {loading && <RenderTableLoading rows={6} columns={3} />}
      {/* Render main faqs content */}
      {faqs && !loading && (
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
          // component={RenderFaqComponent}
          TableComponent={RenderFaqComponent}
          endMessage={"End Of Faqs"}
          loadData={props.loadDataFaqs}
          list={props.faqs}
          loading={props.loading}
          hasMore={props.faqs.pageInfo.hasNextPage}
          endCursor={props.faqs.pageInfo.endCursor}
          totalCount={props.faqs.totalCount}
        />
      )}
    </div>
  );
};

FaqListComponent.propTypes = {
  loading: PropTypes.bool.isRequired,
  faqs: PropTypes.object,
  orderBy: PropTypes.object,
  onOrderBy: PropTypes.func.isRequired,
  deleteFaq: PropTypes.func.isRequired,
  loadData: PropTypes.func,
  toggleFeatured: PropTypes.func,
  t: PropTypes.func,
  doDuplicateList: PropTypes.func,
  history: PropTypes.object,
};

export default translate("faqs")(FaqListComponent);
