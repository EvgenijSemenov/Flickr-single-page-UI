import { Content } from "./content";
import { PrimaryPhotoExtras } from "./primary-photo-extras";


export class Photoset {

    constructor(
        public id: string,
        public photos: number,
        public videos: number,
        public title: Content,
        public description: Content,
        public date_create: string,
        public date_update: string,
        public primary_photo_extras: PrimaryPhotoExtras
    ){}

}
