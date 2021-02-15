import style from './Rating.less';
import { Tooltip } from 'antd';

function getRankClassName(rank: string): string {
  switch (rank) {
    case 'newbie':
      return 'user-gray';
    case 'pupil':
      return 'user-green';
    case 'specialist':
      return 'user-cyan';
    case 'expert':
      return 'user-blue';
    case 'candidate master':
      return 'user-violet';
    case 'master':
      return 'user-orange';
    case 'international master':
      return 'user-orange';
    case 'grandmaster':
      return 'user-red';
    case 'international grandmaster':
      return 'user-red';
    case 'legendary grandmaster':
      return 'user-legendary';
  }
  return '';
}

export function getRatingName(rating: number) {
  if (rating >= 3000) {
    return 'Legendary Grandmaster';
  } else if (rating >= 2600) {
    return 'International Grandmaster';
  } else if (rating >= 2400) {
    return 'Grandmaster';
  } else if (rating >= 2300) {
    return 'International Master';
  } else if (rating >= 2100) {
    return 'Master';
  } else if (rating >= 1900) {
    return 'Candidate Master';
  } else if (rating >= 1600) {
    return 'Expert';
  } else if (rating >= 1400) {
    return 'Specialist';
  } else if (rating >= 1200) {
    return 'Pupil';
  } else {
    return 'Newbie';
  }
}

export function getHandleLink(handle: string, rank: string) {
  return (
    <a
      className={[
        style['rated-user'],
        style[getRankClassName(rank.toLowerCase())],
      ].join(' ')}
      href={`/u/${handle}`}
    >
      {handle}
    </a>
  );
}

export function getRatingSpan(rating: number) {
  return (
    <span
      style={{ fontWeight: 'bold' }}
      className={style[getRankClassName(getRatingName(rating).toLowerCase())]}
    >
      <Tooltip placement="top" title={getRatingName(rating)}>
        <span>{rating}</span>
      </Tooltip>
    </span>
  );
}
