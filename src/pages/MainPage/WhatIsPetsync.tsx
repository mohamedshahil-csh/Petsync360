import React from 'react';
import CardStack from '../../components/WebPageContent/Card';
import pawAnim from '../../assets/Animation/paw-animation2.json';
import Lottie from 'lottie-react';
import cornerGif from '../../assets/Gifs/cat-17978.gif';

const WhatIsPetSync = () => (
    <section className="relative bg-white py-20 px-6 md:px-12 lg:px-24 overflow-hidden">
        <div className="absolute top-0 right-0 m-4">
            <img src={cornerGif} alt="Corner GIF" className="w-20 h-20 md:w-24 md:h-24 lg:w-32 lg:h-32" />
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            {/* 🃏 LEFT – Card stack */}
            <div className="w-full lg:w-1/2 flex justify-center">
                <CardStack />
            </div>

            {/* 📄 RIGHT – Text */}
            <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 leading-tight">
                    What Is <span className="text-pink-600">PetSync 360?</span>
                </h2>

                <p className="text-gray-600 text-lg leading-relaxed">
                    <strong>PetSync 360</strong> is a smart, cloud-based care platform that
                    empowers pet parents, veterinarians, and pet businesses with digital
                    tools to track health, connect with professionals, shop essentials, and
                    manage services—anytime, anywhere.
                </p>

                <p className="text-gray-600 text-lg leading-relaxed">
                    From digital health records to IoT-based monitoring, emergency
                    teleconsultations, on-demand grooming, and training, PetSync 360
                    simplifies your responsibilities and strengthens your pet’s wellbeing.
                </p>
            </div>
        </div>
    </section>
);

export default WhatIsPetSync;