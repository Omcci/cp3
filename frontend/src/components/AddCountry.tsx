import { AddCountryMutation } from '@/graphql/generated/schema';
import { gql, useMutation } from '@apollo/client';
import { useState } from 'react';

const ADD_COUNTRY = gql`
mutation AddCountry($data: NewCountryInput!) {
    addCountry(data: $data) {
      code
      name
      emoji
      continent {
        name
      }
    }
  }
`;

export const AddCountry = ({ isVisible, toggleVisibility }: any) => {
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('');
  const [addCountry, { data, loading, error }] = useMutation<AddCountryMutation>(ADD_COUNTRY, {
    refetchQueries: ['GetCountries']
  });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await addCountry({
      variables: { data: { code, name, emoji } }
    });
  };

  if (error as Error) return <p>Error: {error?.message}</p>;

  return (
    <div className={`fixed left-0 top-0 mt-20 bg-white p-5 shadow-lg h-full z-50 transform transition-transform ${isVisible ? 'translate-x-10' : '-translate-x-full'}`}>
      <button onClick={toggleVisibility} className="absolute top-5 right-5 text-3xl cursor-pointer">&#10094;</button>
      {error && <p className="text-red-500">Error: {error.message}</p>}
      {data && <p className="text-green-500">Country added!</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold leading-tight text-gray-900 mb-4 mr-6">Add New Country</h2>
          <label htmlFor="code" className="block text-sm font-medium text-gray-700">Country Code</label>
          <input
            id="code"
            type="text"
            value={code}
            onChange={e => setCode(e.target.value)}
            placeholder="Exemple: USA"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Country Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Exemple: United States"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <div>
          <label htmlFor="emoji" className="block text-sm font-medium text-gray-700">Emoji</label>
          <input
            id="emoji"
            type="text"
            value={emoji}
            onChange={e => setEmoji(e.target.value)}
            placeholder="Exemple: 🇺🇸"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out"
        >
          {loading ? 'Adding...' : 'Add Country'}
        </button>
      </form>
    </div>
  );
};
