import { useEffect } from 'react';
import anime from 'animejs';

export const generateParticles = (count: number) => {
    const particles = [];
    for (let i = 0; i < count; i++) {
        particles.push({
            id: i,
            size: Math.random() * 6 + 3,
            x: Math.random() * 100,
            y: Math.random() * 100,
            delay: Math.random() * 5,
            duration: Math.random() * 15 + 15
        });
    }
    return particles;
};

export const FloatingParticles = () => {
    const particles = generateParticles(20);

    useEffect(() => {
        particles.forEach(particle => {
            anime({
                targets: `.particle-${particle.id}`,
                translateX: [0, anime.random(-40, 40)],
                translateY: [0, anime.random(-40, 40)],
                duration: particle.duration * 1000,
                delay: particle.delay * 1000,
                direction: 'alternate',
                loop: true,
                easing: 'easeInOutSine'
            });
        });
    }, []);

    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className={`absolute particle particle-${particle.id}`}
                    style={{
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: Math.random() * 0.6 + 0.3,
                        background: 'rgba(255, 69, 0, 0.12)',
                        borderRadius: '50%'
                    }}
                />
            ))}
        </div>
    );
};