export interface INbGalleryAction {
    icon: string;
    disabled?: boolean;
    titleText?: string;

    onClick: (event: Event) => void;
}

export class NbGalleryAction implements INbGalleryAction {
    icon: string;
    disabled?: boolean;
    titleText?: string;

    onClick: (event: Event) => void;

    constructor(action: INbGalleryAction) {
        this.icon = action.icon;
        this.disabled = action.disabled ? action.disabled : false;
        this.titleText = action.titleText ? action.titleText : '';

        this.onClick = action.onClick;
    }
}
