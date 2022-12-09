import "../index.css";
import React, { useEffect } from "react";
import LoginCard from "../components/loginCard";

function LoginPage() {
  useEffect( () => {
      window.location.reload();
    }
  );

  return (
    <div>
      <LoginCard />
    </div>
  );
}
export default LoginPage;
