export const Validation = {
    required: (field) => `The ${field} field is required!`,
    min: (field, min) => `You must pick at least ${min} ${field}!`,
}