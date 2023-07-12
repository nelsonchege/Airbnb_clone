"use client";

import Avatar from "@/app/components/navbar/Avatar";
import useCountries from "@/app/hooks/useCountries";
import { User } from "@prisma/client";
import dynamic from "next/dynamic";
import React from "react";
import { IconType } from "react-icons";
import ListingCategory from "./ListingCategory";

const Map = dynamic(() => import("../../components/Map"), {
  ssr: false,
});

type ListlingInfoProps = {
  user: User;
  category:
    | {
        icon: IconType;
        label: string;
        description: string;
      }
    | undefined;
  description: string;
  roomCount: number;
  guestCount: number;
  bathroomCount: number;
  locationValue: string;
};

const ListlingInfo = ({
  user,
  category,
  description,
  roomCount,
  guestCount,
  bathroomCount,
  locationValue,
}: ListlingInfoProps) => {
  const { getByValue } = useCountries();
  const coodinates = getByValue(locationValue)?.latlng;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div
          className="
        text-xl 
        font-semibold 
        flex 
        flex-row 
        items-center
        gap-2
      "
        >
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div
          className="
        flex 
        flex-row 
        items-center 
        gap-4 
        font-light
        text-neutral-500
      "
        >
          <div>{guestCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && (
        <ListingCategory
          icon={category.icon}
          label={category?.label}
          description={category?.description}
        />
      )}
      <hr />
      <div
        className="
  text-lg font-light text-neutral-500"
      >
        {description}
      </div>
      <hr />
      <Map center={coodinates} />
    </div>
  );
};

export default ListlingInfo;
