import { gql, useQuery } from "@apollo/client";
import Link from "next/link";
import React from 'react';

export const CountryList = () => {

    const GET_COUNTRIES = gql`
    query GetCountries {
        countries {
          id
          name
          emoji
        }
      }
    `;

    const { loading, error, data } = useQuery(GET_COUNTRIES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.countries.map(({ code, name, emoji }: { code: string; name: string; emoji: string }) => (
                <div key={code} className="mb-4">
                    <Link href={`/countries/${code}`}>
                        <a className="text-lg">
                            {emoji} {name}
                        </a>
                    </Link>
                </div>
            ))}
        </div>
    );
};