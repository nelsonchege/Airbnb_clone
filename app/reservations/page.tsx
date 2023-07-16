import React from "react";
import getCurrentUser from "../actions/getCurrentUser";
import ClientOnly from "../clientOnly";
import EmptyState from "../components/EmptyState";
import getReservations from "../actions/getReservations";
import ReservationsClient from "./ReservationsClient";

const ResercationPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unouthorized" subTitle="Please Login" />
      </ClientOnly>
    );
  }

  const reservations = await getReservations({
    authorId: currentUser.id,
  });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Reservations"
          subTitle="Looks like you dont have any reservations"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <ReservationsClient
        reservations={reservations}
        currentUser={currentUser}
      />
    </ClientOnly>
  );
};

export default ResercationPage;
