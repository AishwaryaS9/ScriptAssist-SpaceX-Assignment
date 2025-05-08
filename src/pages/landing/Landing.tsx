import { FC } from 'react';
import { Button, Container, Overlay, Text, Title } from "@mantine/core";
import { useNavigate } from 'react-router-dom';
import '../../styles/landing.scss';

const Landing: FC = () => {
	const navigate = useNavigate();

	const handleLogin = () => {
		navigate('/login');
	};

	return (
		<div className="hero">
			<div className="hero-logo">SpaceX</div>
			<Overlay
				gradient="linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, .65) 40%)"
				opacity={1}
				zIndex={0}
			/>
			<Container className="container" size="md">
				<Text className="subtitle">NAVIGATE THE UNIVERSE</Text>
				<Title className="title">Start Exploring Infinite Space</Title>
				<Text className="description" size="xl" mt="xl">
					Start your exploration in space, navigate and discover all the wonders of the universe.
				</Text>

				<Button size="lg" radius="xl" className="control" onClick={handleLogin}>
					Get started
				</Button>
			</Container>
		</div>
	);
};

export default Landing

