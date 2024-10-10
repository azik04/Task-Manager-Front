import React, { useState } from 'react'; 
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import Photo from '../Photos/MXM_ADRA_Logotype_January_2018_Color.png';
import Shape from '../Photos/Shape.svg';
import { useNavigate } from 'react-router-dom';

const LogIn = () => {
    const [user, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); 
    const [errors, setErrors] = useState({}); 
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const fetchPost = async () => {
        setError('');
        setErrors({}); 

        try {
            const res = await axios.post(`http://test.loc/api/User/login`, {
                userName: user,
                password: password
            }, { withCredentials: true });

            console.log('Cavab:', res.data); 

            if (res.data.statusCode === 200) {
                const token = res.data.data; 
                localStorage.setItem("JWT", token);

                const decodedToken = jwtDecode(token);
                const userId = decodedToken.UserId; 

                localStorage.setItem("UserId", userId);
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem("JWT")}`;

                console.log('Giriş müvəffəqiyyətlidir');
                navigate(`/Theme`);
            } else {
                setError(res.data.Description || 'Giriş alınmadı.'); 
            }
        } catch (error) {
            console.error('Giriş alınmadı', error.response);
            const errorMessage = error.response?.data?.description ;
            setError(errorMessage);

            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    return (
        <section className="login">
            <div className="login-left">
                <img src={Photo} alt="Sol Fon" />
            </div>
            <div className="login-right">
                <div className="login-right-main">
                    <h2>Giriş</h2>
                    {error && <div className="error">{error}</div>}
                    <div className="login-right-main-inp">
                        <input 
                            type="text" 
                            placeholder="E-mail" 
                            value={user}
                            onChange={(e) => setUserName(e.target.value)} 
                            required
                        />
                        <img src={Shape} alt="E-mail İkonu" />
                    {errors.UserName && <span className='error'>{errors.UserName[0]}</span>} 
                    </div>
                    
                    <div className="login-right-main-inp">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Şifrə" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            required
                        />
                        <i 
                            className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} 
                            onClick={() => setShowPassword(!showPassword)}
                            style={{ cursor: 'pointer' }} 
                        ></i>
                    {errors.Password && <span className='error'>{errors.Password[0]}</span>} 
                    </div>
                    
                    <button onClick={fetchPost}>İrəlilə</button>
                </div>
            </div>
        </section>
    );
};

export default LogIn;
