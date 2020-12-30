export class Product{

    id:number;
    name:string;
    category:string;
    qtyAvailable:number;
    imgFile:string;
    rating:number;
    price:number;
    description:string;
    videoFile:string;

    constructor(id:number,name:string,imgFile:string,rating:number,description:string,videoFile:string,category:string,qtyAvailable:number){
        this.id = id;
        this.name = name;
        this.category = category;
        this.qtyAvailable = qtyAvailable;
        this.imgFile = imgFile;
        this.rating = rating;
        this.description = description;
        this.videoFile = videoFile;
    }


}