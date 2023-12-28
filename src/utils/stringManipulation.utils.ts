export const extractString = (input: string | string[] | undefined): string => {
    if (input === undefined) {
      return '';  
    }
  
    if (Array.isArray(input)) {
      return input.join(' ');
    }
  
    return input.replace(/[^a-zA-Z0-9\s]/g, '');
  };