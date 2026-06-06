import type { ContactMethod } from '@/types';
import whatsappIcon from '../assets/whatsapp.svg';
import emailIcon from '../assets/email.svg';
import linkedinIcon from '../assets/linkedin.svg';
import githubIcon from '../assets/github.svg';
import discordIcon from '../assets/discord.svg';
import instagramIcon from '../assets/instagram.svg';

export const CONTACT_METHODS: ContactMethod[] = [
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    value: '+62 812-9034-8433',
    href: 'https://wa.me/628129034433',
    icon: whatsappIcon,
  },
  {
    id: 'email',
    label: 'Email',
    value: 'firmannafis90@gmail.com',
    href: 'mailto:firmannafis90@gmail.com',
    icon: emailIcon,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    value: 'linkedin.com/in/muhammadfirmannafis',
    href: 'https://linkedin.com/in/muhammadfirmannafis',
    icon: linkedinIcon,
  },
  {
    id: 'github',
    label: 'GitHub',
    value: 'github.com/runnrobbot',
    href: 'https://github.com/runnrobbot',
    icon: githubIcon,
  },
  {
    id: 'discord',
    label: 'Discord',
    value: 'CoreAvis',
    href: 'https://discord.com/users/CoreAvis',
    icon: discordIcon,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    value: 'firman.nafis',
    href: 'https://instagram.com/firman.nafis',
    icon: instagramIcon,
  },
];
