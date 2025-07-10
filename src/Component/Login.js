// import React, { useState } from "react";
// import "../Css/Login.css";
// import { Link, useHistory } from "react-router-dom";

// function Login(){    
//     return (
//         <div className="login">
//             <Link to="/">
//             <img
//             className="login__logo"
//             src="../images/Walmart_black.jpg"
//             />
//             </Link>
//         <div className="login__container">
//             <h1>Sign-In</h1>
//             <form>
//             <h5>Email</h5>
//             <input
//             type="text"
//             aria-required
//         />

//           <h5>Password</h5>
//           <input
//             type="password"
//             aria-required
//           />
//           <Link to ="/">
//             <button
//               className="login__signInButton"
//               type="submit"
//               >
//               Sign In
//             </button>
//           </Link>

//           <p>
//             By signing in you agree the Terms and Conditions of the Walmart fake
//             clone. Please see our privacy notice and out cookies policy
//           </p>
//           <button className="login__registerButton">
//             Create your Walmart account
//           </button>
//         </form>
//       </div>
//     </div>
// );
// }

// export default Login;

import React, { useState } from "react";
import "../Css/Login.css";
import { Link, useHistory } from "react-router-dom";

function Login(){    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (
        <div className="login">
            <div className="login__header">
                <Link to="/">
                    <img
                        className="login__logo"
                        src="../images/walmart_logo.png"
                        alt="Walmart"
                    />
                </Link>
            </div>
            
            <div className="login__container">
                <div className="login__form-container">
                    <h1>Sign in to your account</h1>
                    <p className="login__subtitle">
                        Enter your email address and password to access your account
                    </p>
                    
                    <form>
                        <div className="login__input-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="login__input"
                                placeholder="Enter your email"
                            />
                        </div>

                        <div className="login__input-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="login__input"
                                placeholder="Enter your password"
                            />
                        </div>
                        
                        <div className="login__options">
                            <div className="login__remember">
                                <input type="checkbox" id="remember" />
                                <label htmlFor="remember">Keep me signed in</label>
                            </div>
                            <Link to="/forgot-password" className="login__forgot">
                                Forgot your password?
                            </Link>
                        </div>

                        <Link to="/">
                            <button
                                className="login__signInButton"
                                type="submit"
                            >
                                Sign In
                            </button>
                        </Link>
                    </form>
                    
                    <div className="login__divider">
                        <span>or</span>
                    </div>
                    
                    <div className="login__social">
                        <button className="login__social-button">
                            <span className="login__social-icon">📱</span>
                            Continue with Phone
                        </button>
                        <button className="login__social-button">
                            <span className="login__social-icon">🌐</span>
                            Continue with Google
                        </button>
                    </div>
                    
                    <div className="login__create-account">
                        <p>Don't have an account?</p>
                        <Link to="/register">
                            <button className="login__registerButton">
                                Create account
                            </button>
                        </Link>
                    </div>
                </div>
                
                <div className="login__benefits">
                    <h3>Why create an account?</h3>
                    <ul>
                        <li>✓ Fast, easy checkout</li>
                        <li>✓ Save multiple shipping addresses</li>
                        <li>✓ Access your order history</li>
                        <li>✓ Track new orders</li>
                        <li>✓ Save items to your Wish List</li>
                    </ul>
                </div>
            </div>
            
            <div className="login__footer">
                <p>
                    By continuing, you agree to Walmart's{' '}
                    <Link to="/terms">Terms of Use</Link> and{' '}
                    <Link to="/privacy">Privacy Policy</Link>.
                </p>
            </div>
        </div>
    );
}

export default Login;