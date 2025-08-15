import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export const InteractiveBadge = ({ children }: { children: ReactNode }) => {
    return (
        <motion.div
            className="relative overflow-hidden z-1 min-w-[180px] text-center inline-flex items-center gap-2 bg-gray-900/80 border border-gray-800 rounded-full px-6 py-1.5 mb-6 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {children}
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-full opacity-0 hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-400" />
            </div>
        </motion.div>
    );
};