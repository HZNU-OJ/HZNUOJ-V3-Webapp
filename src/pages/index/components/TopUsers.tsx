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

export default () => {
  return (
    <div className="am-panel am-panel-primary" style={{ fontSize: 15 }}>
      <div className="am-panel-hd" style={{ padding: '2px 5px', fontSize: 16 }}>
        Top Users
      </div>
      <table className="am-table am-table-striped">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', width: '10%' }}>#</th>
            <th style={{ textAlign: 'center', width: '70%' }}>User</th>
            <th style={{ textAlign: 'right', width: '20%' }}>Rating</th>
          </tr>
        </thead>
        <tbody>{getTopUsersData()}</tbody>
      </table>
    </div>
  );
};
