import React from 'react';
import './Header.less';

function topBar(brand: string, current: string) {
  return {
    __html: `
    <header class="am-topbar-inverse am-topbar-fixed-top" style="font-size: 16px;">
    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-primary am-show-sm-only"
      data-am-collapse="{target: '#collapse-head'}">
      <span class="am-sr-only">导航切换</span>
      <span class="am-icon-bars"></span>
    </button>
    <div class="am-container h-header">
      <h1 class="am-topbar-brand" >
        <a href="/" >${brand}</a>
      </h1>
      <div class="am-collapse am-topbar-collapse" id="collapse-head">
        <ul class="am-nav am-nav-pills am-topbar-nav">
          <li class="am-active"><a href="">Problem Set</a></li>
          <li><a href="">Contests</a></li>
          <li><a href="">Submissions</a></li>
          <li><a href="">Members</a></li>
          <li><a href="">F.A.Q.</a></li>
        </ul>
        <div class="am-topbar-right" style="padding-right: 0px;">
          <ul class="am-nav am-nav-pills am-topbar-nav">
            <li class=""><a href="/login">Enter</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>    
    `,
  };
}

class Header extends React.Component {
  componentWillMount() {}

  componentWillReceiveProps(nextProps: any) {}

  state = {};

  constructor(props: any) {
    super(props);
  }

  render() {
    return <div dangerouslySetInnerHTML={topBar('HZNU Online Judge')}></div>;
  }
}

export default Header;
