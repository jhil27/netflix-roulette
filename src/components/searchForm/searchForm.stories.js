import React from 'react';
import  { Meta, StoryObj } from '@storybook/react';
import SearchForm from './searchForm';
import { INITAL_SEARCH_TERM } from '../../constants';
export default {
  title: 'Search Form',
  component: SearchForm,
};
const handleSearch = (searchTerm) => {
    console.log("Searched with: " + searchTerm);
  }
export const Default = () => (
  <SearchForm initialSearchTerm={INITAL_SEARCH_TERM} onChange={handleSearch} />
);