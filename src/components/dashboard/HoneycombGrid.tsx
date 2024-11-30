import styled from 'styled-components';
import { Project } from '@/types/project';
import { HoneycombProject } from './HoneycombProject';

interface HoneycombGridProps {
  projects: Project[];
}

const HoneycombWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem 0;
`;

const HoneycombContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 1200px;
  margin-left: -52px;
  transform: translateY(26px);

  @media (max-width: 640px) {
    margin-left: -26px;
  }
`;

const HoneycombCell = styled.div<{ delay: number }>`
  flex: 0 1 250px;
  max-width: 250px;
  height: 216px;
  margin: 26px 52px 26px 0;
  position: relative;
  padding: 0.5em;
  text-align: center;
  z-index: 1;
  animation: fadeIn 0.5s ease-in-out backwards;
  animation-delay: ${props => props.delay}s;

  &::before,
  &::after,
  .content {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: hsl(var(--background));
    transform-origin: center;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    transition: opacity 0.3s;
  }

  &::before {
    background: hsl(var(--border));
    transform: scale(1.055);
  }

  &::after {
    background: hsl(var(--background));
    opacity: 0.5;
    transition: opacity 0.3s;
  }

  &:hover::after {
    opacity: 0;
  }

  .content {
    background: hsl(var(--background));
    color: hsl(var(--foreground));
    z-index: 2;
    padding: 0.5em;
  }

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scale(0.8);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (max-width: 640px) {
    margin: 26px 26px 26px 0;
  }
`;

export function HoneycombGrid({ projects }: HoneycombGridProps) {
  return (
    <HoneycombWrapper>
      <HoneycombContainer>
        {projects.map((project, index) => (
          <HoneycombCell key={project.id} delay={index * 0.1}>
            <HoneycombProject project={project} />
          </HoneycombCell>
        ))}
      </HoneycombContainer>
    </HoneycombWrapper>
  );
}