import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import anime from 'animejs';
import { Trophy, ChevronDown } from 'lucide-react';
import { achievements } from '../data/abt';

const AbtHero = () => {

    return (
        <div>
            {/* ==================== */}
            {/* HERO SECTION */}
            {/* ==================== */}
            <section className="relative  min-h-[100dvh] bg-black overflow-hidden flex flex-col">
                {/* Blood-red gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-black to-red-900/20 z-0"></div>

                {/* Floating red particles */}
                <div className="absolute inset-0 overflow-hidden opacity-30 z-0">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute bg-red-600 rounded-full"
                            style={{
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                width: `${Math.random() * 10 + 2}px`,
                                height: `${Math.random() * 10 + 2}px`,
                            }}
                            animate={{
                                y: [0, Math.random() * 100 - 50],
                                x: [0, Math.random() * 100 - 50],
                                opacity: [0.3, 0.8, 0.3],
                            }}
                            transition={{
                                duration: Math.random() * 20 + 10,
                                repeat: Infinity,
                                repeatType: "reverse",
                            }}
                        />
                    ))}
                </div>

                {/* Content container */}
                <div className="relative z-10 flex-1 flex flex-col justify-center items-center px-4 py-12 md:py-20">
                    {/* Title Section - Centered */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-center w-full max-w-4xl mx-auto mb-12 md:mb-20"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold text-white mb-4 md:mb-6"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                        >
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-red-300">
                                WHO WE ARE
                            </span>
                        </motion.h1>
                        <motion.p
                            className="text-lg md:text-xl text-red-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            Visionary storytellers crafting unforgettable cinematic experiences
                        </motion.p>
                    </motion.div>

                    {/* Achievements Section - Surrounding the title */}
                    <div className="w-full h-full absolute top-0 left-0 flex items-center justify-center pointer-events-none">
                        {/* Desktop - Floating achievements */}
                        <div className="hidden md:block w-full h-full relative">
                            {achievements.map((achievement, index) => {
                                // Predefined positions (2 left, 2 right)
                                const positions = [
                                    { top: '25%', left: '10%', lineSide: 'right' },  // Left top (dot on left)
                                    { top: '60%', left: '16%', lineSide: 'right' },  // Left bottom (dot on left)
                                    { top: '28%', right: '12%', lineSide: 'left' },  // Right top (dot on right)
                                    { top: '75%', right: '10%', lineSide: 'left' }   // Right bottom (dot on right)
                                ];

                                const position = positions[index % positions.length];
                                const isLeftGroup = position.left !== undefined;
                                const lineWidth = '100px'; // Increased for better proportion
                                const dotOffset = '12px'; // Space between dot and line

                                return (
                                    <motion.div
                                        key={`desktop-${index}`}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            delay: 0.6 + index * 0.15,
                                            duration: 0.6,
                                            ease: "backOut"
                                        }}
                                        className="absolute z-20 pointer-events-auto"
                                        style={{
                                            top: position.top,
                                            left: position.left,
                                            right: position.right
                                        }}
                                    >
                                        <div className="relative group flex items-center">
                                            {/* Left-side dot (for left groups) */}
                                            {isLeftGroup && (
                                                <motion.div
                                                    className="absolute w-3 h-3 bg-red-600 rounded-full z-10"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{
                                                        delay: 0.8 + index * 0.15,
                                                        duration: 0.3,
                                                        ease: "backOut"
                                                    }}
                                                    style={{
                                                        left: `-${dotOffset}`,
                                                        top: '45%',
                                                        transform: 'translateY(-50%)'
                                                    }}
                                                />
                                            )}

                                            {/* Connecting line */}
                                            <motion.div
                                                className="absolute h-0.5 bg-red-600 origin-left"
                                                initial={{ scaleX: 0 }}
                                                animate={{ scaleX: 1 }}
                                                transition={{
                                                    delay: 0.8 + index * 0.15,
                                                    duration: 0.5,
                                                    ease: "easeOut"
                                                }}
                                                style={{
                                                    width: lineWidth,
                                                    left: isLeftGroup ? 0 : 'auto',
                                                    right: isLeftGroup ? 'auto' : 0,
                                                    top: '50%',
                                                    transform: 'translateY(-50%)'
                                                }}
                                            />

                                            {/* Right-side dot (for right groups) */}
                                            {!isLeftGroup && (
                                                <motion.div
                                                    className="absolute w-3 h-3 bg-red-600 rounded-full z-10"
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    transition={{
                                                        delay: 0.8 + index * 0.15,
                                                        duration: 0.3,
                                                        ease: "backOut"
                                                    }}
                                                    style={{
                                                        right: `-${dotOffset}`,
                                                        top: '45%',
                                                        transform: 'translateY(-50%)'
                                                    }}
                                                />
                                            )}

                                            {/* Achievement box */}
                                            <motion.div
                                                className={`bg-black/80 backdrop-blur-sm p-4 rounded-lg shadow-lg shadow-red-900/10 group-hover:shadow-red-900/30 transition-all duration-300 ${isLeftGroup ? 'ml-24' : 'mr-24' // Increased margin to account for line
                                                    }`}
                                                initial={{
                                                    opacity: 0,
                                                    boxShadow: '0 0 0 0px rgba(220, 38, 38, 0)'
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    boxShadow: '0 0 0 1px rgba(220, 38, 38, 0.3)'
                                                }}
                                                transition={{
                                                    delay: 0.9 + index * 0.15,
                                                    duration: 0.5,
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <motion.div
                                                    className="flex items-center gap-2"
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        delay: 1.0 + index * 0.15,
                                                        duration: 0.3
                                                    }}
                                                >
                                                    <Trophy className="w-5 h-5 text-red-500" />
                                                    <h3 className="text-lg font-bold text-white">{achievement.title}</h3>
                                                </motion.div>
                                                <motion.p
                                                    className="text-red-300 text-sm mt-1"
                                                    initial={{ opacity: 0, y: 5 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{
                                                        delay: 1.1 + index * 0.15,
                                                        duration: 0.3
                                                    }}
                                                >
                                                    {achievement.description}
                                                </motion.p>
                                            </motion.div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Mobile - Grid achievements */}
                    <div className="md:hidden w-full px-4 mt-6">
                        <div className="grid grid-cols-2 gap-3">
                            {achievements.slice(0, 4).map((achievement, index) => (
                                <motion.div
                                    key={`mobile-${index}`}
                                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{
                                        delay: 0.4 + index * 0.1,
                                        duration: 0.35,
                                        ease: "backOut"
                                    }}
                                    className="bg-black/90 backdrop-blur-xs p-3 rounded-lg border border-red-900/30 shadow-sm shadow-red-900/5"
                                >
                                    <div className="flex items-start gap-2">
                                        {/* Trophy icon with consistent size */}
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: 0.5 + index * 0.1,
                                                duration: 0.3,
                                                ease: "backOut"
                                            }}
                                            className="flex-shrink-0"
                                        >
                                            <Trophy className="w-4 h-4 text-red-400 mt-0.5" />
                                        </motion.div>

                                        {/* Text content */}
                                        <div className="flex-1 min-w-0">
                                            <motion.h3
                                                className="text-sm font-semibold text-white leading-tight "
                                                initial={{ opacity: 0, x: -5 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{
                                                    delay: 0.6 + index * 0.1,
                                                    duration: 0.25
                                                }}
                                            >
                                                {achievement.title}
                                            </motion.h3>
                                            <motion.p
                                                className="text-[0.7rem] text-red-300/90 mt-1 leading-snug"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{
                                                    delay: 0.7 + index * 0.1,
                                                    duration: 0.3
                                                }}
                                            >
                                                {achievement.description}
                                            </motion.p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Scroll Indicator - Bottom */}
                    <motion.div
                        className="absolute bottom-6 inset-x-0 mx-auto flex flex-col items-center text-center px-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.5, duration: 0.8, ease: 'easeOut' }}
                    >
                        {/* Scroll text */}
                        <motion.p
                            className="text-sm text-white mb-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.6, duration: 0.5 }}
                        >
                            SCROLL TO EXPLORE
                        </motion.p>

                        {/* Chevron Down with bounce */}
                        <motion.div
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.7, duration: 0.5 }}
                        >
                            <motion.div
                                animate={{ y: [0, 8, 0] }}
                                transition={{
                                    delay: 1.8,
                                    repeat: Infinity,
                                    duration: 1.8,
                                    ease: "easeInOut"
                                }}
                            >
                                <ChevronDown className="w-6 h-6 text-red-500" />
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Red divider line */}
                    <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"
                        initial={{ scaleX: 0, opacity: 0 }}
                        animate={{ scaleX: 1, opacity: 1 }}
                        transition={{ delay: 1.4, duration: 1.2, ease: "easeInOut" }}
                    />

                </div>
            </section>
        </div>
    );
};

export default AbtHero;