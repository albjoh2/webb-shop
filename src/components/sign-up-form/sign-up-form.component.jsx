import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-up-form.styles.scss";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Lösenorden matchar ej");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert(
          "Kan inte skapa användare, det finns redan ett konto kopplat till email-adressen, vänligen logga in."
        );
      }
      console.error(
        "Vi stötte på ett problem när vi skulle skapa ditt konto",
        error
      );
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div className="sign-up-container">
      <h2>Har du inget konto?</h2>
      <span>Skapa konto</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Namn"
          type={"text"}
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
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
        <FormInput
          label="Bekräfta lösenord"
          type={"password"}
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Bekräfta uppgifter</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
