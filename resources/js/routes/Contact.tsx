import React, { useState } from 'react';
import axios from 'axios';
import { useForm, SubmitHandler } from "react-hook-form";
import { apiUrl } from '../utils';

type Inputs = {
  name: string
  email: string
  subject: string
  message: string
}

const Contact: React.FC = () => {
  const [message, setMessage] = useState({ type: 'success', message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    axios.post(`${apiUrl()}/contact`, data)
      .then((response) => {
        if (response.status === 200) {
          setMessage({ type: 'success', message: 'Your contact message was sent!' });
          reset();
        } else {
          setMessage({ type: 'error', message: 'An error occurred while sending your message.' });
        }
      }).catch((error) => {
        setMessage({ type: 'error', message: 'An error occurred while sending your message.' });
      });
  }

  return (
    <div className="py-20 px-8 relative">
      <h1 className="text-5xl font-semibold text-center text-gray-800">Get in touch</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="2xl:w-6/12 mx-auto mt-10 bg-gray-200 p-12 rounded" autoComplete="off">
        {message.message.length > 0 &&
          <div className="text-center rounded font-medium text-2xl w-full text-white mb-6">
            <span className={message.type === 'success' ? 'text-green-600' : 'text-red-600'}>{message.message}</span>
          </div>
        }
        <div>
          <label htmlFor="name" className="font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            maxLength="255"
            defaultValue=""
            {...register("name",
              {
                required: true,
                maxLength: 255,
                minLength: 3
              })}
            className="mt-2 outline-none bg-white block w-full text-code-gray min-h-8 p-3 text-xl" />
          {errors.name && <span className="text-red-600 font-medium block mt-1">This field is required</span>}
        </div>
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
          <label htmlFor="subject" className="font-medium">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            maxLength="255"
            defaultValue=""
            {...register("subject",
              {
                required: true,
                maxLength: 255,
                minLength: 3
              })}
            className="mt-2 outline-none bg-white block w-full text-code-gray min-h-8 p-3 text-xl" />
          {errors.subject && <span className="text-red-600 font-medium block mt-1">This field is required</span>}
        </div>
        <div className="mt-6">
          <label htmlFor="v" className="font-medium">Message</label>
          <textarea
            id="message"
            rows="5"
            cols="100"
            maxLength="1000"
            name="message"
            defaultValue=""
            {...register("message",
              {
                required: true,
                maxLength: 1000,
                minLength: 20
              })}
            className="mt-2 bg-white outline-none block w-full text-code-gray min-h-8 p-3 text-xl" />
          {errors.message && <span className="text-red-600 font-medium block mt-1">This field is required</span>}
        </div>
        <div className="mt-6 text-right">
          <button type="submit" className="bg-code-dark-gray text-white text-xl rounded py-3 px-6">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Contact;