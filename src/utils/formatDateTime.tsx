import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
dayjs.locale('zh-cn');

export function formatUnixTimeStamp(
  unixTimeStamp: string | number,
  format: string,
): string {
  if (typeof unixTimeStamp === 'string') {
    unixTimeStamp = parseInt(unixTimeStamp);
  }
  return dayjs.unix(unixTimeStamp).format(format);
}
