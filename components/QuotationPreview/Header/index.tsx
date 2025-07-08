import { HeaderProps } from './types';
import dayjs from 'dayjs';

export default function Header({ freelancer, companyEmail, id, date, validUntil }: HeaderProps) {
  return (
    <div className="mb-2 flex flex-wrap items-center justify-between">
      <div className="pb-2">
        <h1 className="mb-2 text-3xl font-bold text-blue-600">報價單</h1>
        <div className="xs:border-b space-y-1 text-gray-600">
          <p>接案人: {freelancer || '未填寫'}</p>
          <p>Email: {companyEmail || '未填寫'}</p>
        </div>
      </div>
      <div className="xs:w-full text-left md:text-right">
        <div className="space-y-1 pr-1 text-xs text-gray-600">
          <p>No: {id}</p>
          <p>日期: {dayjs(date).format('YYYY/MM/DD')}</p>
          <p>有效期: {dayjs(validUntil).format('YYYY/MM/DD')}</p>
        </div>
      </div>
    </div>
  );
}
