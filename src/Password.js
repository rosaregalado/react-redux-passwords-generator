import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addPassword } from './features/passwords/passwordsSlice'
import zxcvbn from 'zxcvbn'
import './Password.css'

function generatePassword(length) {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
    if (i === (length - 1) / 2 || i === length - 5) {
      password += "-";
    }
  }
  return password;
}

function Password() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('p@$$w0rd');
  const [passwordName, setPasswordName] = useState('');
  const [passwordLength, setPasswordLength] = useState(8);
  const [name, setName] = useState('');
  const passwordStrength = zxcvbn(password);
  const backgroundColors = ["#ff4d4d", "#ffad4d", "#ffff4d", "#eaff4d", "#4dff4d"];

  // const inputStyle = {
  //   backgroundColor: backgroundColors[passwordStrength.score],
  // };
  
  const passwordStyle = {
    backgroundColor: backgroundColors[passwordStrength.score],
    padding: '10px',
    borderRadius: '10px',
    marginBottom: '20px',
  }

  return (
    <div style={passwordStyle}>
      <input 
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input 
        type="text"
        placeholder="Password Name"
        onChange={(e) => setPasswordName(e.target.value)}
        value={passwordName}
      />
      <input 
        type="range"
        min="8"
        max="32"
        onChange={(e) => setPasswordLength(e.target.value)}
        value={passwordLength}
      />
      <span>Password Length: {passwordLength}</span>
      <br />
      <input 
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        // style={inputStyle}
      />
      <div>
        <button onClick={(e) => {
          setPassword(generatePassword(passwordLength))
        }}>Generate</button>

        <button
          onClick={() => dispatch(addPassword({ name, password }))}
        >Save</button>
      </div>

      <div>
        <p>Strength Score: {passwordStrength.score}</p>
        <p>Guesses: {passwordStrength.guesses}</p>
      </div>
    </div>
  );
}

export default Password;
