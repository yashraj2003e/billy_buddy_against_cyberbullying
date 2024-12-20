import { useNavigate } from "react-router-dom";
import { useDataContext } from "../contexts/DataContext";
import { doSignInWithGoogle } from "../firebase/auth";
export default function Auth() {
  const navigate = useNavigate();
  const { userLoggedIn } = useDataContext();

  const handleSignIn = async () => {
    if (!userLoggedIn) {
      await doSignInWithGoogle().then(() => navigate("home"));
    }
  };

  return (
    //onClick={() => navigate("home")}
    <div className="space-x-4">
      <button onClick={handleSignIn}>Get Started</button>
    </div>
  );
}
