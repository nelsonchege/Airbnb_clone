import getCurrentUser from "./actions/getCurrentUser";
import getListings, { IListingsParams } from "./actions/getListings";
import ClientOnly from "./clientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./listings/ListingCard";

type HomaPageProps = {
  searchParams: IListingsParams;
};
export default async function Home({ searchParams }: HomaPageProps) {
  const listing = await getListings(searchParams);
  const currentUser = await getCurrentUser();
  if (listing.length == 0) {
    return (
      <ClientOnly>
        <EmptyState showReset={true} />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          {listing.map((listing: listing) => (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
}
