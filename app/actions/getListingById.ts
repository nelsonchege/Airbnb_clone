import prisma from "../lib/db";

type params = {
  listingId: String;
};
export default async function getListings(params: params) {
  try {
    const { listingId } = params;
    if (!listingId || typeof listingId !== "string") {
      throw new Error("Invalid ID");
    }
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }
    return listing;
  } catch (error: any) {
    throw new Error(error);
  }
}
