import {Formik, Form, Field} from "formik";
import {TextField, MenuItem, Button} from "@mui/material";
import {useIntl} from "react-intl";
import {ItemStatus, ItemType} from "../list-item/ListItem";
import {ItemFormProps} from "./ListItemForm.tsx";

export function ListItemFormik({initialData, onSubmit}: ItemFormProps) {
    const intl = useIntl();

    return (
        <Formik
            initialValues={initialData}
            onSubmit={(values) => {
                onSubmit({...values, deadline: new Date(values.deadline)});
            }}
        >
            {({isSubmitting}) => (
                <Form>
                    <Field name="name">
                        {({field, meta}: any) => (
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
                        {({field, meta}: any) => (
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
                        {({field}: any) => (
                            <TextField {...field} label="Tags" fullWidth margin="dense" color="secondary"/>
                        )}
                    </Field>

                    <Field name="type">
                        {({field}: any) => (
                            <TextField {...field} select label="Type" fullWidth margin="dense" color="secondary">
                                <MenuItem value={ItemType.WATCHLIST}>Watchlist</MenuItem>
                                <MenuItem value={ItemType.BOOKS_LIST}>Books List</MenuItem>
                                <MenuItem value={ItemType.SHOPPING_LIST}>Shopping List</MenuItem>
                            </TextField>
                        )}
                    </Field>

                    <Field name="status">
                        {({field}: any) => (
                            <TextField {...field} select label="Status" fullWidth margin="dense" color="secondary">
                                <MenuItem value={ItemStatus.NOT_STARTED}>Not Started</MenuItem>
                                <MenuItem value={ItemStatus.IN_PROGRESS}>In Progress</MenuItem>
                                <MenuItem value={ItemStatus.COMPLETED}>Completed</MenuItem>
                            </TextField>
                        )}
                    </Field>

                    <Field name="amount">
                        {({field, meta}: any) => (
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
                        {({field, meta}: any) => (
                            <TextField
                                {...field}
                                label="Deadline"
                                type="date"
                                fullWidth
                                margin="dense"
                                color="secondary"
                                error={meta.touched && !!meta.error}
                                helperText={meta.touched && meta.error}
                            />
                        )}
                    </Field>

                    <Field name="description">
                        {({field}: any) => (
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
