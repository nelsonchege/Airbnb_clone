"use client";

import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { useCallback, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Inputs from "../Inputs";
import { toast } from "react-hot-toast";
import Button from "../Button";

function RegisterModal() {
  const RegisterModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    console.log("-------->", data);
    axios
      .post("/api/register", data)
      .then(() => {
        RegisterModal.onClose();
      })
      .catch((error) => {
        toast.error("something went wrong");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading
        center={false}
        title="Register"
        subtitle="register into the app"
      />
      <Inputs
        id="email"
        label="email"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Inputs
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
      <Inputs
        id="password"
        label="password"
        disabled={isLoading}
        register={register}
        errors={errors}
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="continue with google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="continue with gitlab"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-nautral-500 text-center mt-4 font-light">
        <div className="justify-center flex flex-row items-center gap-2">
          <div>Already have an account?</div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={RegisterModal.onClose}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disabled={isLoading}
      isOpen={RegisterModal.isOpen}
      title="Register"
      actionLabel="Continue"
      onClose={RegisterModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
}

export default RegisterModal;
