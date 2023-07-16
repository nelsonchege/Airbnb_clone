import { Reservation } from "@prisma/client";
import React from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../listings/ListingCard";

type Props = {
  favoriteListings: listing[];
  currentUser: SafeUser;
};

const FavoriteListingClient = ({ favoriteListings, currentUser }: Props) => {
  return (
    <Container>
      <Heading
        title="Favorite Listing"
        subtitle="Here are your Favorite listing"
        center={false}
      />
      <div className="mt-10 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {favoriteListings.map((favorite: any) => (
          <ListingCard
            key={favorite.id}
            data={favorite}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default FavoriteListingClient;
