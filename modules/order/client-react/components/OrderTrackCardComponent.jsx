import React from 'react';
import { CheckCircleFilled, ClockCircleOutlined } from '@ant-design/icons';
import { Steps, Card } from 'antd';
import { ORDER_STATES } from '@gqlapp/order-common';

const { Step } = Steps;

export default class OrderTrackCardComponent extends React.Component {
  // dateCheck(val, date, date2) {
  //   if (val <= this.props.completed) {
  //     if (date2 == 0) return <strong className="rightfloat">{date}</strong>;
  //     else
  //       return (
  //         <strong className="rightfloat">
  //           {date} - {date2}
  //         </strong>
  //       );
  //   }
  // }
  getStep() {
    const status = this.props.orderStatus;

    // var step = 0;
    if (status === ORDER_STATES.STALE) {
      return 0;
    } else if (status === ORDER_STATES.COMPLETED) {
      return 6;
    }
  }
  IconCheck(val) {
    console.log(val, this.getStep());
    var state = this.getStep();
    if (state >= 0) {
      if (val <= this.getStep() && this.getStep() !== 0) return <CheckCircleFilled />;
      else return <ClockCircleOutlined style={{ color: '#FFCC99' }} />;
    } else if (state < 0) {
      state = state * -1;
      if (val <= this.getStep() && this.getStep() !== 0) return <CheckCircleFilled />;
      else return <ClockCircleOutlined style={{ color: '#FFCC99' }} />;
    }
  }
  render() {
    // const status = this.props.orderStatus;

    // const dates = this.props.status.date;
    const stepsText = [
      { id: 0, text: 'Payment Done.' },
      { id: 2, text: 'Event pass booked.' }
      // {
      //   id: 2,
      //   text: 'Quality check done and prduct picked up from'
      //   // date: dates.pickup
      // },
      // { id: 3, text: 'Product delivered' },
      // {
      //   id: 4,
      //   text: 'Rental period completed'
      //   // date: `${dates.start} - ${dates.end}`
      // },
      // {
      //   id: 5,
      //   text: 'Quality check done and peoduct picked'
      //   // date: dates.check
      // },
      // {
      //   id: 6,
      //   text: `Product being delivered to
      //   `
      //   // ${this.props.status.owner}
      //   // date: dates.return
      // }
    ];

    return (
      <Card className="boxShadowTheme borderRadius9">
        <h4>
          <strong>Status</strong>
        </h4>
        <br />

        <Steps
          direction="vertical"
          size="small"
          current={this.getStep() < 0 ? this.getStep() * -1 : this.getStep()}
          className="TrackSteps"
        >
          {stepsText.map((item, key) => (
            <Step
              title={
                <p className="font12">
                  {item.text}
                  <strong className="rightfloat"> {item.date}</strong>
                </p>
              }
              icon={this.IconCheck(key)}
            />
          ))}
        </Steps>
      </Card>
    );
  }
}
