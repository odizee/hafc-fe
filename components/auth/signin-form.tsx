"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SignInData } from "@/lib/types";
import { useLoginMutation } from "@/redux/services/auth/authApi";
import { TOKEN_CACHE_NAME } from "@/lib/common";
import { useForm } from "react-hook-form";
import {
  signinSchema,
  useYupValidationResolver,
} from "@/lib/validation-schema";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<SignInData>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    resolver: useYupValidationResolver(signinSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [Login, { isError, isSuccess }] = useLoginMutation();

  const onSubmit = async (data: any) => {
    const submitdata = { ...data };

    try {
      const _data = await Login(submitdata).unwrap();
      localStorage.setItem(TOKEN_CACHE_NAME, _data?.token);
      router.push("/");
    } catch (error) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          placeholder={"Enter email address"}
          autoComplete={`off`}
          error={errors.lastName?.message}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          {...register("password")}
          placeholder="Enter Password"
          autoComplete={`off`}
          error={errors.password?.message}
          required
        />
      </div>
      <Button type="submit" className="w-full" disabled={!isValid}>
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
