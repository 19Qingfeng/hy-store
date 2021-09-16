import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Row } from "../row";
import { Col } from "../column";

export default {
  title: "Components/Grid",
  component: Row,
  argTypes: {},
  subcomponents: {
    Col,
  },
} as ComponentMeta<typeof Row>;

const Template: ComponentStory<typeof Row> = (args) => (
  <Row {...args} gap={args.gap} style={{ color: "#fff" }}>
    <Col span={8}>
      <div
        style={{
          background: "#11104a",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        第一列
      </div>
    </Col>
    <Col span={8}>
      <div
        style={{
          background: "#8686a2",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        第二列
      </div>
    </Col>
    <Col span={8}>
      <div
        style={{
          background: "#a28694",
          borderRadius: "10px",
          textAlign: "center",
        }}
      >
        第三列
      </div>
    </Col>
  </Row>
);

export const Primary = Template.bind({});

Primary.args = {
  gap: 20,
};

Primary.storyName = "基础用法";
