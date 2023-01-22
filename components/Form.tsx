import { useForm, SubmitHandler } from 'react-hook-form';
import { useState } from 'react';

interface IFormInput {
  name: string;
  email: string;
  message: string;
  _id: any;
}

export default function Form({ _id }) {
  const { register, handleSubmit } = useForm<IFormInput>();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    setLoading(true);
    fetch('/api/createComment', {
      method: 'POST',
      body: JSON.stringify({ ...data, _id }),
    });
    setTimeout(() => {
      setLoading(false);
      setIsFormSubmitted(true);
    }, 2000);
  };

  return (
    <div>
      {!isFormSubmitted ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="shadow flex flex-col items-start justify-start gap-4 p-12"
        >
          <input
            className="bg-gray-200 px-8 py-3 w-full rounded-lg text-gray-600"
            {...register('name', { required: true, maxLength: 20 })}
          />
          <input
            className="w-full bg-gray-200 px-8 py-3 rounded-lg text-gray-600"
            {...register('email', {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          <textarea
            className="w-full bg-gray-200 px-8 py-3 rounded-lg text-gray-600"
            {...register('message', { min: 10, max: 500 })}
          />
          <button
            className="bg-orange-400 px-6 py-2 rounded-md cursor-pointer"
            type="submit"
          >
            {loading ? 'submitting' : 'Submit'}
          </button>
        </form>
      ) : (
        <div
          onClick={() => setIsFormSubmitted(false)}
          className="bg-green-400 text-xl font-bold text-center px-4 py-2 rounded-md"
        >
          Thank you for for your valuable comment
        </div>
      )}
    </div>
  );
}
