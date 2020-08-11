import React from "react";
import { Row, Col, Card, Select, Typography, Divider } from "antd";
import GroupWiseReport from "../containers/GroupWiseReport";

const SelectOption = Select.Option;
const { Text, Title } = Typography;

class GroupQuizReportComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { quizId: null, userId: null };
  }

  handleSelectQuiz = (e) => {
    console.log(e);
    this.setState({ quizId: e });
  };

  handleSelectUser = (e) => {
    console.log(e);
    this.setState({ userId: e });
  };

  render() {
    const { quizzes, groupId, group } = this.props;
    console.log("groupquizreportcomponent", this.props);

    let joinees = [];

    group && group.members && group.members.map((item) => {
    if (item.member){ joinees.push(item);}
  });
    return (
      <div style={{ width: "100%" }}>
        <Row gutter={24}>
          <Col md={12} xs={24}>
            <Title level={4}>Select Quiz:</Title>
            {quizzes.length === 0 ? (
              "No Quizzes To Show"
            ) : (
              <Select
                value={this.state.quizId}
                style={{ width: "100%" }}
                onChange={this.handleSelectQuiz}
              >
                {quizzes.map((quiz, key) => (
                  <SelectOption value={quiz.id} key={key}>
                    {quiz.title}
                  </SelectOption>
                ))}
              </Select>
            )}
            
          </Col>
          {this.state.quizId && (
          <Col  md={12} xs={24}>
            <Title level={4}>Select User:</Title>
              <Select
              value={this.state.userId}
              style={{ width: "100%" }}
              onChange={this.handleSelectUser}
            >
              {joinees.map((j, key) => (
                <SelectOption value={j.member.id} key={key}>
                  {j.member.username}
                </SelectOption>
              ))}
            </Select>
          </Col>
            )}
        </Row>
        <Divider />
            {this.state.quizId && (
              <GroupWiseReport quizId={this.state.quizId} groupId={groupId} userFId={this.state.userId}  />
            )}
      </div>
    );
  }
}

export default GroupQuizReportComponent;