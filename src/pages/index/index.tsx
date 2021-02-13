import styles from './index.less';
import BasicLayout from '@/layouts/Basic';
import React from 'react';

class Index extends React.Component {
  componentWillMount() {}

  componentWillReceiveProps(nextProps: any) {}

  state = {};

  constructor(props: any) {
    super(props);
  }

  render() {
    return <BasicLayout>test</BasicLayout>;
  }
}

export default Index;
