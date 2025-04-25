import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { fetchRegisterUser } = useContext(UserContext);

  const [user, setUser] = useState({
    nombre: "",
    apellido: "",
    email: "",
    fono: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleUser = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const validatePassword = (password) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(password);
  };

  const handleForm = async (event) => {
    event.preventDefault();
    setError("");

    // Validaciones
    if (
      !user.nombre ||
      !user.apellido ||
      !user.email ||
      !user.password ||
      !user.confirmPassword ||
      !user.fono
    ) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    if (!validatePassword(user.password)) {
      setError(
        "La contraseña debe tener al menos 6 caracteres, incluyendo letras y números."
      );
      return;
    }

    if (user.password !== user.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      const newUser = {
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        pass: user.password,
        fono: user.fono,
      };

      await fetchRegisterUser(newUser);
      alert("Registro exitoso, ahora puedes iniciar sesión.");
      navigate("/login");
    } catch (error) {
      if (error.response?.status === 400) {
        const errorMessage =
          error.response.data?.msg ||
          "Error al registrar usuario1. Inténtalo nuevamente.";

        setError(errorMessage);
      } else {
        setError("El email ya está registrado. Usa otro.");
      }
    }
  };

  return (
    <form
      onSubmit={handleForm}
      className="col-10 col-sm-6 col-md-3 m-auto mt-5 p-3 border border-dark rounded mb-5"
    >
      <h1>Completar registro</h1>
      <hr />

      <div className="form-group mt-1">
        <label>Nombre</label>
        <input
          value={user.nombre}
          onChange={handleUser}
          type="text"
          name="nombre"
          className="form-control"
          placeholder="Nombre"
        />
      </div>

      <div className="form-group mt-1">
        <label>Apellido</label>
        <input
          value={user.apellido}
          onChange={handleUser}
          type="text"
          name="apellido"
          className="form-control"
          placeholder="Apellido"
        />
      </div>

      <div className="form-group mt-1">
        <label>Email</label>
        <input
          value={user.email}
          onChange={handleUser}
          type="email"
          name="email"
          className="form-control"
          placeholder="ej. juan.perez@gmail.com"
        />
      </div>

      <div className="form-group mt-1">
        <label>Telefono</label>
        <input
          value={user.fono}
          onChange={handleUser}
          type="tel"
          name="fono"
          className="form-control"
          placeholder="+56 9xxxxxxxx"
        />
      </div>

      <div className="form-group mt-1">
        <label>Contraseña</label>
        <input
          value={user.password}
          onChange={handleUser}
          type="password"
          name="password"
          className="form-control"
          placeholder="Contraseña"
        />
      </div>

      <div className="form-group mt-1">
        <label>Confirmar Contraseña</label>
        <input
          value={user.confirmPassword}
          onChange={handleUser}
          type="password"
          name="confirmPassword"
          className="form-control"
          placeholder="Repite tu contraseña"
        />
      </div>

      {error && <p className="text-danger mt-3">{error}</p>}

      <div className="d-flex justify-content-center">
        <button
          type="submit"
          className="btn btn-dark mt-3"
          disabled={
            !user.nombre ||
            !user.apellido ||
            !user.email ||
            !user.password ||
            !user.confirmPassword ||
            !user.fono
          }
        >
          Registrar
        </button>
      </div>
    </form>
  );
};

export default Register;
