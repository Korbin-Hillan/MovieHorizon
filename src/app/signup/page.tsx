 "use client"
 import Signup_Header from "./signup_header";
import SignupForm from "./signup_form";
 const SignupPage = () => {

  return (
    <div className="min-h-screen bg-custom-bg flex flex-col">
                  {/* Sidebar */}

            <div className={` w-full`}>
      <Signup_Header /> 
      </div>

      <div className="flex-col flex flex-grow justify-center items-center">
      {/*signUp form submission*/}
        <SignupForm/>
      </div>
    </div>
  );
}

export default SignupPage;