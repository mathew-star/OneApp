import { LucideIcon } from "lucide-react";
import { ReactNode } from "react"

//Features
export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
  highlight: string;
  stats: string;
}

export interface VisionBlock {
  key: string;
  title: string;
  subtitle: string;
  description: string;
  icon: ReactNode;
  delay: number;
}


// Mission 
export interface MissionPoint {
  id: number
  icon: LucideIcon
  title: string
  description: string
  detail: string
  color: string
}

export interface MissionCardProps {
  mission: MissionPoint;
  index: number;
  isActive: boolean;
  onHover: (index: number | null) => void;
}


export interface MissionScrollStackProps {
  children: React.ReactNode;
  itemClassName?: string;
}

export interface ScrollStackProps {
  className?: string;
  children: React.ReactNode;
  itemDistance?: number;
  stackEffect?: boolean;
}


export interface SurveyCategory {
  title: string;
  subtitle: string;
  icon: string;
  description: string;
  formUrl: string;
}