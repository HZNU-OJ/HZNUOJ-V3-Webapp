import style from './IndexPage.less';
import BasicLayout from '@/layouts/Basic';
import React from 'react';
import { Row, Col } from 'antd';
import {
  getHandleLink,
  getRatingSpan,
  getRatingName,
} from '@/components/Rating';

function getTopUsersData() {
  const ratings = [3749, 2600, 2400, 2300, 2100, 1900, 1600, 1400, 1200, 800];
  let html = [];
  ratings.forEach((rating: number, index: number) => {
    const name = rating >= 2400 ? 'Hsueh-' : 'Dup4';
    html.push(
      <tr key={['top', 'users', index].join('-')}>
        <td style={{ textAlign: 'left' }}>{index + 1}</td>
        <td style={{ textAlign: 'center' }}>
          {getHandleLink(name, getRatingName(rating))}
        </td>
        <td style={{ textAlign: 'right' }}>{getRatingSpan(rating)}</td>
      </tr>,
    );
  });
  return html;
}
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
          <Row gutter={8} align="top">
            <Col xs={24} sm={24} md={24} lg={17} xl={17}>
              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div className="am-panel-hd" style={{ padding: '2px 5px' }}>
                  Announcement
                </div>
                <div className="am-panel-bd">dd</div>
              </div>
            </Col>

            <Col xs={24} sm={24} md={24} lg={7} xl={7}>
              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div className="am-panel-hd" style={{ padding: '2px 5px' }}>
                  Pay Attention
                </div>
                <div className="am-panel-bd">dd</div>
              </div>

              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div className="am-panel-hd" style={{ padding: '2px 5px' }}>
                  Top Users
                </div>
                <div className="am-panel-bd">
                  <table className="am-table am-table-striped am-table-centered">
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', width: '10%' }}>#</th>
                        <th style={{ textAlign: 'center', width: '70%' }}>
                          User
                        </th>
                        <th style={{ textAlign: 'right', width: '20%' }}>
                          Rating
                        </th>
                      </tr>
                    </thead>
                    <tbody>{getTopUsersData()}</tbody>
                  </table>
                </div>
              </div>

              <div
                className="am-panel am-panel-primary"
                style={{ fontSize: 15 }}
              >
                <div className="am-panel-hd" style={{ padding: '2px 5px' }}>
                  Statics
                </div>
                <div className="am-panel-bd">dd</div>
              </div>
            </Col>
          </Row>
        </div>
      </BasicLayout>
    );
  }
}

export default IndexPage;
