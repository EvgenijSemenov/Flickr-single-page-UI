import { Content } from "./content";
import { PrimaryPhotoExtras } from "./primary-photo-extras";


export class Photoset {

    constructor(
        id: string,
        photos: number,
        videos: number,
        title: Content,
        description: Content,
        date_create: string,
        date_update: string,
        primary_photo_extras: PrimaryPhotoExtras
    ){}

}
