import style from './Loading.less';
import React from 'react';

const Loading: React.FC<{}> = (props) => {
  return (
    <div className={[style.loader21, style.loader].join(' ')}>
      <div className={style['loader-21']}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
