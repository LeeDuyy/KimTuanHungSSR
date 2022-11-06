import { INestedLink } from './link';

export interface IMobileMenuLink extends INestedLink {
    type: 'link' | 'button' | 'template' | 'divider';
    data?: any;
}

export type IMobileMenu = IMobileMenuLink[];
