import Link from "next/link";
import React from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { ExtendedPage, PageAuth } from "@types";

interface LoginFields {
  username: string;
  password: string;
}

const LoginPage: ExtendedPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFields>();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
    reset();
  });

  return (
    <div className="mx-auto mt-12 max-w-xs">
      <h1 className="mb-4 text-center text-2xl font-bold">Login</h1>
      <form className="flex w-full flex-col gap-3" onSubmit={onSubmit}>
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
        <Button className="mt-2">Log in</Button>
        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/signup">
            <a className="text-primary hover:underline">Signup</a>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;

LoginPage.auth = PageAuth.UnPrivate;
