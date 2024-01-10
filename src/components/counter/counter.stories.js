import React from 'react';
import { action } from '@storybook/addon-actions';
import Counter from './counter';

export default {
  title: 'Counter',
  component: Counter,
};

export const Default = () => (
  <Counter initialCount={0} />
);