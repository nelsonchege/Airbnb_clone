import { NextResponse } from "next/server";

import prisma from "@/app/lib/db";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const {
    title,
    description,
    price,
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(listing);
}
