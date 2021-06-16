import * as schema from 'yup';

const VocationSchema = schema.object({
    id: schema.number().required('"id" field is required'),
    name: schema.string().required('"name" field is required'),
});

export const VocationsSchema = schema.array().of(VocationSchema).min(1);
