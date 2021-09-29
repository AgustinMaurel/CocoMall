import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { startRegisterWithEmailPasswordName } from "../../Redux/actions/auth";

const RegisterScreen = () => {
  
  const dispatch = useDispatch();

  const { handleSubmit, formState:{errors}, register, setValue } = useForm();

  const handleRegister = (data) => {
     console.log(data)
     dispatch(startRegisterWithEmailPasswordName(data.email , data.password, data.name));
  };

  return (
    <>
      <div className="flex flex-col text-center">
        <h3>Register</h3>

        <form onSubmit={handleSubmit(handleRegister)}>
          <input
            {...register("name", {
                required: {value: true, message: 'name is required'},
                minLength: {
                value: 4,
                message: "name must contain at least 4 characters",
              },
                maxLength: {
                value: 15,
                message: "name must contain a maximum of 15 characters ",
              },
                pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "name can only be letters",
              },
            })}
            type="text"
            placeholder="Name"
            name='name'
            autoComplete="off"
          />
          <button onClick = {()=> console.log(errors)}>errors</button>
           {/* {errors && <p>{errors}</p>} */}

          <input
          {...register("email",{
              required: {value : true, message : 'email is required'},
              pattern : {
                  value : /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
                  message : 'email is invalid'
              }
          })}
            type="text"
            placeholder="Email"
            name="email"
            autoComplete="off"
          />

          <input 
          {...register("password", {
            required: {value: true, message: 'password is required'},
            minLength: {
              value: 8,
              message: "password must contain at least 8 characters",
            },
            maxLength: {
              value: 20,
              message: "password must contain a maximum of 20 characters ",
            },
            /* pattern: {
              value: /^(?=.[a-z])(?=.[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
              message: "Your password must be at least 8 characters long, contain at least one number and have a mixture of uppercase and lowercase letters",
            }, */
          })}
          type="password" 
          placeholder="Password" 
          name="password" />

          <input
            type="password"
            placeholder="Confirm password"
            name="password2"
          />

          <button type="submit">Register</button>

          <Link to="/auth/login">Already registered?</Link>
        </form>
      </div>
    </>
  );
};

export default RegisterScreen;
