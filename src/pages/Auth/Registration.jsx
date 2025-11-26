import React, { useEffect, useState } from "react";
import {  logo } from "../../assets/images/images";
import { FaEyeSlash, FcGoogle } from "../../assets/icons";
import { Checkbox, Label, Select } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAlluserType,
  otpVerify,
  otpVerifyWholesaler,
  registerUser,
  registerWholeSeller,
} from "../../reducers/AuthSlice";
import { useForm } from "react-hook-form";

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState("");
  const [sendOtp, setSendOtp] = useState(false);
  const [otpMessage, setOtpMessage] = useState("");
  const { usersRole } = useSelector((state) => state?.auth);


  const handleLogin = () => {
    navigate("/");
  };
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    
  
      dispatch(registerUser(data)).then((res) => {
        console.log("res", res);
        if (res?.payload?.status_code === 201) {
          setMessage(res?.payload?.message);
          navigate("/home")
          
        }
        else if(res?.payload?.response?.data?.status_code===422)
        {
          setMessage(res?.payload?.response?.data?.data?.[0]?.message)
        }
      });
    
     
  };
 
  return (
    <div className="my-0 lg:my-0 px-4 lg:mx-0 flex justify-center items-center wrapper_bg_area  bg-white">
      <div className="w-full my-0 mx-auto">
        <div className="lg:flex lg:h-screen py-8 lg:py-0">
          <div className="w-full lg:w-6/12 mx-auto bg-white py-10">
            <div className="w-full lg:w-full">
              <div className="text-center mb-2 lg:mb-5">
                <img src={logo} alt="logo" className="inline-block w-4/12" />
              </div>
              <h1 className="text-center font-medium text-xl lg:text-[25px] leading-[45px] text-black pb-4 lg:pb-0">
                Sign Up
              </h1>
           
                <div>
                  <form onSubmit={handleSubmit(onSubmit)}>
                
                        <div className="mb-3 ">
                          <Label className="text-[15px] text-black font-normal pb-1 block">
                            Email
                          </Label>
                          <input
                            type="email"
                            id="email"
                            className="bg-white border border-[#dfdfdf] text-[#888888] text-sm rounded-lg focus:ring-[#f1d9ff] focus:border-[#f1d9ff] block w-full py-3 px-3"
                            placeholder="Email"
                            {...register("email", {
                              required: true,
                            })}
                          />

                          {console.log("erros: ", errors)}
                          {errors.email && (
                            <span className="text-red-500">
                              Email is required
                            </span>
                          )}
                        </div>
                        <div className="mb-3">
                          <Label className="text-[15px] text-black font-normal pb-1 block">
                            Password
                          </Label>
                          <input
                            placeholder="Password"
                            type="password"
                            id="password"
                            className="bg-white border border-[#dfdfdf] text-[#888888] text-sm rounded-lg focus:ring-[#f1d9ff] focus:border-[#f1d9ff] block w-full py-3 px-3"
                            {...register("password", { required: true })}
                          />
                          {errors.password && (
                            <span className="text-red-500">
                              Password is required
                            </span>
                          )}
                        </div>
                        <div className="mb-0">
                          <Label className="text-[15px] text-black font-normal pb-1 block">
                            Shopify Store Private Key
                          </Label>
                          <input
                            placeholder="Shopify Store Private Key"
                            type="text"
                            id="password"
                            className="bg-white border border-[#dfdfdf] text-[#888888] text-sm rounded-lg focus:ring-[#f1d9ff] focus:border-[#f1d9ff] block w-full py-3 px-3"
                            {...register("private_key", { required: true })}
                          />
                          {errors.private_key && (
                            <span className="text-red-500">
                              Shopify Store Private Key is required
                            </span>
                          )}
                        </div>
                    <button
                      type="submit"
                      className="text-white bg-[#000000] font-Manrope font-medium text-[23px] mb-2 hover:bg-black focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-xl text-xl w-full px-5 py-3 text-center mt-4"
                    >
                      Sign Up
                    </button>
                  </form>

                  <div className="relative pt-2 pb-2">
                  
                    {message && (
                      <div className="text-red-500 text-center">{message}</div>
                    )}
                  </div>
                  <div className="text-center mt-5">
                    <p className="text-[#615D5D] text-sm">
                      Have an account?{" "}
                      <button
                        onClick={() => handleLogin()}
                        className="text-blue-700 hover:text-black"
                      >
                        Log In
                      </button>
                    </p>
                  </div>
                </div>
             
             
            </div>
          </div>
          {/* <div
            className="w-6/12 bg-cover hidden lg:block"
            style={{ backgroundImage: `url("${LoginImg}")` }}
          >
            &nbsp;
          </div> */}
        </div>
      </div>
      {/* {openModal && (
            <AfterLoginModal openModal={openModal} setOpenModal={setOpenModal} />
          )} */}
    </div>
  );
};

export default Registration;
