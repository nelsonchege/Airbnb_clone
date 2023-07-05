import React from "react";
import Container from "../Container";
import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/app/data";

export default function Categories() {
  const params = useSearchParams();
  const category_ = params?.get("category");
  const pathname = usePathname();

  const mainPage = pathname == "/";

  if (!mainPage) {
    return null;
  }
  return (
    <Container>
      <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
        {categories.map((category) => (
          <CategoryBox
            key={category.label}
            label={category.label}
            description={category.description}
            selected={category_ == category.label}
            icon={category.icon}
          />
        ))}
      </div>
    </Container>
  );
}
