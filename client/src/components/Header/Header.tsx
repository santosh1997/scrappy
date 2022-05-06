import { Layout } from "antd";
import { HeaderTitle } from "./Header.style";

const Header = (): JSX.Element => {
  return (
    <Layout.Header className="header">
      <HeaderTitle>Scrappy</HeaderTitle>
    </Layout.Header>
  );
};

export default Header;
