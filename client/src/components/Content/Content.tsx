import { PaginationProps, Select, Table } from "antd";
import { useEffect, useState } from "react";
import ServiceConsumer from "../../crosscutting/serviceconsumer/serviceConsumer";
import {
  AuthType,
  RequestType,
} from "../../crosscutting/serviceconsumer/serviceConsumer.type";
import AddScrapableLink from "./AddScrapableLink/AddScrapableLink";
import {
  ColumnConfig,
  GridProps,
  RecordType,
  ScrappedAssetsResponseDTO,
  SPYFileType,
} from "./Content.type";

const columns: ColumnConfig[] = [
  {
    title: "Scraped Links",
    dataIndex: "assetLink",
    render: (value: string, record: RecordType) => (
      <a href={record.assetLink} target="_blank" rel="noopener noreferrer">
        {record.assetLink}
      </a>
    ),
  },
];

const Content = (): JSX.Element => {
  const { Option } = Select;
  const [data, setData] = useState<{
    isLoading: boolean;
    gridProps: GridProps;
    retrievedData: ScrappedAssetsResponseDTO;
    typeFilter: string;
  }>({
    isLoading: false,
    retrievedData: {
      records: [],
      count: 0,
    },
    gridProps: {
      pageSize: 10,
      current: 1,
    },
    typeFilter: SPYFileType.Any.toString(),
  });

  const onFilterChange = (value: string) => {
    refreshData(value, data.gridProps);
  };

  const onGridPropsChange = ({ pageSize, current }: PaginationProps) => {
    refreshData(data.typeFilter, {
      pageSize: pageSize || 10,
      current: current || 1,
    });
  };

  const refreshData = async (typeFilter: string, gridProps: GridProps) => {
    setData({
      isLoading: true,
      typeFilter,
      gridProps,
      retrievedData: { records: [], count: 0 },
    });
    const retrievedData =
      (await ServiceConsumer.callService<ScrappedAssetsResponseDTO>({
        type: RequestType.GET,
        relativeURL: `/scraped?type=${typeFilter}&page=${gridProps.current}&pageSize=${gridProps.pageSize}`,
        authType: AuthType.PRIVATE,
      })) || { records: [], count: 0 };
    setData({
      isLoading: false,
      typeFilter,
      gridProps,
      retrievedData,
    });
  };

  const getRowKey = (() => {
    let key = -1;
    return () => {
      key += 1;
      return key;
    };
  })();

  useEffect(() => {
    refreshData(SPYFileType.Any.toString(), {
      pageSize: 10,
      current: 1,
    });
  }, []);

  return (
    <>
      <AddScrapableLink />
      <Select defaultValue={data.typeFilter} onChange={onFilterChange}>
        <Option value={SPYFileType.Any.toString()}>Show all files</Option>
        <Option value={SPYFileType.Image.toString()}>Show Image files</Option>
        <Option value={SPYFileType.Video.toString()}>Show Video files</Option>
      </Select>
      <Table<RecordType>
        loading={data.isLoading}
        columns={columns}
        dataSource={data.retrievedData.records}
        bordered
        onChange={onGridPropsChange}
        pagination={{
          defaultPageSize: data.gridProps.pageSize,
          total: data.retrievedData.count,
          defaultCurrent: data.gridProps.current,
        }}
        rowKey={(record) => getRowKey()}
      />
    </>
  );
};

export default Content;
