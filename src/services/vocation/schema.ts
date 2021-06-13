import * as yup from "yup";

export const CONFIG_VOCATIONS_SCHEMA = yup.object({
    vocations: yup.array().of(
        yup.object({
            id: yup.number().required("'id' field is required"),
            name: yup.string().required("'name' field is required"),
        }),
    ),
});
