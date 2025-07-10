
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AuthLayout from '../components/layout/AuthLayout';
import BrandInput from '../components/ui/BrandInput';
import BrandButton from '../components/ui/BrandButton';


const Register = () => {
    const { register, loading, error, user } = useAuth();
    const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [formError, setFormError] = useState(null);
    const [fieldError, setFieldError] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (user && token) {
            navigate('/dashboard', { replace: true });
        }
    }, [user, navigate]);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        if (!form.name) {
            errors.name = 'Name is required';
        }
        if (!form.email) {
            errors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            errors.email = 'Invalid email address';
        }
        if (!form.password) {
            errors.password = 'Password is required';
        }
        if (!form.password_confirmation) {
            errors.password_confirmation = 'Please confirm your password';
        } else if (form.password !== form.password_confirmation) {
            errors.password_confirmation = 'Passwords do not match';
        }
        return errors;
    };

   


    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError(null);
        const errors = validate();
        setFieldError(errors);
        if (Object.keys(errors).length > 0) return;
        await register(form, navigate);
    };

    return (
        <AuthLayout>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-6 w-full max-w-md mx-auto px-2 md:px-0"
            >
                <h2 className="text-3xl font-extrabold text-brand-primary mb-6 text-center tracking-tight">Create your account</h2>
                {(formError || error) && <div className="text-red-600 text-sm text-center">{formError || error}</div>}
                <BrandInput
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    
                    autoFocus
                    error={ fieldError.name}
                />
                <BrandInput
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    
                    error={ fieldError.email}
                />
                <BrandInput
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    
                    error={ fieldError.password}
                />
                <BrandInput
                    type="password"
                    name="password_confirmation"
                    placeholder="Confirm Password"
                    value={form.password_confirmation}
                    onChange={handleChange}
                    
                    error={ fieldError.password_confirmation}
                />

                <BrandButton loading={loading} label={loading ? 'Registering...' : 'Register'} />

                <div className="text-center mt-2">
                    <span className="text-sm text-gray-700">Already have an account? </span>
                    <Link to="/login" className="text-brand-primary font-semibold hover:underline">Sign in</Link>
                </div>
            </form>
        </AuthLayout>
    );
};

export default Register;
