import {formated_select_options, is_empty, is_valid_email} from "../utils";
const options = [
    ["", "Select city"],
    ["abbotsford", "Abbotsford"],
    ["acton_vale", "Acton Vale"]
]
const options_with_sold = [
    ["sold", "Sold"],
    ["abbotsford", "Abbotsford"],
    ["acton_vale", "Acton Vale"]
]
describe('Test function: formated_select_options', () => {
    it("Valid format", () => {
        expect(formated_select_options([])).toEqual([]);
        expect(formated_select_options([], false)).toEqual([]);
        expect(formated_select_options([], true)).toEqual([
            {value: "", label: "Select"}
        ]);
        expect(formated_select_options(options)).toEqual([
            {value: "", label: "Select city"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options(options, true)).toEqual([
            {value: "", label: "Select"},
            {value: "", label: "Select city"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options(options_with_sold)).toEqual([
            {value: "sold", label: "Sold"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options(options_with_sold, true)).toEqual([
            {value: "", label: "Select"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options()).toEqual([]);
        expect(formated_select_options(null, true)).toEqual([
            {value: "", label: "Select"}
        ]);
    });
    it("Invalid format", () => {
        expect(formated_select_options([])).not.toEqual([{}]);
        expect(formated_select_options([], false)).not.toEqual([{}]);
        expect(formated_select_options([], true)).not.toEqual([]);
        expect(formated_select_options(options)).not.toEqual([
            {value: "value", label: "Select city"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options(options, true)).not.toEqual([
            {value: "", label: "Select city"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options(options_with_sold)).not.toEqual([
            {value: "", label: "Select"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options(options_with_sold, true)).not.toEqual([
            {value: "sold", label: "Sold"},
            {value: "abbotsford", label: "Abbotsford"},
            {value: "acton_vale", label: "Acton Vale"}
        ]);
        expect(formated_select_options(null, true)).not.toEqual([]);
    });
});

describe('Test function: is_empty', () => {
    it("Return true", () => {
        expect(is_empty("")).toBe(true);
    });
    it("Return false", () => {
        expect(is_empty("bla bla bla")).toBe(false);
    });
});

describe('Test function: is_valid_email', () => {
    it("Return true", () => {
        expect(is_valid_email("test@example.com")).toBe(true);
    });
    it("Return false", () => {
        expect(is_valid_email("")).toBe(false);
        expect(is_valid_email("testexamplecom")).toBe(false);
        expect(is_valid_email("test@exa mple.com")).toBe(false);
        expect(is_valid_email("testexample.com")).toBe(false);
        expect(is_valid_email("test@examplecom")).toBe(false);
    });
});