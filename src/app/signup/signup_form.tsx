"use client"

import { useState } from "react";

const SignupForm = () => {
    const [formData, setFormData] = useState<{ username: string; password: string; email: string }>({
        username: "",
        password: "",
        email: "",
      });      
  
    const [message, setMessage] = useState("");
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      try {
        const response = await fetch("http://localhost:5001/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          setMessage("✅ User created successfully!");
        } else {
          setMessage(`❌ Error: ${data.message}`);
        }
      } catch (error) {
        setMessage("❌ Failed to connect to the server. Error Code" + error);
      }
    };

    return (
        <form 
        onSubmit={handleSubmit}
        className="w-96 flex flex-col text-gray-900 text-lg">

        <label htmlFor="username">Username</label>
        <input 
        className="rounded-md p-1" 
        type="text" 
        id="username" 
        name="username"
        value={formData.username}
        onChange={handleChange}
        required
        />


        <label htmlFor="password">Password</label>
        <input 
        className="rounded-md p-1" 
        type="password" 
        id="password" 
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
        />
        <label htmlFor="email">Email</label>
        <input className="rounded-md p-1" 
        type="email" 
        id="email" 
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
        />

        <button 
        type="submit"
        className="m-5 w-20 rounded bg-gray-300 self-center h-8"
        >
            Sign Up
        </button>
        {message && <p className="text-center mt-2">{message}</p>}
        </form>
 );
}

export default SignupForm;