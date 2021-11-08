import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Guide } from '../index';

export default {
  title: 'Components/Guide',
  component: Guide,
  argTypes: {},
} as ComponentMeta<typeof Guide>;

const Template: ComponentStory<typeof Guide> = (args) => <Guide {...args} />;

export const Primary = Template.bind({});

Primary.args = {};

Primary.storyName = '基础用法';
