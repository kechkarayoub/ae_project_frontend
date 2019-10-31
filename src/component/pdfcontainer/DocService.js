import {reactLocalStorage} from 'reactjs-localstorage';
import{ savePDF } from '@progress/kendo-react-pdf';
const current_langue = reactLocalStorage.get('current_langue');
class DocService{
    createPdf = (html, filename) =>{
        savePDF(html,{
            paperSize: 'A4',
            fileName: filename || (current_langue === "en" ? 'Property.pdf' : "Propriété.pdf"),
            margin: 3
        })
    }
    printPdf = (html) =>{
        var myWindow = window.open('', 'PRINT', 'height=400,width=600');
        myWindow.document.write('<html><head><title>' + document.title  + '</title>');
        myWindow.document.write("<style>" +
            "#property_details_to_print{" +
                "float: inherit; width: 860px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header{" +
                "float: left; height: auto; margin-left: 0px; margin-top: 0px; margin-bottom: 0px; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .contact_card{" +
                "border: solid 1px #333333; color: #000; float: left; font-family: Arial, Helvetica, sans-serif;" +
                "font-size: 11px; height: 130px; margin: 0px; margin-right: 12px; padding: 0px; width: 616px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data{" +
                "color: #000; font-family: 'Arial', Helvetica, sans-serif;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .full-name," +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .agency-name{" +
                "font-size: 16px; font-weight: bold; text-align: center;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .agency-name{" +
                "font-size: 14px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .address," +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .email," +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .tel," +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .fax{" +
                "float: left; font-size: 12px; line-height: 8px; text-align: center; margin-bottom: 2px; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .address svg," +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .email svg," +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .tel svg," +
            "#property_details_to_print .property_details_to_print-header .contact_card .realtor-data .fax svg{" +
                "margin-right: 10px; width: 1.125em;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .contact_card .title{" +
                "background-color: #666666; color: #ffffff; font-size: 14px; font-weight: bold; text-align: center;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .property_id{" +
                "border: solid 1px #333333; border-radius: 12px; float: left;" +
                "font-family: 'Times New Roman', Times, serif; font-size: 18px; height: 130px; margin: 0px;" +
                "position: relative; width: 228px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-header .property_id div{" +
                "color: #555555; left: 50%; position: absolute; text-align: center; top: 50%;" +
                "transform: translate(-50%, -50%); width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .title{" +
                "border-bottom-color: #666; border-bottom-style: solid; border-bottom-width: 2px;" +
                "border-top-color: #666; border-top-style: solid; border-top-width: 2px; color: #CC0033; float: left;" +
                "font-family: 'Times New Roman', Times, serif; font-size: 24px; font-weight: bold; height: auto;" +
                "margin-bottom: 10px; margin-left: 0px; margin-top: 20px; padding-bottom: 2px; padding-top: 2px;" +
                "text-align: center; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .address_price{" +
                "display: flex; flex-wrap: wrap; float: left; height: auto; margin-bottom: 15px; margin-left: 0px;" +
                "margin-top: 0px; padding: 0px; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .address_price .address," +
            "#property_details_to_print .property_details_to_print-content .address_price .price{" +
                "font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .address_price .address{" +
                "color: #000; text-align: left; width: 70%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .address_price .price{" +
                "color: #C03; text-align: right; width: 30%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information{" +
                "display: flex; margin-bottom: 15px; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .image_maps," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .card_maps{" +
                "border: 1px solid; height: 300px; padding: 10px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .image_maps{" +
                "margin-right: 1%; width: 39%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .image_maps .image_map{" +
                "height: 240px; margin: 20px 0; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .card_maps{" +
                "width: 60%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .card_maps .static_map{" +
                "height: 100%; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .card_maps .static_map img{" +
                "height: 100%; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_map-information .card_maps.full_width{" +
                "width: 80%; margin: 0 10%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information{" +
                "display: flex; margin-bottom: 15px; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_description{" +
                "border-right: 6px solid #999; width: 60%; padding-right: 10px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_description .d_title{" +
                "border-bottom: 1px solid #8A8A8A; border-top: 1px solid #8A8A8A; float: left; font-size: 15px;" +
                "font-weight: bold; height: auto; margin-bottom: 10px; padding: 2px; text-align: left;" +
                "text-decoration: none; text-transform: uppercase; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_description .description{" +
                "margin-bottom: 20px; margin-top: 0px; text-align: justify;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information{" +
                "padding-left: 10px; width: 40%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .d_title{" +
                "border-bottom: 1px solid #8A8A8A; border-top: 1px solid #8A8A8A; float: left; font-size: 15px;" +
                "font-weight: bold; height: auto; margin-bottom: 10px; padding: 2px; text-align: left;" +
                "text-decoration: none; text-transform: uppercase; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_short_description," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_type," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .item_status," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .building_type," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_construction_age," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_lot_size," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_dining_room," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_fireplace," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_swimming_pool," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garden," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garage{" +
                "display: flex; margin-bottom: 10px; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_short_description .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_type .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .item_status .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .building_type .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_construction_age .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_lot_size .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_dining_room .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_fireplace .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_swimming_pool .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garden .key," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garage .key{" +
                "color: #6B3038; font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold;" +
                "margin-bottom: -1px; margin-right: 5px; margin-top: 0px; padding: 0px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_short_description .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_type .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .item_status .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .building_type .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_construction_age .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_lot_size .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_dining_room .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_fireplace .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_swimming_pool .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garden .value," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garage .value{" +
                "font-size: 13px;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number .value svg," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_bedrooms_number .value svg," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_dining_room .value svg," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_fireplace .value svg," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_swimming_pool .value svg," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garden .value svg," +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_information .property_general_information .property_has_garage .value svg{" +
                "width: 1em;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_photos{" +
                "margin-bottom: 15px; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_photos .p_title{" +
                "border-bottom: 1px solid #8A8A8A; ;border-top: 1px solid #8A8A8A; float: left; font-size: 15px;" +
                "font-weight: bold; height: auto; margin-bottom: 10px; padding: 2px; text-align: left;" +
                "text-decoration: none; text-transform: uppercase; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_photos .photos{" +
                "display: flex; flex-wrap: wrap; justify-content: start; width: 100%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_photos .photos .property_photo{" +
                "margin: 7px 1%; width: 31.33%;" +
            "}" +
            "#property_details_to_print .property_details_to_print-content .property_details_to_print_photos .photos .property_photo .photo{" +
                "height: 180px; width: 100%;" +
            "}" +
        "</style>");
        myWindow.document.write('</head><body >');
        myWindow.document.write(html.innerHTML);
        myWindow.document.write('</body></html>');
        myWindow.document.close(); // necessary for IE >= 10
        myWindow.focus(); // necessary for IE >= 10*/
        myWindow.print();
        myWindow.close();
        return true;
    }
}

const Doc = new DocService();
export default Doc;