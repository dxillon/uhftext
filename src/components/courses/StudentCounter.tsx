import { useEffect, useState } from 'react';
import { Users, BarChart2 } from 'lucide-react';

export const useStudentCounter = () => {
    const [count, setCount] = useState(() => {
        const savedCount = localStorage.getItem('studentCount');
        return savedCount ? parseInt(savedCount) : 10;
    });

    useEffect(() => {
        const getIncrement = (currentCount: number) => {
            if (currentCount < 100) return 1;
            if (currentCount < 1000) return 2;
            if (currentCount < 10000) return 3;
            return 4;
        };

        const getDelay = (currentCount: number) => {
            if (currentCount < 100) return 3000;
            if (currentCount < 1000) return 5000;
            if (currentCount < 10000) return 8000;
            return 12000;
        };

        const updateCounter = () => {
            setCount((prev) => {
                const increment = getIncrement(prev);
                const newCount = prev + increment;
                localStorage.setItem('studentCount', newCount.toString());
                return newCount;
            });
        };

        const timer = setInterval(updateCounter, getDelay(count));
        return () => clearInterval(timer);
    }, [count]);

    return count;
};

export const StudentCounter = ({ count }: { count: number }) => {
    const [satisfactionRate, setSatisfactionRate] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const startTime = Date.now();

        const animateRate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const currentRate = Math.floor(progress * 97);
            setSatisfactionRate(currentRate);

            if (progress < 1) {
                requestAnimationFrame(animateRate);
            }
        };

        animateRate();
    }, []);

    return (
        <div className="flex items-center justify-center gap-2 text-gray-400 text-sm sm:text-base mb-6">
            <Users className="w-5 h-5 text-orange-500" />
            <span>{count.toLocaleString()}+ students enrolled</span>
            <BarChart2 className="w-5 h-5 text-green-500 ml-3" />
            <span>{satisfactionRate}% satisfaction rate</span>
        </div>
    );
};
