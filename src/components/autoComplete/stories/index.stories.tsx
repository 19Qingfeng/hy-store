import { AutoComplete, AutoCompleteOptionsType } from "..";
import { ComponentMeta, ComponentStory } from "@storybook/react";

export default {
  title: "Components/AutoComplete",
  component: AutoComplete,
  argTypes: {},
} as ComponentMeta<typeof AutoComplete>;

const listData = [
  {
    value: "wang",
    label: "选项1",
  },
  {
    value: "wang3",
    label: "选项2",
  },
  {
    value: "wang2",
    label: "选项3",
  },
];

const Template: ComponentStory<typeof AutoComplete> = (args) => {
  const renderOptions = (value: AutoCompleteOptionsType) => {
    return value.label;
  };
  const onSelect = (value: string) => {
    alert("选中" + value);
  };
  const fetchSuggestion = (value: string) => {
    return listData.filter((i) => {
      return i.value.indexOf(value) !== -1;
    });
  };
  return (
    <AutoComplete
      onSelect={onSelect}
      renderOptions={renderOptions}
      fetchSuggestion={fetchSuggestion}
    ></AutoComplete>
  );
};

export const Primary = Template.bind({});

Primary.args = {};

Primary.storyName = "基础用法";
