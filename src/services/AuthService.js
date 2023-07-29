import { useState} from "react";

const AuthService = () => {
    const apiUrl = "http://localhost:8081/api/v1";
    const [loggedIn, setLoggedIn] = useState(false);

    const login = async(email, password) => {
        try{
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
            };
            const response = await fetch(`${apiUrl}/login?email=${email}&password=${password}`, requestOptions);
            if(response.status === 200){

                const data = await response.json();
                // sessionStorage.setItem("authToken", data.token);
                setLoggedIn(true);
                return data;
            } else{
                throw new Error("Authentication failed");
            }
        } catch(err){
            console.log(err);
        }
    }

    const logout = () => {
        setLoggedIn(false);
    }

}