// Logout component
const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        localStorage.removeItem('userRole');
        navigate('/Login');
    };

    return (
        <button onClick={handleLogout}>
            Logout
        </button>
    );
};

export default Logout;