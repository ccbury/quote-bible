import { ErrorMessage, Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button, Header } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { object, string, ref } from 'yup';
import ValidationError from "../errors/ValidationError";

export default observer(function RegsiterForm() {
    const { userStore } = useStore();
    const getCharacterValidationError = (str: string) => {
        return `Your password must have at least 1 ${str} character`;
    };
    // const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);
    return (
        <Formik
            initialValues={{ displayName: '', username: '', email: '', password: '', error: null }}
            onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(error => setErrors({ error: error }))}
            validationSchema={object({
                displayName: string().required(),
                username: string().required(),
                email: string().required(),
                password: string()
                    .required("Please enter a password")
                    // check minimum characters
                    .min(8, "Password must have at least 8 characters")
                    // different error messages for different requirements
                    .matches(/[0-9]/, getCharacterValidationError("digit"))
                    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
                    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
                confirmPassword: string()
                    .required("Please re-type your password")
                    // use oneOf to match one of the values inside the array.
                    // use "ref" to get the value of passwrod.
                    .oneOf([ ref("password") ], "Passwords does not match"),
            })}
        >
            {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                <Form className='ui form error' onSubmit={handleSubmit} autoComplete='off'>
                    <Header as='h2' content='Sign up to Reactivities' color="teal" textAlign="center" />
                    <MyTextInput placeholder="Display Name" name='displayName' />
                    <MyTextInput placeholder="Username" name='username' />
                    <MyTextInput placeholder="Email" name='email' />
                    <MyTextInput placeholder="Password" name='password' />
                    <MyTextInput placeholder="Confirm Password" name='confirmPassword' />
                    <ErrorMessage name='error' render={() =>
                        <ValidationError errors={errors.error as unknown as string[]} />} />
                    <Button
                        disabled={!isValid || !dirty || isSubmitting}
                        loading={isSubmitting}
                        positive content='Register'
                        type="submit" fluid
                    />
                </Form>
            )}

        </Formik>
    )
})