import { Button, Drawer, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import '../styles/header.scss';
import { useAppStore, useRocketStore } from '../store/app.store';
import toast from 'react-hot-toast';

const Header = () => {
    const [opened, { close }] = useDisclosure(false);
    const navigate = useNavigate();

    const token = useAppStore((state) => state.token);
    const setToken = useAppStore((state) => state.setToken);
    const clearLaunchDetails = useAppStore((state) => state.clearLaunchDetails);
    const clearRocketDetails = useRocketStore((state) => state.clearRocketDetails);

    const handleLogin = () => {
        navigate('/login');
    };

    const handleLogo = () => {
        if (token) {
            navigate('/resources')
        }
    }

    const handleLogout = () => {
        setToken('');
        clearLaunchDetails();
        clearRocketDetails();
        navigate('/');
        toast.success("You have successfully logged out.")
    };

    const renderLinks = () => {
        if (!token) {
            return (
                <Button variant="outline" onClick={handleLogin}>
                    Login
                </Button>
            );
        }

        return (
            <Button className='button' variant="outline" onClick={handleLogout}>
                Logout
            </Button>
        );
    };

    return (
        <header className="header">
            <Group position="apart">
                <div className='title' onClick={handleLogo}>SpaceX</div>
                <Group>
                    <Drawer opened={opened} onClose={close} title="Menu">
                        {renderLinks()}
                    </Drawer>
                    {!opened && renderLinks()}
                </Group>
            </Group>
        </header>
    );
};

export default Header;
