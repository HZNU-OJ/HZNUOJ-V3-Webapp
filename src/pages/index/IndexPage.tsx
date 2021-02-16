import style from './IndexPage.less';
import BasicLayout from '@/layouts/Basic';
import React from 'react';
import { Row, Col } from 'antd';
import TopUsers from './components/TopUsers';
import Statics from './components/SubmissionStatics';
import Announcement from './components/Announcement';
import PayAttention from './components/PayAttention';
class IndexPage extends React.Component {
  UNSAFE_componentWillMount() {}

  UNSAFE_componentWillReceiveProps(nextProps: any) {}

  state = {};

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <BasicLayout current={''}>
        <div className={style.root}>
          <Row gutter={16} align="top">
            <Col xs={24} sm={24} md={24} lg={17} xl={17}>
              <Announcement />
              <Statics />
            </Col>

            <Col xs={24} sm={24} md={24} lg={7} xl={7}>
              <PayAttention />
              <TopUsers />
            </Col>
          </Row>
        </div>
      </BasicLayout>
    );
  }
}

export default IndexPage;
