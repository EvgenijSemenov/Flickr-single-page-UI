import { Content } from './content';

export class Photo {

  constructor(
    public id: string,
    public title: string,
    public description: Content,
    public url_sq: string,
    public dateupload: string,
    public dateuploaded: string,
    public originalformat: string
  ){ }

}
