import React, { useState } from 'react';
import heroPet from '../../assets/Images/pet-home.png';
import paw from '../../assets/Images/pets.jpg';
import dog1 from '../../assets/Images/dog1.jpg';
import dog2 from '../../assets/Images/dog2.jpg';
import WaveText from '../../components/WebPageContent/WaveText';
import LeadingWaveText from '../../components/WebPageContent/LeadingWaveText';
import petGif from '../../assets/Gifs/dogs-20159.gif';
import LoginModal from '../Auth/LoginModal';
import apiClient from '../../services/apiClient';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import { Link, useNavigate } from 'react-router-dom';

const floatingIcons = [
    { src: paw, pos: 'top-[5%]  left-[65%]' },
    { src: dog1, pos: 'top-[35%] right-[-6%]' },
    { src: dog2, pos: 'bottom-[10%] right-[10%]' },
    { src: paw, pos: 'bottom-[-8%] left-[50%]' },
    { src: dog1, pos: 'bottom-[10%] left-[10%]' },
    { src: dog2, pos: 'top-[40%]  left-[-6%]' },
    { src: paw, pos: 'top-[5%]   left-[20%]' },
];

interface LoginResponse {
    token: string;
}

interface AuthInfo {
    id: number;
    name: string;
    username: string;
    email: string;
    mobile: string;
    role: string;
    profileImage: string;
    timezone: { id: number; country_code: string; zone_name: string };
    // …add the other fields you need
}

interface AuthData {
    info: AuthInfo;
    token: string;
    token_expiration_time: number;
}

interface ApiResponse<T> {
    code: number;
    message: string;
    data: T;
}

const Home: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const handleLogin = async (
        e: React.FormEvent,
        username: string,
        password: string,
        role: string
    ) => {
        e.preventDefault();

        try {
            const res: ApiResponse<AuthData> = await apiClient(API_ENDPOINTS.AUTHENTICATE, {
                method: 'POST',
                body: { username, password, role },
            });

            // Grab the token from the right place
            const { token, token_expiration_time } = res.data;

            localStorage.setItem('token', token);
            localStorage.setItem('token_expiration', token_expiration_time.toString());

            console.log('JWT saved ➜', token);
            closeModal();
            navigate('/AddAppointment');
        } catch (err: any) {
            console.error(err);
            throw new Error(err.message || 'Login failed');
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden pt-16 sm:pt-20">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full max-w-7xl items-center">
                <div className="px-2 sm:px-4 text-center md:text-left">
                    <h1 className="text-2xl mt-6 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-[#ed2c59] drop-shadow-md">
                        <LeadingWaveText text="All Animals, Great or Small —" />
                        <br />
                        <span className="text-white">Care That Covers It All</span>
                    </h1>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-md sm:max-w-lg mx-auto md:mx-0">
                        Discover a world where <span className="text-[#ed2c59] font-semibold inline-block animate-pulseRing ">Pets Come First</span>. From grooming and training to healthy
                        treats and stylish accessories,
                        <h1 className="text-2xl sm:text-1xl md:text-2xl lg:text-2xl xl:text-2xl font-extrabold leading-tight text-white drop-shadow-md">
                            <strong className='text-[#ed2c59]'><WaveText text="PetSync360" /></strong>   is your trusted hub for everything pawsome!
                        </h1>
                    </p>
                    <div className="mt-4 sm:mt-6 flex justify-center md:justify-start gap-4 relative z-10">
                        <button
                            onClick={openModal}
                            className="bg-[#ed2c59] hover:bg-pink-700 text-white px-8 sm:px-12 md:px-16 py-2 sm:py-3 rounded-2xl shadow-xl text-sm sm:text-base transition duration-300"
                        >
                            Book Appointment
                        </button>
                    </div>
                </div>
                <div className="relative flex justify-center items-center mt-6 md:mt-0">
                    <div className="absolute inset-0 pointer-events-none z-0">
                        {floatingIcons.map(({ src, pos }, i) => (
                            <img
                                key={i}
                                src={src}
                                alt=""
                                className={`absolute ${pos} w-10 sm:w-12 md:w-14 lg:w-16 rounded-full object-cover shadow-lg animate-[pop_4s_ease-in-out_infinite]`}
                                style={{ animationDelay: `${i * 0.35}s` }}
                            />
                        ))}
                    </div>
                    <div
                        className="relative z-10 w-[500px] sm:w-[560px] md:w-[620px] aspect-square rounded-full overflow-hidden ring-4 ring-white shadow-xl"
                    >
                        <img
                            src={petGif}
                            alt="Animated Pet Hero"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </div>
            <LoginModal isOpen={isModalOpen} onClose={closeModal} onLogin={handleLogin} />
        </div>
    );
};

export default Home;