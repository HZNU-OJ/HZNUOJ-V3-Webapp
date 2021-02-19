import { Badge } from 'antd';
import { ContestStatusColor } from '@/interface/Contest';

export const StatusBadge = (status: string) => {
  return (
    <div>
      <Badge color={ContestStatusColor[status]} />
      <b style={{ marginLeft: -5, color: ContestStatusColor[status] }}>
        {status}
      </b>
    </div>
  );
};
