"use client";

import React, { useCallback, useState } from "react";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import ListingCard from "../listings/ListingCard";

type ReservationsClientProps = {
  reservations: any;
  currentUser: SafeUser;
};

const ReservationsClient = ({
  reservations,
  currentUser,
}: ReservationsClientProps) => {
  const router = useRouter();
  const [deleteId, setDeletingId] = useState("");

  const onCancel = useCallback(
    (id: string) => {
      setDeletingId(id);
      axios
        .delete(`/api/reservations/${id}`)
        .then(() => {
          toast.success("reservstion canceled");
          router.refresh();
        })
        .catch((error) => toast.error("something went wrong"))
        .finally(() => setDeletingId(""));
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Reservations"
        subtitle="Bookings on your properties"
        center={false}
      />
      <div className="mt-10 grid grid-col-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {reservations.map((reservation: any) => (
          <ListingCard
            key={reservation.id}
            data={reservation.listing}
            reservation={reservation}
            actionId={reservation.id}
            onAction={onCancel}
            disabled={deleteId == reservation.id}
            actionLabel="Cancel guest reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
};

export default ReservationsClient;
