import style from './IndexPage.less';
import BasicLayout from '@/layouts/Basic';
import React from 'react';

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
          <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
            <div className="am-panel-hd" style={{ padding: 5 }}>
              Annnouncement
            </div>
            <div className="am-panel-bd">dd</div>
          </div>

          <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
            <div className="am-panel-hd" style={{ padding: 5 }}>
              Statics
            </div>
            <div className="am-panel-bd">dd</div>
          </div>

          <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
            <div className="am-panel-hd" style={{ padding: 5 }}>
              Top Users
            </div>
            <div className="am-panel-bd">dd</div>
          </div>

          <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
            <div className="am-panel-hd" style={{ padding: 5 }}>
              Pay Attention
            </div>
            <div className="am-panel-bd">dd</div>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

export default IndexPage;
