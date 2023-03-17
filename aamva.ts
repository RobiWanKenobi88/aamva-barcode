/**
 * Interface representing an AAMVA data field.
 * @interface aamvaField
 * @property {string} name - The name of the AAMVA data field.
 * @property {string} elementID - The ID of the AAMVA data field.
 * @property {string} data - The value of the AAMVA data field.
 * @property {Function} toString - A function that returns the concatenated element ID and data value in upper case.
 */
export interface aamvaField {
    name: string;
    elementID: string;
    data: string;
    toString: () => string;
  }
  
  /**
   * Creates an AAMVA data field.
   * @function createAamvaField
   * @param {String} name - The name of the AAMVA data field.
   * @param {string} elementID - The ID of the AAMVA data field.
   * @param {string} data - The value of the AAMVA data field.
   * @returns {aamvaField} - The created AAMVA data field.
   */
  export function createAamvaField(name: string, elementID: string, data: string): aamvaField {
    return {
      name: name,
      elementID: elementID,
      data: data,
      toString: () => {
        return elementID.concat(data).toUpperCase();
      }
    }
  }
  
  /**
   * Interface representing a collection of AAMVA data fields.
   * @interface aamvaFieldCollection
   * @property {aamvaField} [key: string] - A key-value pair where the key is the 
   * ID of the AAMVA data field and the value is the AAMVA data field object.
   */
  export interface aamvaFieldCollection {
    [key: string]: aamvaField;
  }
  
  export function createAamvaFieldCollection(...fields: aamvaField[]):aamvaFieldCollection {
    const collection: aamvaFieldCollection = {};
    fields.forEach((field) => {
        collection[field.name] = field;
    });
    return collection;
  }
  
  export interface aamvaHeader {
    complianceIndicator: string;
    dataElementSeparator: string;
    recordSeparator: string;
    segmentTerminator: string;
    fileType: string;
    iin: number;
    aamvaVersion: number;
    jurisdictionVersion: number;
    numberOfSubfiles: number;
}

export function createHeader(iin: number, aamvaVersion: number, jurisdictionNumber: number, numberOfSubfiles: number): aamvaHeader {
    return {
        complianceIndicator = '\x40',
        dataElementSeparator = '\x0A',
        recordSeparator = '\x1E',
        segmentTerminator = '\x0D',
        fileType = 'ANSI ',
        iin = iin,
        aamvaVersion = aamvaVersion,
        jurisdictionVersion = jurisdictionNumber,
        numberOfSubfiles = numberOfSubfiles
    }
}

export interface subfile {
    fileType: string;
    offset: (num: number) => string;
    fields: aamvaFieldCollection;
    length: () => string;
}

export function createSubfile(fileType: string, num: number, fields: aamvaFieldCollection): subfile {
    return {
        fileType: fileType,
        offset: (num) => {
            if(num > 9999)
                throw new Error("Max number of bytes exceeded. Must be less than 9999");   
            else if(num < 100)
                return '00' + num;
            else if(num < 1000)
                return '0' + num;
            else return '' + num;

        },
        fields = fields,
        length = () => {
            let str = '';
            for (const key in fields) {  
                    str = str.concat(fields[key].toString());
                }
            let bytes: number = str.length + num + 3;
            if(bytes > 9999)
                throw new Error("Max number of bytes exceeded. Must be less than 9999");
            else if(bytes < 100)
                return '00' + bytes;
            else if(bytes < 1000)
                return '0' + bytes;
            else return '' + bytes;
                
        }
    }
}


 

