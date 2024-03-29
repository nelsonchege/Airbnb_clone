"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "./Avatar";
import { useCallback, useState } from "react";
import MenuItems from "./MenuItems";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import { useSession, signOut } from "next-auth/react";
import useRentModal from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";

export default function UserMenu() {
  const { data: session } = useSession();

  const RegisterModal = useRegisterModal();
  const LoginMadal = useLoginModal();
  const RentModal = useRentModal();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!session) {
      return LoginMadal.onOpen();
    }
    RentModal.onOpen();
    setIsOpen(false);
  }, [session, LoginMadal, RentModal]);

  const router = useRouter();
  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          Airbnb your home
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={session?.user?.image} />
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              {!session ? (
                <>
                  <MenuItems onClick={LoginMadal.onOpen} label="login" />
                  <MenuItems onClick={RegisterModal.onOpen} label="signin" />
                </>
              ) : (
                <>
                  <MenuItems
                    onClick={() => {
                      router.push("/trips");
                      setIsOpen(false);
                    }}
                    label="My trips"
                  />
                  <MenuItems
                    onClick={() => {
                      router.push("/favorites");
                      setIsOpen(false);
                    }}
                    label="My Favorites"
                  />
                  <MenuItems
                    onClick={() => {
                      router.push("/reservations");
                      setIsOpen(false);
                    }}
                    label="My Reservations"
                  />
                  <MenuItems
                    onClick={() => {
                      router.push("/properties");
                      setIsOpen(false);
                    }}
                    label="My Properties"
                  />
                  <MenuItems onClick={onRent} label="Airbnb my Home" />
                  <hr />
                  <MenuItems onClick={() => signOut()} label="logout" />
                </>
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
}
