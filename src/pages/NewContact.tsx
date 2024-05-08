import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import useContactAPI from "../hooks/useContactAPI";
import { useNavigate } from "react-router-dom";

// Define the schema for contact data using Zod
const contactSchema = z.object({
  name: z.string().nonempty(),
  email: z.string().email(),
  phone: z.string().nonempty(),
  gender: z.enum(["male", "female"]),
});

// The NewContact component is used to add a new contact.
const NewContact = () => {

  const navigate = useNavigate();
  const { loading, addContact } = useContactAPI();

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(contactSchema), // Use Zod resolver for validation
  });

  // The onSubmit function is called when the form is submitted.
  const onSubmit = (data) => {
    addContact(data);
    handleSubmit(() => { });
    navigate("/contacts");
  };

  return (
    <>
      <div className="container max-w-screen-xl text-white">
        <h1 className=" text-[50px] leading-[73px] font-['poppins'] font-bold mb-16">
          New Contact
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
          <div className="flex flex-row justify-start gap-10 items-center">
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="full name"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px]  font-medium p-0.5 pl-10 text-[#083F46]  h-[3.4rem] w-[30rem]"
              {...register("name")}
            />
            {/* Display error message if validation fails */}
            {errors.fullName && <p className="text-red-500">{errors.fullName.message}</p>}
            <input
              type="email"
              id="email"
              name="email"
              placeholder="e-mail"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px]  font-medium p-0.5 pl-10 text-[#083F46]  h-[3.4rem] w-[30rem]"
              {...register("email")}
            />
          </div>
          {/* Display error message if validation fails */}
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <div className="flex flex-row justify-start gap-10 items-center">
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="phone number"
              className="mb-7 rounded-full font-['poppins'] text-[25px] leading-[50px]  font-medium p-0.5 pl-10 text-[#083F46]  h-[3.4rem] w-[30rem]"
              {...register("phone")}
            />
            {/* Display error message if validation fails */}
            {errors.phoneNumber && <p className="text-red-500">{errors.phoneNumber.message}</p>}
            <div className="flex flex-row justify-between items-center w-[30rem] font-['poppins'] text-[25px] leading-[50px]  font-medium  text-white">
              <label>Gender</label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="radio" value="male" />
                    <label htmlFor="male">male</label>
                    <input {...field} type="radio" value="female" />
                    <label htmlFor="female">female</label>
                  </>
                )}
              />
            </div>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="px-12 py-1 mt-14 border-[2px] rounded-full font-['poppins']  text-[1.438rem] leading-[3.125rem] w-[350px]   text-white "
          >
            {loading ? "Wait..." : "add your first contact"}
          </button>
        </form>
      </div>
    </>
  );
};

export default NewContact;
