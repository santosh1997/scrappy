enum SPYFileType {
  Any = -1,
  Image = 0,
  Video = 1,
}

export interface ScrappedAssetsResponseDTO {
  records: RecordType[];
  count: number;
}

export interface GridProps {
  pageSize: number;
  current: number;
}

export interface RecordType {
  assetLink: string;
  type: SPYFileType;
}

export interface ColumnConfig {
  title: string;
  dataIndex: string;
  render?: (value: string, record: RecordType) => JSX.Element;
}

export { SPYFileType };
