// pages/countries/[code].tsx
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';
import { GetCountryDetailsQuery, GetCountryDetailsQueryVariables } from '@/graphql/generated/schema';

const GET_COUNTRY_DETAILS = gql`
  query GetCountryDetails($code: String!) {
    country(code: $code) {
      id
      name
      code
      emoji
      continent {
        name
      }
    }
  }
`;

const CountryDetails = () => {
  const router = useRouter();
  const code = router.query

  const { loading, error, data } = useQuery<GetCountryDetailsQuery, GetCountryDetailsQueryVariables>(GET_COUNTRY_DETAILS, {
    variables: { code: code?.country ?? '' },
  });

  const goBack = () => {
    router.back();
  };

  if (loading) return <p>Loading...</p>;
  if (error as Error) return <p>Error: {error?.message}</p>;



  return (
    <div className="flex flex-col justify-center items-center">
      {loading && <p className="text-2xl">Loading...</p>}
      {error && <p className="text-2xl text-red-500">Error: {error.message}</p>}
      {data && (
        <div className="flex flex-col justify-center items-center gap-8 mt-16">
          <div className="flex items-center justify-center">
            <p className="text-8xl">{data.country.emoji}</p>
          </div>
          <div className="text-center">
            <h1 className="text-3xl font-bold">{data.country.name}</h1>
            <p className="text-lg text-gray-500">({data.country.code})</p>
          </div>
          {data.country.continent && (
            <div className="text-center">
              <p className="text-xl">Continent: {data.country.continent.name}</p>
            </div>
          )}
          <button onClick={goBack} className="mt-4 bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out">
            Go Back
          </button>
        </div>
      )}
    </div>
  );

};

export default CountryDetails;
