import { useState } from "react";
import Input from "../../components/Inputs/Input";
import { validateEmail } from "../../utils/helpers";
import { Link, useNavigate } from "react-router-dom";
import { registerUserFn } from "../../apis/authApis";
import useAuthStore from "../../store/authStore";
// import uploadImage from "../../utils/uploadImage";
// import ProfilePhotoSelector from "../../components/Inputs/ProfilePhotoSelector";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuthStore();
  const navigate = useNavigate();
  // const [profilePic, setProfilePic] = useState(null);
  const handleRegisterFormSubmit = async (event) => {
    event.preventDefault();
    let validationError = "";
    if (!fullName) {
      validationError = "Name can't be empty";
    } else if (!email) {
      validationError = "Email can't be empty";
    } else if (!validateEmail(email)) {
      validationError = "Enter a valid email address";
    } else if (!password) {
      validationError = "Password can't be empty";
    } else if (password.length < 7) {
      validationError = "Password must be at least 7 characters long";
    } else if (password !== confirmPassword) {
      validationError = "Password and Cofirm password must be same";
    }
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    // Signup api call
    // let profileImageUrl = "";
    try {
      // if(profilePic) {
      //   const imgUploadRes = await uploadImage(profilePic);
      //   profileImageUrl =imgUploadRes.imageUrl || "";
      // }
      const { user, token } = await registerUserFn(fullName, email, password);
      if (token) {
        login(user, token);
        navigate("/dashboard");
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong, try again in a few seconds");
      }
    }
  };
  return (
    <div className="lg-w[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
      <h3 className="text-xl font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>
      <form onSubmit={handleRegisterFormSubmit}>
        {/* <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="Enter name"
            type="text"
          />
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="youremail@example.in"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min. 7 characters"
            type="password"
          />
          <Input
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
            label="Confirm Password"
            placeholder="enter password again"
            type="password"
          />
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5"> {error} </p>}
        <button type="submit" className="btn-primary">
          Register
        </button>
        <p className="text-[13px] text-slate-800 mt-3 ">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" to="/login">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
Register;
