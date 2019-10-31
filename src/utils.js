export const is_empty = (value) => {
    return !value.toString().trim().length;
};

export const is_valid_email = (value) => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(value).toLowerCase());
};

export const formated_select_options = (options, update) => {
    var formated_options = [];
    if (!options) {
        options = [];
    }
    if(update){
        formated_options.push({
            value: "",
            label: "Select"
        });
        options.map(option => {
            if(option[0] != "sold"){
                formated_options.push({
                    value: option[0],
                    label: option[1]
                });
            }
        });
    }
    else{
        options.map(option => {
            formated_options.push({
                value: option[0],
                label: option[1]
            });
        });
    }
    return formated_options;
}