import "../index.css";
import React, { useEffect } from "react";
import LoginCard from "../components/loginCard";

function LoginPage() {
  useEffect( () => {
      window.location = process.env.REACT_APP_API_ENDPOINT + "/Login";
    }
  );

  return (
    <div>
      <LoginCard />
    </div>
  );
}
export default LoginPage;
