import React from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { apiUrl } from '../utils';

type Inputs = {
  email: string
  password: string
}

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post(`${apiUrl()}/login`, data)
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('token', response.data.token);
          location.href = '/';
        } else {
          reset();
          console.log('error');
        }
      }).catch((error) => {
        reset();
        console.log('error');
      });
  }

  return (
    <div className="py-20 px-8 relative min-h-screen">
      <h1 className="text-5xl font-semibold text-center text-gray-800">Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="2xl:w-5/12 mx-auto mt-10 bg-gray-200 p-12 rounded" autoComplete="off">
        <div className="mt-6">
          <label htmlFor="email" className="font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            maxLength="255"
            defaultValue=""
            {...register("email",
              {
                required: true,
                maxLength: 255,
                minLength: 3,
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }
              })} className="mt-2 outline-none bg-white block w-full text-code-gray min-h-8 p-3 text-xl" />
          {errors.email && <span className="text-red-600 font-medium block mt-1">This field is required</span>}
        </div>
        <div className="mt-6">
          <label htmlFor="password" className="font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            maxLength="255"
            defaultValue=""
            {...register("password",
              {
                required: true,
                maxLength: 255,
                minLength: 3
              })}
            className="mt-2 outline-none bg-white block w-full text-code-gray min-h-8 p-3 text-xl" />
          {errors.password && <span className="text-red-600 font-medium block mt-1">This field is required</span>}
        </div>
        <div className="mt-6 text-right">
          <button type="submit" className="bg-code-dark-gray text-white text-xl rounded py-3 px-6">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;