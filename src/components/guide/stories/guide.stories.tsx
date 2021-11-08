import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Guide } from '../index';

export default {
  title: 'Components/Guide',
  component: Guide,
  argTypes: {},
} as ComponentMeta<typeof Guide>;

const Template: ComponentStory<typeof Guide> = (args) => {
  return (
    <>
      <div
        style={{ width: '200px', height: '200px', background: 'blue' }}
        id="test"
      >
        第一个元素
      </div>
      <Guide {...args} />;
    </>
  );
};

export const Primary = Template.bind({});

Primary.args = {
  step: [{ id: 'test' }],
};

Primary.storyName = '基础用法';
