import React from 'react';
import './Header.less';
export interface topBarItem {
  id: string;
  name: string;
  link: string;
}

function topBarItemRender(current: string, itemList: topBarItem[]): string {
  let html = '';
  itemList.forEach((item: topBarItem) => {
    html += `<li class="${current === item.id ? 'am-active' : ''}"><a href="${
      item.link
    }">${item.name}</a></li>`;
  });
  return html;
}

function topBar(brand: string, current: string) {
  const leftItemList = [
    { id: 'problemSet', name: 'Problem Set', link: '/p' },
    { id: 'contests', name: 'Contests', link: '/c' },
    { id: 'submissions', name: 'Submissions', link: '/s' },
    { id: 'users', name: 'Users', link: '/u' },
    { id: 'discussion', name: 'Discussion', link: '/d' },
  ];
  const rightItemList = [{ id: 'enter', name: 'Enter', link: '/login' }];
  return {
    __html: `
    <header class="am-topbar-inverse am-topbar-fixed-top" style="font-size: 16px;">
    <button class="am-topbar-btn am-topbar-toggle am-btn am-btn-sm am-btn-primary am-show-sm-only"
      data-am-collapse="{target: '#collapse-head'}">
      <span class="am-sr-only">导航切换</span>
      <span class="am-icon-bars"></span>
    </button>
    <div class="am-container h-header">
      <h1 class="am-topbar-brand">
        <a href="/" >${brand}</a>
      </h1>
      <div class="am-collapse am-topbar-collapse" id="collapse-head">
        <ul class="am-nav am-nav-pills am-topbar-nav">
          ${topBarItemRender(current, leftItemList)}
        </ul>
        <div class="am-topbar-right" style="padding-right: 0px;">
          <ul class="am-nav am-nav-pills am-topbar-nav">
          ${topBarItemRender(current, rightItemList)}
          </ul>
        </div>
      </div>
    </div>
  </header>
    `,
  };
}
class Header extends React.Component {
  UNSAFE_componentWillMount() {
    this.setState({
      current: this.props.current,
    });
  }

  UNSAFE_componentWillReceiveProps(nextProps: any) {
    this.setState({
      current: nextProps.current,
    });
  }

  state = {
    current: '',
  };

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div
        dangerouslySetInnerHTML={topBar(
          'HZNU Online Judge',
          this.state.current,
        )}
      ></div>
    );
  }
}

export default Header;
