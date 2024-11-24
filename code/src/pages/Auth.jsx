import { useNavigate } from "react-router-dom";

export default function Auth() {
  const navigate = useNavigate();
  return (
    <div
      className="h-screen w-screen space-x-4"
      onClick={() => navigate("home")}
    >
      <button>Login</button>
      <button>SignUp</button>
    </div>
  );
}
