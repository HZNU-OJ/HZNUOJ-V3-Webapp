import React from 'react';
import Header from '@/components/Header';

class BasicLayout extends React.Component {
  componentDidMount() {}

  constructor(props: any) {
    super(props);
  }

  state = {};

  render() {
    return (
      <>
        <Header></Header>
        <div style={{}}>
          <div
            style={{
              maxWidth: '1100px',
              width: '100%',
              marginLeft: 'auto',
              marginRight: 'auto',
              border: '5px solid red',
            }}
          >
            <>{this.props.children}</>
          </div>
        </div>
      </>
    );
  }
}

export default BasicLayout;
