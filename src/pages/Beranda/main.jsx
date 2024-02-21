// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect  } from 'react';
import CarouselComponent from '../../components/molecules/Carousel';
import SearchingComponent from './Components/search';
import BannerHome from './Components/molecules/BannerHome';
import FAQ from './Components/molecules/FAQ';
import RekomendasiBeranda from './Components/RekomendasiBeranda';
import axios from 'axios';

import SearchResults from './Components/SearchResults';


function Beranda() {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('selected');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:4000/events', {
        params: {
          name: searchKeyword,
          category: selectedCategory === 'selected' ? null : selectedCategory,
        },
      });

      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching events:', error);
    }
  };

  const handleKeywordChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Mengirim pencarian ketika searchKeyword atau selectedCategory berubah
  useEffect(() => {
    handleSearch();
  }, [searchKeyword, selectedCategory]);


  return (
    <div className='container'>
      <CarouselComponent />
      <SearchingComponent
        onSearch={handleSearch}
        onKeywordChange={handleKeywordChange}
        onCategoryChange={handleCategoryChange}
        searchKeyword={searchKeyword}
        selectedCategory={selectedCategory}
      />
      <SearchResults events={searchResults} />
      <RekomendasiBeranda />

      <BannerHome />
      <FAQ />
    </div>
  );
}

export default Beranda;
