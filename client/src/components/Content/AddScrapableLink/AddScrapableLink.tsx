import { Select, Input, Button, Row, Col, message } from "antd";
import { useState } from "react";
import ServiceConsumer from "../../../crosscutting/serviceconsumer/serviceConsumer";
import {
  AuthType,
  ContentType,
  RequestType,
} from "../../../crosscutting/serviceconsumer/serviceConsumer.type";
import stringValidator from "../../../crosscutting/validator/stringvalidator";

const ProtocolDropdown = ({
  onChange,
  defaultValue,
}: {
  onChange: (value: string) => void;
  defaultValue?: string;
}): JSX.Element => {
  const { Option } = Select;
  return (
    <Select
      defaultValue={defaultValue}
      className="select-before"
      onChange={(value) => onChange(value)}
    >
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
};

const AddScrapableLink = (): JSX.Element => {
  const [protocol, setProtocol] = useState("http://");
  const [URL, setURL] = useState("");
  const onSubmit = async () => {
    const compositeURL = `${protocol}${URL}`;
    if (!stringValidator.isValidLink(compositeURL))
      message.error("Enter valid URL");
    else {
      await ServiceConsumer.callService({
        type: RequestType.POST,
        relativeURL: "/scrap/add",
        authType: AuthType.PRIVATE,
        content: ContentType.JSON,
        data: {
          links: [compositeURL],
        },
      });
      message.success("Link add successfully");
    }
  };
  return (
    <Row>
      <Col span={6}></Col>
      <Col span={8}>
        <Input
          addonBefore={
            <ProtocolDropdown defaultValue={protocol} onChange={setProtocol} />
          }
          placeholder="xyz.com/{{relative-url}}"
          defaultValue={URL}
          onChange={(e) => setURL(e.target.value)}
        />
      </Col>
      <Col span={4}>
        <Button onClick={onSubmit}>Scrap</Button>
      </Col>
      <Col span={6}></Col>
    </Row>
  );
};

export default AddScrapableLink;
