import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { ExtendedPage, PageAuth } from "@types";

interface SignupFields {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: ExtendedPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<SignupFields>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <div className="mx-auto mt-12 max-w-xs">
      <h1 className="mb-4 text-center text-2xl font-bold">Signup</h1>
      <form className="flex w-full flex-col gap-3" onSubmit={onSubmit}>
        <Input
          label="Email"
          type="email"
          {...register("email", { required: "Email is required" })}
          error={errors.email?.message}
        />
        <Input
          label="Username"
          type="text"
          {...register("username", { required: "Name is required" })}
          error={errors.username?.message}
        />
        <Input
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
        />
        <Input
          label="Confirm Password"
          type="password"
          {...register("confirmPassword", {
            required: "Password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          })}
          error={errors.confirmPassword?.message}
        />
        <Button className="mt-2">Sign up</Button>
        <p className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/login">
            <a className="text-primary hover:underline">Login</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;

SignupPage.auth = PageAuth.UnPrivate;
