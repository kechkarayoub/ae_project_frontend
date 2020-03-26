export const fakeGlobalParams = {
    realtor_data: {
        full_name: "Fake name",
        agency_name: "Agency Name",
        address: "address",
        email: "fakeaddress@yopmail.com",
        tel: "xxxxxxxxxx",
        fax: "xxxxxxxxxx",
        position: {
            gps_latitude: 35.50866990,
            gps_longitude: -33.55399250,
        }
    },
    selects_choices: {
        CITIES: [
            ["", "Select city"],
            ["abbotsford", "Abbotsford"],
            ["acton_vale", "Acton Vale"],
            ["airdrie", "Airdrie"],
            ["alma", "Alma"],
            ["amos", "Amos"],
            ["amqui", "Amqui"],
            ["armstrong", "Armstrong"],
            ["asbestos", "Asbestos"],
            ["baie_comeau", "Baie-Comeau"]
        ],
        PROPERTIES_TYPES: [
            ["", "Select property type"],
            ["apartment", "Apartment"],
            ["duplex", "Duplex"],
            ["quadruplex", "Quadruplex"],
            ["quintuplex", "Quintuplex"],
            ["ground_floor_house", "Ground floor house"],
            ["two_or_more_storey", "Two or more storey"],
            ["split_level", "Split-level"],
            ["one_and_a_half_storey_house", "One-and-a-half-storey house"],
            ["mobile_home", "Mobile home"]
            ],
        BUILDINGS_TYPES: [
            ["", "Select building type"],
            ["detached", "Detached"],
            ["semi_detached", "Semi detached"],
            ["attached", "Attached"],
            ["attached_corner_unit", "Attached corner unit"],
            ["quadrex", "Quadrex"],
            ["5plex", "5 plex and more"],
        ],
        BEDROOMS_NUMBER: [
            ["", "Select bedrooms number"],
            ["1", "1"],
            ["2", "2"],
            ["3", "3"],
            ["4", "4"],
            ["5_", "5 and more"],
        ],
        BATHROOMS_NUMBER: [
            ["", "Select bathrooms number"],
            ["1", "1"],
            ["2", "2"],
            ["3_", "3 and more"],
        ],
        CONSTRUCTION_AGE: [
            ["", "Select construction age"],
            ["newly_built", "Newly built"],
            ["10_years_and_less", "10 years and less"],
            ["more_than_10_years", "More than 10 years"],
        ],
        ITEMS_STATUS: [
            ["for_sale", "For sale"],
            ["for_rent", "For rent"],
            ["sold", "Sold"],
        ],
        PRICES_RANGES: [
            ["", "Not specified"],
            ["0_200", "Less than 200 000$"],
            ["200_300", "200 000$ - 300 000$"],
            ["300_400", "300 000$ - 400 000$"],
            ["400_500", "400 000$ - 500 000$"],
            ["500_1000", "More than 500 000$"],
        ]
    },
    selects_choices_dict: {
        CITIES: {
            "": "Select city",
            "abbotsford": "Abbotsford",
            "acton_vale": "Acton Vale",
            "airdrie": "Airdrie",
            "alma": "Alma",
            "amos": "Amos",
            "amqui": "Amqui",
            "armstrong": "Armstrong",
            "asbestos": "Asbestos",
            "baie_comeau": "Baie-Comeau"
        },
        PROPERTIES_TYPES: {
            "": "Select property type",
            "apartment": "Apartment",
            "duplex": "Duplex",
            "quadruplex": "Quadruplex",
            "quintuplex": "Quintuplex",
            "ground_floor_house": "Ground floor house",
            "two_or_more_storey": "Two or more storey",
            "split_level": "Split-level",
            "one_and_a_half_storey_house": "One-and-a-half-storey house",
            "mobile_home": "Mobile home"
        },
        BUILDINGS_TYPES: {
            "": "Select building type",
            "detached": "Detached",
            "semi_detached": "Semi detached",
            "attached": "Attached",
            "attached_corner_unit": "Attached corner unit",
            "quadrex": "Quadrex",
            "5plex": "5 plex and more"
        },
        BEDROOMS_NUMBER: {
            "": "Select bedrooms number",
            "1": "1",
            "2": "2",
            "3": "3",
            "4": "4",
            "5_": "5 and more"
        },
        BATHROOMS_NUMBER: {
            "": "Select bathrooms number",
            "1": "1",
            "2": "2",
            "3_": "3 and more"
        },
        CONSTRUCTION_AGE: {
            "": "Select construction age",
            "newly_built": "Newly built",
            "10_years_and_less": "10 years and less",
            "more_than_10_years": "More than 10 years"
        },
        ITEMS_STATUS: {
            "for_sale": "For sale",
            "for_rent": "For rent",
            "sold": "Sold"
        },
        PRICES_RANGES: {
            "": "Not specified",
            "0_200": "Less than 200 000$",
            "200_300": "200 000$ - 300 000$",
            "300_400": "300 000$ - 400 000$",
            "400_500": "400 000$ - 500 000$",
            "500_1000": "More than 500 000$"
        }
    },
    is_maps_active: true,
    footer_params: {
        socialLinks: [{
            label: "Facebook",
            url: "https://www.facebook.com",
            fa_icon: "facebook"
        },{
            label: "Linkedin",
            url: "https://www.linkedin.com",
            fa_icon: "linkedin"
        }],
        site_name: "Site name",
        site_url_root: "http://localhost:3000"
    }
}

export const fakeHeaderParams = {
    realtor_data: {
        full_name: "Fake name",
        agency_name: "Agency Name",
        address: "address",
        email: "fakeaddress@yopmail.com",
        tel: "xxxxxxxxxx",
        fax: "xxxxxxxxxx",
        position: {
            gps_latitude: 35.50866990,
            gps_longitude: -33.55399250,
        }
    },
    langue_label: "Français",
    langue_url: "http://localhost:3000",
    i18n: true
}

export default class GlobalParamsService{
    async getGlobalParams() {
        return await new Promise(resolve => {
            resolve(fakeGlobalParams);
        });
    }
}
