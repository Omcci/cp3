import { GetCountriesQuery } from "@/graphql/generated/schema";
import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from 'react';

export const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
          id
          name
          emoji
          code
        }
      }
    `;

export const CountryList = () => {
    const { loading, error, data, refetch } = useQuery<GetCountriesQuery>(GET_COUNTRIES);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md p-4 mt-3 sm:ml-20 ml-10">
            <h2 className="text-2xl font-bold leading-tight text-gray-900 mb-4">List of Countries</h2>
            <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {data && data.countries.map((country) => (
                    <li key={country.id} className="hover:bg-gray-50 transition duration-300 ease-in-out rounded-md">
                        <Link href={`/countries/${country.code}`}>
                            <div className="flex items-center space-x-4 p-4">
                                <span className="text-2xl">{country.emoji}</span>
                                <span className="font-medium text-gray-900">{country.name}</span>
                            </div>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};