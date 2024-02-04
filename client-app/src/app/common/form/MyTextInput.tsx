import { useField } from "formik";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import { Button, Form, Label } from "semantic-ui-react";


interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

export default observer(function MyTextInput(props: Props) {
    const [ field, meta ] = useField(props.name);
    const [ showPassword, setShowPassword ] = useState(false);
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            {(props.name !== 'password' && props.name !== 'confirmPassword') &&
                <input {...field} {...props} />
            }
            <div style={{ display: 'flex', flexDirection: 'row', marginBottom: 20 }}>
                {props.name === 'password' &&
                    <>
                        <input {...field} {...props} type={showPassword ? 'text' : 'password'} width={12} />
                        <Button icon='question circle' onClick={() => setShowPassword(!showPassword)} type='button' active={showPassword} />
                    </>
                }
                {props.name === 'confirmPassword' &&
                    <>
                        <input {...field} {...props} type={showPassword ? 'text' : 'password'} width={12} />
                        <Button icon='question circle' onClick={() => setShowPassword(!showPassword)} type='button' active={showPassword} />
                    </>

                }
            </div>

            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}

        </Form.Field>
    )
})