import React from "react";
import { useForm } from "react-hook-form";

const PostJob = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {console.log(data);};

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* {form} */}
      <div className="bg-[#FAFAFA]  py-10px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg-w-1/2 w-full">
                <label htmlFor=""></label>
            </div>
          </div>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default PostJob;
