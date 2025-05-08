import { Button, Group, Image, Paper, PasswordInput, Stack, Text, TextInput, } from "@mantine/core";
import React, { useState } from "react";
import { CiLock } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import spaceship from "../../assets/images/homeImage.png";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../../store/app.store";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "../../api/authApi";
import toast from "react-hot-toast";
import "../../styles/login.scss";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const setToken = useAppStore((state) => state.setToken);
    const [error, setError] = useState("");

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const mutation = useMutation({
        mutationFn: () => loginUser(email, password),
        onSuccess: (data) => {
            if (data?.token) {
                setToken(data.token);
                toast.success("User logged in successfully");
                navigate("/resources");
            } else {
                toast.error("Login failed. Invalid email or password");
            }
        },
        onError: (error) => {
            toast.error("Failed to log in");
            console.error("Login error:", error);
        },
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateEmail(email) && !password) {
            setError("Please enter email and password");
            return;
        }
        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }
        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");
        mutation.mutate();
    };

    const handleLogo = () => {
        navigate('/');
    }

    return (

        <div className="signin-page">
            <div className="signin-logo" onClick={handleLogo}>SpaceX</div>
            <div className="signin-container">
                <div className="signin-image-container hide-on-small">
                    <Image src={spaceship} alt="SpaceX Rocket" className="signin-image" />
                </div>
                <div className="signin-form-container">
                    <Paper radius="md" p="xl" withBorder className="signin-paper" >

                        <Text size="xl" weight={600} className="signin-welcome-text">
                            Pioneering the Future of Space Travel!
                        </Text>
                        <Text size="sm" color="dimmed" className="signin-subtext">
                            Join the revolution and shape humanity's journey to the stars.
                        </Text>

                        <form onSubmit={handleLogin} className="signin-form">
                            <Stack>
                                <TextInput
                                    variant="filled"
                                    icon={<CiMail size={20} />}
                                    size="sm"
                                    placeholder="hello@example.com"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={mutation.isLoading}
                                />

                                <PasswordInput
                                    variant="filled"
                                    icon={<CiLock size={20} />}
                                    size="sm"
                                    placeholder="Your password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    disabled={mutation.isLoading}
                                />
                            </Stack>

                            <Group position="apart" mt="xl">
                                {error && <p className="error-message">
                                    {error}
                                </p>}
                                <Button
                                    size="md"
                                    type="submit"
                                    className="signin-button"
                                    disabled={mutation.isLoading}
                                >
                                    {mutation.isLoading ? "Logging in..." : "Login"}
                                </Button>
                            </Group>
                        </form>
                    </Paper>
                </div>
            </div>

        </div>
    );
};

export default Login;
