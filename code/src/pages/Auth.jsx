import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  return (
    <div className="space-x-4" onClick={() => navigate("home")}>
      <button>Login</button>
      <button>SignUp</button>
    </div>
  );
}
