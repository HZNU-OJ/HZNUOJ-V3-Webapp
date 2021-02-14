import style from './Footer.less';
import packages from '@/../package.json';
import GithubIcon from '@/icons/Github';

export default () => {
  return (
    <footer className={style.footer}>
      <div className={style.name}>Hangzhou Normal U Online Judge V3</div>
      <div className={style.version}>WebApp: {packages.version}</div>
      <div className={style.icon}>
        <a
          className={style.github}
          title="GitHub"
          target="_blank"
          rel="noreferrer noopener"
          href="https://github.com/hznu-oj"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
};
