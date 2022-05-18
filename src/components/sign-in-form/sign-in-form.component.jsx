import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import { useState } from "react";
import {
  signInAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
} from "../../utils/firebase/firebase.utils";
import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);

      resetFormFields();
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Du har angett fel lösenord, försök igen.");
          break;
        case "auth/user-not-find":
          alert(
            "Mailadressen du har angett finns inte kopplat till något konto, försök igen."
          );
          break;
        default:
          console.error(
            "Vi stötte på ett problem när du försökte logga in",
            error
          );
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-in-container">
      <h2>Har du redan ett konto?</h2>
      <span>Logga in</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type={"email"}
          required
          onChange={handleChange}
          name="email"
          value={email}
        />
        <FormInput
          label="Lösenord"
          type={"password"}
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <div className="buttons-container">
          <Button type="submit">Logga in</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Logga in med Google
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
