import { useState } from 'react';
import { AddCountry } from '@/components/AddCountry';
import type { NextPage } from 'next';
import { CountryList } from '../components/CountryList';
import Header from '../components/Header';
import { useGetCountriesQuery } from '@/graphql/generated/schema';

const Home: NextPage = () => {
  const [isFormVisible, setFormVisible] = useState(false);
  const toggleFormVisibility = () => setFormVisible(!isFormVisible);

  const { refetch } = useGetCountriesQuery();

  const handleRefetch = async () => {
    await refetch();
  };

  return (
    <div>
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8 flex flex-row justify-between items-start">
          <button
            onClick={toggleFormVisibility}
            className="fixed left-0 top-1/2 transform -translate-y-1/2 z-50 text-3xl bg-blue-500 text-white p-2 rounded-r-lg cursor-pointer hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
            title="Add a country"
          >
            &#10095; <span className="sr-only">Add Country</span>
          </button>
          <AddCountry isVisible={isFormVisible} toggleVisibility={toggleFormVisibility} refetchCountries={handleRefetch} />
          <div className="ml-80">
            <CountryList />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
