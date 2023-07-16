import getCurrentUser from "../actions/getCurrentUser";
import getListings from "../actions/getListings";
import ClientOnly from "../clientOnly";
import EmptyState from "../components/EmptyState";
import PropertyClient from "./PropertyClient";

const Propertypage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subTitle="Please login" />
      </ClientOnly>
    );
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title="No Property found"
          subTitle="Looks like you dont have any properties"
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <PropertyClient listings={listings} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default Propertypage;
