"use client";

import Container from "@/app/components/Container";
import { categories } from "@/app/data";
import { User } from "@prisma/client";
import React, { useMemo } from "react";
import ListingHead from "./ListingHead";
import ListlingInfo from "./ListlingInfo";

type ListingClientProps = {
  listing: listing & {
    user: User;
  };
  currentUser?: SafeUser | null;
};

const ListingClient = ({ listing, currentUser }: ListingClientProps) => {
  const category = useMemo(() => {
    return categories.find((item) => item.label === listing.category);
  }, [listing.category]);
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListlingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
