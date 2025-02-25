"use client"

const SignupForm = () => {
 return (
        <form className="w-96 flex flex-col text-gray-900 text-lg">
        <label htmlFor="fname">Username</label>
        <input className="rounded-md p-1" type="text" id="Uname" name="Uname"/>
        <label htmlFor="Pword">Password</label>
        <input className="rounded-md p-1" type="password" id="Pword" name="Pword"/>
        <label htmlFor="Email">Email</label>
        <input className="rounded-md p-1" type="email" id="Email" name="Email"/>
        <button className="m-5 bg-white w-20 rounded bg-gray-300 self-center">
            Sign Up
        </button>
        </form>
 );
}

export default SignupForm;