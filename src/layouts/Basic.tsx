import Header from '@/components/Header';
import Footer from '@/components/Footer';
import style from './Basic.less';

export default (props: any) => {
  return (
    <>
      <Header />
      <div className={style.root}>
        <div className={style.secondRoot}>
          <div className={style.main}>{props.children}</div>
          <Footer />
        </div>
      </div>
    </>
  );
};
