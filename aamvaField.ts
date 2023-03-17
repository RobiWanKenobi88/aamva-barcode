/**
 * Describes AAMVA Data Fields which have an elementID and elementData
 * @prop {string} #elementID - 3 letter string corresponding to an AAMVA elementID
 * @prop {string | number} #elementData - string or integer data associated with an AAMVA element
 */

class AAMVA_Field {
    elementID;
    elementData;

 /**
  * 
  * @param {string} id - 3 letter string corresponding to an AAMVA element ID
  */   
    constructor(id) {
        this.elementID = id;
    }

/**
 * 
 * @param {string} id - 3 letter string corresponding to an AAMVA element ID 
 * @param {string | number} data - string or integer data associated with an AAMVA data element
 */
    constructor(id, data) {
        this.elementID = id;
        this.elementData = data;
    }

 /**
  * Returns elementID
  * @returns {string} 
  */   
    getElementID() {
        return this.elementID;
    }

/**
 * Takes a number or string and assigns it to #elementData. If the input is a number it is first
 * converted into a string.
 * @param {string | number} data - string or integer data associated with an AAMVA data element
 */
    const setElementData = (data: string) => void {
        
    }

/**
 * Returns string #elementData
 * @returns {string} #elementData
 */   
    getElementData() {
        return this.elementData;
    }
}
export {AAMVA_Field};
