import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const [user, setUser] = useState(null);

  const handelsubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/signup", values, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data) {
          setUser(res.data);
          setValues({ name: "", email: "", password: "" });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handelLogout = () => {
    axios
      .post("http://localhost:8080/logout", {}, { withCredentials: true })
      .then((res) => console.log(res));
  };

  return (
    <section className="bg-slate-950 h-screen flex items-center justify-start gap-4 flex-col p-12">
      <h1 className="text-5xl pb-7 font-bold text-red-500">Register page</h1>
      <h4
        className="absolute top-7 right-14 text-slate-100 cursor-pointer capitalize"
        onClick={handelLogout}
      >
        logout
      </h4>
      <form
        onSubmit={handelsubmit}
        className="flex items-center gap-4 flex-col w-1/3"
      >
        <input
          type="text"
          placeholder="name"
          className="drop-shadow-sm rounded-lg p-2 w-full"
          name="name"
          value={values.name}
          required
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          className="drop-shadow-sm rounded-lg p-2 w-full"
          name="email"
          value={values.email}
          autoComplete="username"
          required
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          className="drop-shadow-sm rounded-lg p-2 w-full"
          name="password"
          required
          autoComplete="current-password"
          value={values.password}
          onChange={(e) => setValues({ ...values, password: e.target.value })}
        />

        <button
          type="submit"
          className="bg-cyan-600 w-1/2 rounded-lg p-3 hover:bg-cyan-100 active:bg-cyan-200"
        >
          Submit
        </button>
      </form>
      <h3
        className={`text-4xl ${
          user?.message !== "Signup successful"
            ? "text-red-500"
            : "text-green-500"
        }`}
      >
        {user?.message}
      </h3>
      (
      <div className="mt-4">
        <p className="text-xl text-green-200">{user?.user?.id}</p>
        <h2 className="text-xl text-green-200">{user?.user?.name}</h2>
        <p className="text-xl text-green-200">{user?.user?.email}</p>
      </div>
      )
    </section>
  );
};

export default Register;
