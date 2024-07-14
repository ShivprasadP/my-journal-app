import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
    return (
        <div className="bg-gray-800 text-white px-8 py-4">
            <p className='text-xl mb-6'>Journaling: a personal journey of growth and self-discovery.</p>

            <div className="flex flex-row gap-6 mb-6">
                <FontAwesomeIcon icon={faGithub} size='2xl' />
                <FontAwesomeIcon icon={faLinkedin} size='2xl' />
            </div>

            <div className="flex justify-center items-center gap-28 border-2 rounded-xl p-4 mb-6">
                <div className='border-2 border-gray-800 p-4 rounded-xl w-80'>
                    <p className='font-bold pb-2 underline underline-offset-4'>Solutions</p>
                    <p className='indent-4'>Web Development</p>
                    <p className='indent-4'>Android Development</p>
                    <p className='indent-4'>Design</p>
                </div>
                <div className='border-2 border-gray-800 p-4 rounded-xl w-80'>
                    <p className='font-bold pb-2 underline underline-offset-4'>Company</p>
                    <p className='indent-4'>About</p>
                    <p className='indent-4'>Contact</p>
                    <p className='indent-4'>Partners</p>
                </div>    
                <div className='border-2 border-gray-800 p-4 rounded-xl w-80'>
                    <p className='font-bold pb-2 underline underline-offset-4'>Legal</p>
                    <p className='indent-4'>Terms of Service</p>
                    <p className='indent-4'>Privacy Policy</p>
                    <p className='indent-4'>Cookie Policy</p>
                </div>
            </div>

            <div className="justify-center">
                <p className='text-center'>© 2024 SoftwareHolic. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Footer;