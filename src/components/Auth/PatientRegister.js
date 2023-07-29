import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';


const PatientRegister = ({successfulRegister ,handleSuccessfulRegister }) => {
  
    const apiUrl = process.env.REACT_APP_API_URL;
  const corsUrl = process.env.REACT_APP_CORS_URL;

  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [doorNo, setDoorNo] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [pincode, setPincode] = useState('');
  const [gender, setGender] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
 
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleRegister = async () => {
    try {
            const patientData = {
                patientName: name,
                patientAge: age,
                patientEmail: email,
                patientPassword: password,
                patientPhone: phone,
                patientGender: gender,
                patientAddress: {
                    doorNo: doorNo,
                    street: street,
                    city: city,
                    state: state,
                    country: country,
                    pincode: pincode,
                },
                // You can add other patient properties here if needed
                profilePictureUrl: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
            };
    
            const response = await fetch(`${corsUrl}/${apiUrl}/patients/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(patientData),
            });

      if (response.ok) {
        setSuccess("Registration successful. Please login to continue.")
        handleSuccessfulRegister();
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('An error occurred during registration.');
    }
  };

  useEffect(() => {
    // Check if registration was successful
    if (successfulRegister) {
      // Redirect to the login page after a delay (e.g., 2 seconds)
      const redirectTimeout = setTimeout(() => {
        handleSuccessfulRegister();
      }, 2000);

      // Clean up the timeout when the component is unmounted
      return () => clearTimeout(redirectTimeout);
    }
  }, [successfulRegister, handleSuccessfulRegister]);

  return (
    <div>
      <h2>Register</h2>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="number" value={age} onChange={(e) => setAge(e.target.value)} placeholder="Age" />
      <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone" />
      <input type="text" value={doorNo} onChange={(e) => setDoorNo(e.target.value)} placeholder="Door No" />
      <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Street" />
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="City" />
      <input type="text" value={state} onChange={(e) => setState(e.target.value)} placeholder="State" />
      <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
      <input type="text" value={pincode} onChange={(e) => setPincode(e.target.value)} placeholder="Pincode" />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="">Select Gender</option>
        <option value="MALE">Male</option>
        <option value="FEMALE">Female</option>
        <option value="OTHER">Other</option>
      </select>
      <label>Profile Picture:</label>
      <input type="file" onChange={handleFileChange} />

      <button onClick={handleRegister}>Register</button>
      {success ? <div><p>{success}</p><Link to="/login">Login</Link> </div>: <p>{error}</p>}
      {/* {error && <p>{error}</p>} */}
    </div>
  );
}

export default PatientRegister;
