"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  sendInviteSchema,
  useYupValidationResolver,
} from "@/lib/validation-schema";
import { Controller, useForm } from "react-hook-form";
import { useInviteUserMutation } from "@/redux/services/auth/authApi";
import { toast } from "sonner";

export function SingleInvite() {
  const [inviteUser, { isError, isSuccess, isLoading, data: inviteData }] =
    useInviteUserMutation();

  const {
    register,
    control,
    handleSubmit,
    formState: { isSubmitting, isValid, errors },
  } = useForm({
    resolver: useYupValidationResolver(sendInviteSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      role: "",
    },
  });

  const onSubmit = async (data: any) => {
    const _data = await inviteUser(data).unwrap();
    try {
      toast.success(_data?.message);
    } catch (err) {}
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          {...register("email")}
          placeholder={"Enter email address"}
          autoComplete={`off`}
          error={errors.email?.message}
          required
        />
      </div>
      <div className="space-y-2">
        <Controller
          control={control}
          name="role"
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <>
              <Label htmlFor="role">Role</Label>
              <Select value={value} onValueChange={onChange} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">User</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}
        />
      </div>
      <Button type="submit" disabled={!isValid || isLoading}>
        {isLoading ? "Sending..." : "Send Invitation"}
      </Button>
    </form>
  );
}
