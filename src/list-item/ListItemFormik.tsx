import {Formik, Form, Field, FieldInputProps, FieldMetaProps} from "formik";
import {TextField, MenuItem, Button} from "@mui/material";
import {useIntl} from "react-intl";
import {ItemStatus, ItemType} from "../list-item/ListItem";
import {ItemFormProps} from "./ListItemForm.tsx";
import { z } from "zod";
import {toFormikValidationSchema} from "zod-formik-adapter";

export function ListItemFormik({initialData, onSubmit}: ItemFormProps) {
    const intl = useIntl();

    const isFutureDate = (dateString: Date | string) => {
        const selectedDate = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
    };

    const isPositiveNumber = (num: number | string): boolean  => {
        return (num as number) > 0;
    }

    const itemValidationSchema = z.object({
        name: z.string().min(1, "Name is required"),
        url: z.string().url("Invalid URL format").optional().or(z.literal("")),
        amount: z.number().or(z.string()).refine(isPositiveNumber, {message: "Amount cannot be negative"}),
        deadline: z.date().or(z.string()).refine(isFutureDate, { message: "Deadline cannot be in the past" }),
        tags: z.string().optional(),
        type: z.nativeEnum(ItemType),
        status: z.nativeEnum(ItemStatus),
        description: z.string().optional(),
    });

    // type x = z.infer<typeof itemValidationSchema>;

    return (
        <Formik
            initialValues={initialData}
            validationSchema={toFormikValidationSchema(itemValidationSchema)}
            validateOnChange={true}
            validateOnBlur={true}
            onSubmit={(values) => {
                console.log(values);
                onSubmit({...values, deadline: new Date(values.deadline), amount: values.amount});
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field name="name">
                        {({field, meta}: {field: FieldInputProps<string>, meta: FieldMetaProps<string>}) => (
                            <TextField
                                {...field}
                                label="Name"
                                fullWidth
                                margin="dense"
                                color="secondary"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>

                    <Field name="url">
                        {({field, meta}: {field: FieldInputProps<string>, meta: FieldMetaProps<string>}) => (
                            <TextField
                                {...field}
                                label="URL"
                                fullWidth
                                margin="dense"
                                color="secondary"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>

                    <Field name="tags">
                        {({field}: {field: FieldInputProps<string>, meta: FieldMetaProps<string>}) => (
                            <TextField {...field} label="Tags" fullWidth margin="dense" color="secondary"/>
                        )}
                    </Field>

                    <Field name="type">
                        {({field}: {field: FieldInputProps<ItemType>}) => (
                            <TextField {...field} select label="Type" fullWidth margin="dense" color="secondary">
                                <MenuItem value={ItemType.WATCHLIST}>Watchlist</MenuItem>
                                <MenuItem value={ItemType.BOOKS_LIST}>Books List</MenuItem>
                                <MenuItem value={ItemType.SHOPPING_LIST}>Shopping List</MenuItem>
                            </TextField>
                        )}
                    </Field>

                    <Field name="status">
                        {({field}: {field: FieldInputProps<ItemStatus>}) => (
                            <TextField {...field} select label="Status" fullWidth margin="dense" color="secondary">
                                <MenuItem value={ItemStatus.NOT_STARTED}>Not Started</MenuItem>
                                <MenuItem value={ItemStatus.IN_PROGRESS}>In Progress</MenuItem>
                                <MenuItem value={ItemStatus.COMPLETED}>Completed</MenuItem>
                            </TextField>
                        )}
                    </Field>

                    <Field name="amount">
                        {({field, meta}: {field: FieldInputProps<number>, meta: FieldMetaProps<number>}) => (
                            <TextField
                                {...field}
                                label="Amount"
                                type="number"
                                fullWidth
                                margin="dense"
                                color="secondary"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>

                    <Field name="deadline">
                        {({field, meta}: {field: FieldInputProps<Date>, meta: FieldMetaProps<Date>}) => {
                            const date = new Date(field.value).toISOString().split("T")[0]
                            return (
                            <TextField
                                {...field}
                                value={date}
                                label="Deadline"
                                type="date"
                                fullWidth
                                margin="dense"
                                color="secondary"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}}
                    </Field>

                    <Field name="description">
                        {({field}: {field: FieldInputProps<string>}) => (
                            <TextField
                                {...field}
                                label="Description"
                                fullWidth
                                margin="dense"
                                color="secondary"
                                multiline
                                rows={3}
                            />
                        )}
                    </Field>

                    <Button
                        type="submit"
                        variant="contained"
                        color="secondary"
                        style={{marginTop: "16px"}}
                        disabled={isSubmitting}
                    >
                        {intl.formatMessage({id: "list-item-form.save"})}
                    </Button>
                </Form>
            )}
        </Formik>
    );
}
