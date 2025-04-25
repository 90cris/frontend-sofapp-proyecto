import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const { fetchUserLogin } = useContext(UserContext);
  const [user, setUser] = useState({ email: "", pass: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState({ email: false, pass: false, notRegistered: false });

  const handleUser = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
    setError({ ...error, [event.target.name]: false, notRegistered: false });
  };

  const handleForm = async (event) => {
    event.preventDefault();
    
    const newError = {
      email: user.email.trim() === "",
      pass: user.pass.trim() === "",
      notRegistered: false
    };
    setError(newError);

    if (newError.email || newError.pass) return;

    try {
      const token = await fetchUserLogin(user.email, user.pass);
      if (token) {
        navigate("/profile");
      }
    } catch (error) {
      if (error.message === "EMAIL_NOT_FOUND") {
        setError((prev) => ({ ...prev, notRegistered: true }));
      } else {
        window.alert("Error al iniciar sesión. Verifica tus credenciales.");
      }
    }
  };

  return (
    <form
      onSubmit={handleForm}
      className="col-10 col-sm-6 col-md-3 m-auto mt-5 p-3 border border-dark rounded mb-5"
    >
      <h1>Iniciar Sesión</h1>
      <hr />

      {/* Alerta si el email no está registrado */}
      {error.notRegistered && (
        <div className="alert alert-warning text-center" role="alert">
          El email no registrado. Para registrarte pincha{" "}
          <button
            className="btn btn-link p-0"
            onClick={() => navigate("/register")}
            style={{ color: "blue", textDecoration: "underline", border: "none", background: "none" }}
          >
             Aquí 
          </button>
        </div>
      )}

      <div className="form-group mt-1">
        <label>Email</label>
        <input
          value={user.email}
          onChange={handleUser}
          type="email"
          name="email"
          className={`form-control ${error.email ? "is-invalid" : ""}`}
          placeholder="ej. juan.perez@gmail.com"
        />
        {error.email && <div className="invalid-feedback">Debe completar este campo.</div>}
      </div>

      <div className="form-group mt-1 position-relative">
        <label>Contraseña</label>
        <div className="input-group">
          <input
            value={user.pass}
            onChange={handleUser}
            type={showPassword ? "text" : "password"}
            name="pass"
            className={`form-control ${error.pass ? "is-invalid" : ""}`}
            placeholder="Contraseña"
          />
          <button
            type="button"
            className="btn"
            onClick={() => setShowPassword(!showPassword)}
            style={{
              border: "none",
              background: "black",
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              padding: "5px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <i
              className={`fa-solid ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
              style={{ color: "white", fontSize: "18px" }}
            ></i>
          </button>
        </div>
        {error.pass && <div className="invalid-feedback">Debe completar este campo.</div>}
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-dark mt-3">
          Iniciar Sesión
        </button>
      </div>
    </form>
  );
};

export default Login;
