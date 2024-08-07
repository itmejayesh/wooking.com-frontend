'use client'
import Link from "next/link";
import React from "react";
import { useQuery } from "react-query";
import * as apiClient from "@/api-client"

const MyProperties = () => {
    const {data:propertyData} = useQuery("fetchMyProperties", apiClient.fetchMyProperties,{
        onError:()=>{}
    })

  return (
    <section className="container mx-auto py-5">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold text-gray-800">My Properties</h1>
        <Link
          href={`/property-listing`}
          className="flex bg-blue-600 p-2 text-xl font-bold
        text-white"
        >
          Add Property
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-8">
        {
            propertyData?.map((property)=>(
                <div className="flex flex-col justify-between border border-slate-300 rounded-lg">
                    <h2>{property.name}</h2>
                </div>
            ))
        }
      </div>
    </section>
  );
};

export default MyProperties;
