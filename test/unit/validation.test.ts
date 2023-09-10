import { validateParameters } from "../../src/services/validation";

describe('validateParameters', () => {
    it('should return null when all parameters are valid', () => {
        const result = validateParameters('2023-09-01', '2023-09-10', 'asc');
        expect(result).toBeNull();
    });

    it('should return an error message for invalid "from" parameter', () => {
        const result = validateParameters('', '2023-09-10', 'asc');
        expect(result).toBe('Invalid parameter: from');
    });

    it('should return an error message for invalid "to" parameter', () => {
        const result = validateParameters('2023-09-01', '', 'asc');
        expect(result).toBe('Invalid parameter: to');
    });

    it('should return an error message for invalid "sort" parameter', () => {
        const result = validateParameters('2023-09-01', '2023-09-10', 'invalidSort');
        expect(result).toBe('Invalid parameter: sort');
    });

    it('should return an error message for invalid date format in "from" parameter', () => {
        const result = validateParameters('2023-09-40', '2023-09-10', 'asc');
        expect(result).toBe('Invalid parameter format: from');
    });

    it('should return an error message for invalid date format in "to" parameter', () => {
        const result = validateParameters('2023-09-01', '2023-09-40', 'asc');
        expect(result).toBe('Invalid parameter format: to');
    });

    it('should return an error message for "to" before "from" parameter', () => {
        const result = validateParameters('2023-09-10', '2023-09-01', 'asc');
        expect(result).toBe('The start date must be before the end date.');
    });
});
