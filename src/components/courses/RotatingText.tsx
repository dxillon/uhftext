import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Edit3, User, Award, Users } from 'lucide-react';

const rotatingTexts = [
    { text: "Interactive Learning", icon: <Zap className="w-4 h-4 text-orange-500" /> },
    { text: "Hands-on Projects", icon: <Edit3 className="w-4 h-4 text-orange-500" /> },
    { text: "Expert Instructors", icon: <User className="w-4 h-4 text-orange-500" /> },
    { text: "Real-world Skills", icon: <Award className="w-4 h-4 text-orange-500" /> },
    { text: "Community Support", icon: <Users className="w-4 h-4 text-orange-500" /> }
];

export const RotatingText = () => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <motion.div
                key={`icon-${currentTextIndex}`}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                {rotatingTexts[currentTextIndex].icon}
            </motion.div>
            <motion.span
                key={`text-${currentTextIndex}`}
                className="text-sm text-orange-400 font-medium"
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
            >
                {rotatingTexts[currentTextIndex].text}
            </motion.span>
        </>
    );
};