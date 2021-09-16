import { AutoComplete, AutoCompleteOptionsType } from "..";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import "./index.scss";

export default {
  title: "Components/AutoComplete",
  component: AutoComplete,
  argTypes: {},
} as ComponentMeta<typeof AutoComplete>;

const Template: ComponentStory<typeof AutoComplete> = (args) => {
  const renderOptions = (value: AutoCompleteOptionsType) => {
    return (
      <div>
        <div style={{ color: "#666" }}>仓库名称:{value.name}</div>
        <div
          className="autocomplete-el"
          style={{ fontSize: "12px", color: "#38387b", whiteSpace: "nowrap" }}
        >
          仓库地址:{value.value}
        </div>
      </div>
    );
  };
  const onSelect = (value: string) => {
    console.log(value, "选中value");
  };
  const fetchSuggestion = (value: string) => {
    return new Promise<AutoCompleteOptionsType[]>((resolve) => {
      setTimeout(() => {
        // 搜索github的对应仓库
        fetch(`https://api.github.com/search/repositories?q=${value}`)
          .then((res) => res.json())
          .then((res) => {
            const data = res.items.map((i: any) => ({
              value: i.html_url,
              name: i.name,
            }));
            resolve(data);
          });
      }, 2000);
    });
  };
  return (
    <div
      className="autocomplete-wrapper"
      style={{ display: "flex", alignItems: "center" }}
    >
      远程搜索Github仓库:
      <AutoComplete
        onSelect={onSelect}
        renderOptions={renderOptions}
        fetchSuggestion={fetchSuggestion}
      ></AutoComplete>
    </div>
  );
};

export const Primary = Template.bind({});

Primary.args = {};

Primary.storyName = "基础用法";
