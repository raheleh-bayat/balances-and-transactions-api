import moment from "moment";


export function validateParameters(from: string | undefined, to: string | undefined, sort: string | undefined): string | null {
    // Handle the case when 'from' parameter is undefined or empty
    if (from == undefined || from.trim() == "") {
        console.error('Validation Error: Invalid parameter: from');
        return "Invalid parameter: from";
    }

    // Handle the case when 'to' parameter is undefined or empty
    if (to == undefined || to.trim() == "") {
        console.error('Validation Error: Invalid parameter: to');
        return "Invalid parameter: to";
    }

    // Handle the case when 'sort' parameter is neither 'desc' nor 'asc'
    if (sort != 'desc' && sort != 'asc') {
        console.error('Validation Error: Invalid parameter: sort');
        return "Invalid parameter: sort";
    }

    //Handle the case when 'from' parameter is not a valid date
    if (!moment(from, "YYYY-MM-DD", true).isValid()) {
        console.error('Validation Error: Invalid parameter format: from');
        return "Invalid parameter format: from";
    }

    // Handle the case when 'to' parameter is not a valid date
    if (!moment(to, "YYYY-MM-DD", true).isValid()) {
        console.error('Validation Error: Invalid parameter format: to');
        return "Invalid parameter format: to";
    }

    // Handle the case when 'to' parameter is before 'from' parameter
    if (moment(to).isBefore(moment(from))) {
        console.error('Validation Error: The start date must be before the end date.');
        return "The start date must be before the end date."
    }

    return null;
}
