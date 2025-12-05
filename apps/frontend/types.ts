import { LucideIcon } from 'lucide-react';

export interface NavItem {
  label: string;
  path: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
  details?: string[];
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  text: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
  company: string;
  role?: string;
  service: string;
  source_page: string;
  created_at: Date;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialService?: string;
}
