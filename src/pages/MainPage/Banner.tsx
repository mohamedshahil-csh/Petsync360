import React, { useState } from 'react';
import heroPet from '../../assets/Images/pet-Banner.png';
import paw from '../../assets/Images/pets.jpg';
import dog1 from '../../assets/Images/dog1.jpg';
import dog2 from '../../assets/Images/dog2.jpg';
import WaveText from '../../components/WebPageContent/WaveText';
import LeadingWaveText from '../../components/WebPageContent/LeadingWaveText';
import petGif from '../../assets/Gifs/petsyncBanner1.gif';
import LoginModal from '../Auth/LoginModal';
import apiClient from '../../services/apiClient';
import { API_ENDPOINTS } from '../../routes/apiEndpoints';
import { Link, useNavigate } from 'react-router-dom';


const Banner: React.FC = () => {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden pt-16 sm:pt-20">
            <img
                src={petGif}
                alt="Animated Pet Hero"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

export default Banner;