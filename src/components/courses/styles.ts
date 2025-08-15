import { motion } from 'framer-motion';
import styled from '@emotion/styled';

export const CourseCardContainer = styled(motion.div)`
  position: relative;
  isolation: isolate;
  perspective: 1000px;
  will-change: transform;
  
  .course-content {
    transform-style: preserve-3d;
    transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: 0 8px 25px -10px rgba(0, 0, 0, 0.2);
  }
  
  &:hover {
    .course-content {
      transform: translateY(-6px) rotateX(4deg) scale(1.02);
      box-shadow: 0 15px 35px -10px rgba(255, 69, 0, 0.25);
    }
    
    .play-icon {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1) rotate(0deg);
    }
    
    .course-image {
      transform: scale(1.06);
    }
    
    .course-icon {
      transform: scale(1.2) rotate(10deg);
      background: linear-gradient(135deg, #ff8a00, #ff0058);
    }
  }
`;

export const InteractiveBadgeContainer = styled(motion.div)`
  position: relative;
  overflow: hidden;
  z-index: 1;
  min-width: 180px;
  text-align: center;
  
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 136, 0, 0.2) 0%, rgba(255, 0, 88, 0.2) 100%);
    border-radius: inherit;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  &:hover::before {
    opacity: 1;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -50%;
    left: -60%;
    width: 200%;
    height: 200%;
    background: linear-gradient(
      to bottom right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0) 45%,
      rgba(255, 255, 255, 0.25) 50%,
      rgba(255, 255, 255, 0) 55%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: rotate(30deg);
    animation: shine 4s infinite;
  }
  
  @keyframes shine {
    0% { transform: translateX(-100%) rotate(30deg); }
    20% { opacity: 1; }
    100% { transform: translateX(100%) rotate(30deg); opacity: 0; }
  }
`;