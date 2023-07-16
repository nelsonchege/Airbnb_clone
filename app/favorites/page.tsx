import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../clientOnly";
import EmptyState from "../components/EmptyState";
import getFavoriteListings from "../actions/getFavoriteListings";
import FavoriteListingClient from "./FavoriteListingClient";

const FavoritePage = async () => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unouthorized" subTitle="Please Login" />
      </ClientOnly>
    );
  }
  const favoriteListings = await getFavoriteListings();

  if (favoriteListings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorite Listings"
          subTitle="Looks like you dont have any favorite Listings"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoriteListingClient
        favoriteListings={favoriteListings}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default FavoritePage;
