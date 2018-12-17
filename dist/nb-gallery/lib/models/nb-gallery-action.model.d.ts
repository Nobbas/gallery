export interface INbGalleryAction {
    icon: string;
    disabled?: boolean;
    titleText?: string;
    onClick: (event: Event) => void;
}
export declare class NbGalleryAction implements INbGalleryAction {
    icon: string;
    disabled?: boolean;
    titleText?: string;
    onClick: (event: Event) => void;
    constructor(action: INbGalleryAction);
}
