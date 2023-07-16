"use client";

import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import ListingCard from "../listings/ListingCard";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type PropertyClientProps = {
  listings: listing[];
  currentUser: SafeUser;
};

const PropertyClient = ({ listings, currentUser }: PropertyClientProps) => {
  const [deletingId, setDeletingId] = useState("");
  const router = useRouter();
  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);

      axios
        .delete(`/api/listings/${id}`)
        .then(() => {
          toast.success("Property removed");
          router.refresh();
        })
        .catch((error) => {
          toast.error(error?.response?.data?.error);
        })
        .finally(() => {
          setDeletingId("");
        });
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Properties"
        subtitle="Here are all of your location"
        center={false}
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing: any) => (
          <ListingCard
            key={listing.id}
            data={listing}
            actionId={listing.id}
            disabled={deletingId === listing.id}
            actionLabel="Remove Listing"
            onAction={onCancel}
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default PropertyClient;
