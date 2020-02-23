import XLSX from 'xlsx';
import { message } from 'antd';

const exportFile = (dataSource, colums, title = '报表') => {
  if (dataSource.length == 0) {
    message.error('请选择导出的数据!');
    return;
  }
  const header = colums.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.dataIndex]: currentValue.title,
    }),
    {},
  );
  let workbook = XLSX.utils.book_new();
  const ws1 = XLSX.utils.json_to_sheet([header, ...dataSource], {
    skipHeader: true,
  });
  XLSX.utils.book_append_sheet(workbook, ws1, 'Sheet1');
  XLSX.writeFile(workbook, `${title}.xlsx`);
};

export { exportFile };
