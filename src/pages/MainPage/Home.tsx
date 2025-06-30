import React, { useState, useEffect } from 'react';
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
import { motion, AnimatePresence } from 'framer-motion';

const floatingIcons = [
    { src: paw, pos: 'top-[5%] left-[65%]', animation: 'float' },
    { src: dog1, pos: 'top-[35%] right-[-6%]', animation: 'pulse' },
    { src: dog2, pos: 'bottom-[10%] right-[10%]', animation: 'bounce' },
    { src: paw, pos: 'bottom-[-8%] left-[50%]', animation: 'float' },
    { src: dog1, pos: 'bottom-[10%] left-[10%]', animation: 'bounce' },
    { src: dog2, pos: 'top-[40%] left-[-6%]', animation: 'pulse' },
    { src: paw, pos: 'top-[5%] left-[20%]', animation: 'bounce' },
];

interface AuthInfo {
    id: number;
    name: string;
    username: string;
    email: string;
    mobile: string;
    role: string;
    profileImage: string;
    timezone: { id: number; country_code: string; zone_name: string };
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
    const [isHovering, setIsHovering] = useState(false);
    const navigate = useNavigate();
    const [service_providers, setService_Providers] = useState<any>(null);
    console.log("service_providers", service_providers)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [provider, setProvider] = useState<any[]>([]);
    console.log("provider", provider)
    const [parents, setParents] = useState<any[]>([]);
    console.log("parents", parents)
    const [pets, setPets] = useState<any[]>([]);
    console.log("pets", pets)


    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);


    useEffect(() => {
        async function fetchDashboardAndAppointments() {
            setLoading(true);
            setError(null);
            try {

                const fetchProviders = await apiClient(`v1/resource/provider/all`, { method: "GET" }) as any;
                setProvider(fetchProviders?.data?.providers?.length);
                const fetchParents = await apiClient(`v1/resource/patients/all`, { method: "GET" }) as any;
                const parents = fetchParents.data.patients?.length;
                setParents(parents);
                const fetchServiceProvider = await apiClient(`v1/resource/ServiceProvider/all`, { method: "GET" }) as any;
                const service_providers = fetchServiceProvider.data.service_providers?.length;
                setService_Providers(service_providers)
                const fetchPets = await apiClient(`v1/resource/pets/all`, { method: "GET" }) as any;
                const pets = fetchPets.data.pets[0]?.length;
                setPets(pets)


            } catch (err: any) {
                setError(err.message || "Failed to load data");
            } finally {
                setLoading(false);
            }
        }
        fetchDashboardAndAppointments();
    }, []);


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

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut" as const
            }
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center overflow-hidden pt-16 sm:pt-20 relative">
            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute rounded-full opacity-10"
                    />
                ))}
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 w-full max-w-7xl items-center px-4 sm:px-6"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <motion.div
                    className="px-2 sm:px-4 text-center md:text-left relative z-10"
                    variants={itemVariants}
                >
                    <h1 className="text-2xl mt-6 sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-[#ed2c59] drop-shadow-md">
                        <LeadingWaveText text="All Animals, Great or Small," />
                        <br />
                        <span className="text-white ">Care That Covers It All</span>
                    </h1>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-md sm:max-w-lg mx-auto md:mx-0">
                        Discover a world where Pets Come First. From grooming and training to healthy
                        treats and stylish accessories,
                        <h1 className="text-2xl sm:text-1xl md:text-2xl lg:text-2xl xl:text-2xl font-extrabold leading-tight text-white drop-shadow-md">
                            <strong className='text-pink-200'><WaveText text="PetSync360" /></strong> is your trusted hub for everything pawsome!
                        </h1>
                    </p>
                    {/* Statistics Cards */}
                    <motion.div
                        className="mt-6 sm:mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 justify-center md:justify-start"
                        variants={itemVariants}
                    >
                        <motion.div
                            className="animate-wave bg-white/10 backdrop-blur-md rounded-xl p-4 text-center shadow-lg border border-white/20"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg sm:text-xl font-bold text-[#ed2c59]">{provider ?? 0}+ </h3>
                            <p className="text-sm sm:text-base text-white animate-wave">Doctors</p>
                        </motion.div>
                        <motion.div
                            className="animate-wave bg-white/10 backdrop-blur-md rounded-xl p-4 text-center shadow-lg border border-white/20"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg sm:text-xl font-bold text-[#ed2c59]">{parents ?? 0}+ </h3>
                            <p className="text-sm sm:text-base text-white animate-wave">Parents</p>
                        </motion.div>
                        <motion.div
                            className="animate-wave bg-white/10 backdrop-blur-md rounded-xl p-4 text-center shadow-lg border border-white/20"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                        >
                            <h3 className="text-lg sm:text-xl font-bold text-[#ed2c59]">{service_providers ?? 0}+ </h3>
                            <p className="text-sm sm:text-base text-white animate-wave">Service Providers</p>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="mt-8 sm:mt-10 flex justify-center md:justify-start gap-4 relative z-10"
                        variants={itemVariants}
                    >
                        <motion.button
                            onClick={openModal}
                            className="block sm:block md:hidden lg:hidden relative overflow-hidden bg-gradient-to-r from-[#ed2c59] to-pink-600 hover:from-pink-600 hover:to-[#ed2c59] text-white px-8 sm:px-12 md:px-16 py-3 sm:py-4 rounded-2xl shadow-xl text-sm sm:text-base font-semibold transition-all duration-300 group"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 10px 25px -5px rgba(237, 44, 89, 0.4)"
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <span className="relative z-10">Book Appointment</span>
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
                        </motion.button>
                    </motion.div>
                </motion.div>

                <motion.div
                    className="relative flex justify-center items-center mt-6 md:mt-0"
                    variants={itemVariants}
                >
                    <div className="absolute inset-0 pointer-events-none z-0">
                        {floatingIcons.map(({ src, pos, animation }, i) => (
                            <motion.img
                                key={i}
                                src={src}
                                alt=""
                                className={`absolute ${pos} w-12 sm:w-14 md:w-16 lg:w-20 rounded-full object-cover shadow-lg`}
                                animate={
                                    animation === 'float' ? {
                                        y: [0, -15, 0],
                                        rotate: [0, 5, -5, 0],
                                    } :
                                        animation === 'pulse' ? {
                                            scale: [1, 1.1, 1],
                                        } :
                                            animation === 'bounce' ? {
                                                y: [0, -20, 0],
                                            } :
                                                {
                                                    rotate: [0, 360],
                                                }
                                }
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    repeatType: 'loop',
                                    ease: 'easeInOut',
                                    delay: i * 0.3
                                }}
                            />
                        ))}
                    </div>
                    <motion.div
                        className="relative z-10 w-[300px] sm:w-[400px] md:w-[500px] aspect-square rounded-full overflow-hidden ring-4 ring-white/50 shadow-2xl"
                        whileHover={{ scale: 1.02 }}
                        animate={{
                            boxShadow: [
                                '0 0 20px rgba(237, 44, 89, 0.3)',
                                '0 0 30px rgba(237, 44, 89, 0.4)',
                                '0 0 20px rgba(237, 44, 89, 0.3)'
                            ]
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            repeatType: 'reverse',
                            ease: 'easeInOut'
                        }}
                    >
                        <img
                            src={petGif}
                            alt="Animated Pet Hero"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/30"></div>
                    </motion.div>
                </motion.div>
            </motion.div>
            <motion.div
                onClick={openModal}
                className="fixed bottom-8 right-8 z-50 hidden md:block lg:block"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
            >
                <a
                    href="#cta"
                    className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
                >
                    <span>Book Appointment</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                </a>
            </motion.div>


            <LoginModal isOpen={isModalOpen} onClose={closeModal} onLogin={handleLogin} />
        </div>
    );
};

export default Home;