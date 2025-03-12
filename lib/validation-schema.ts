import { useCallback } from "react";
import * as yup from "yup";

export const signinSchema = yup
  .object({
    email: yup
      .string()
      .email("Email is invalid")
      .required("This field is required"),
    password: yup.string().required("This field is required"),
  })
  .required();

export const sendInviteSchema = yup
  .object({
    email: yup.string().email("Email is invalid").required("Email is required"),
    role: yup.string().required("Role is required"),
  })
  .required();

export const useYupValidationResolver = (validationSchema: any) =>
  useCallback(
    async (data: any) => {
      try {
        const values = await validationSchema.validate(data, {
          abortEarly: false,
        });

        return {
          values,
          errors: {},
        };
      } catch (errors: any) {
        return {
          values: {},
          errors: errors.inner.reduce(
            (
              allErrors: any,
              currentError: { path: any; type: any; message: any }
            ) => ({
              ...allErrors,
              [currentError.path]: {
                type: currentError.type ?? "validation",
                message: currentError.message,
              },
            }),
            {}
          ),
        };
      }
    },
    [validationSchema]
  );
