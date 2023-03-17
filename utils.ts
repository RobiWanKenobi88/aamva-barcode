import { aamvaField, createAamvaField, aamvaFieldCollection } from 'src/aamva.ts';


/**
 * 
 * @param {string} state - Two-letter state abbreviation
 * @returns {number} - 6-digit IIN number for the given state
 */
 const IIN = function(state: string): string {
    if(state.length !== 2) 
        throw new Error("State must be a 2 letter abbreviation");
    else {
       const listOfIINs: {[key: string]: string} = {"AL":636033,"AK":636059,"AZ": 636026,"AR": 636021,"CA": 636014,"CO": 636020,"CT": 636006,"DC": 636043,"DE": 636011,"FL": 636010,"GA": 636055,"HI": 636047,"ID": 636050,"IL": 636035,"IN": 636037,"IA": 636018,"KS": 636022,"KY": 636046,"LA": 636007,"ME": 636041,"MD": 636003,"MA": 636002,"MI": 636032,"MN": 636038,"MS": 636051,"MO": 636030,"MT": 636008,"NE": 636054,"NV": 636049,"NH": 636039,"NJ": 636036,"NM": 636009,"NY": 636001,"NC": 636004,"ND": 636034,"OH": 636023,"OK": 636058,"OR": 636029,"PA": 636025,"RI": 636052,"SC": 636005,"SD": 636042,"TN": 636053,"TX": 636015,"UT": 636040,"VT": 636024,"VA": 636000,"WA": 636045,"WV": 636061,"WI": 636031,"WY": 636060};
        
       if(!listOfIINs[state.toUpperCase])
            throw new Error('${state} is not a valid state.');
        else return listOfIINs[state.toUpperCase];
    }

}

interface color {
    name: string;
    code: string;
}

const eyeColorList: Array<color> = [
    { name: 'black', code: 'BLK' },
    { name: 'blue', code: 'BLU' },
    { name: 'brown', code: 'BRO' },
    { name: 'grey', code: 'GRY' },
    { name: 'green', code: 'GRN' },
    { name: 'hazel', code: 'HAZ' },
    { name: 'maroon', code: 'MAR' },
    { name: 'pink', code: 'PNK' },
    { name: 'dichromatic', code: 'DIC' },
    { name: 'unknown', code: 'UNK' },
];

const hairColorList: Array<color> = [
    { name: 'bald', code: 'BAL' },
    { name: 'black', code: 'BLK' },
    { name: 'blond', code: 'BLN' },
    { name: 'grey', code: 'GRY' },
    { name: 'red', code: 'RED' },
    { name: 'auburn', code: 'RED' },
    { name: 'sandy', code: 'SND' },
    { name: 'white', code: 'WHI' },
    { name: 'unknown', code: 'UNK' },
];

const colorCode = (colorList: Array<color>, color: string): string => {
    const colorName = color.toLowerCase();
    const foundColor = colorList.find(c => c.name.toLowerCase() === colorName);
    if (foundColor) {
        return foundColor.code;
    } else {
        console.error(`${color} is not a valid color. Color code was assigned to 'unknown'.`);
        return 'UNK';
    }
}

const eyeColorCode = (color: string) => {
    return colorCode(eyeColorList, color);
}


const hairColorCode = (color: string) => {
    return colorCode(hairColorList, color);
}

function formatZipCode(zip: string): string {
    const fiveDigitRegex = /^\d{5}$/;
    const nineDigitRegex = /^\d{9}$/;
  
    if (fiveDigitRegex.test(zip)) {
      return zip + "0000";
    } else if (nineDigitRegex.test(zip)) {
      return zip;
    } else {
      const cleanedZip = zip.replace(/[-\s]/g, "");
      if (nineDigitRegex.test(cleanedZip)) {
        return cleanedZip;
      } else {
        throw new Error("Invalid zip code format");
      }
    }
}

function formatGender(gender: string): string {
    const lowerCaseGender = gender.toLowerCase;
    if(lowerCaseGender === 'male')
        return '1';
    else if(lowerCaseGender === 'female')
        return '2';
    else return '3';
}

function formatHeight(feet: string, inches: string): string {
    const ft = Number(feet);
    const inch = Number(inches);
    if (isNaN(ft) | isNaN(inch))
        throw new Error("${feet} or ${inches} is not a number");
    else return '0' + (ft * 12 + inch) + ' in';

}

function formatWeight(weight: string): string {
    const numberValue = Number(weight);
    if(isNaN(numberValue) | numberValue > 999)
        throw new Error("${weight} is not a valid number!");
    else if(numberValue < 100)
        return '0' + numberValue;
    else return numberValue;
}

function resultOrUndefined<T>(flag: boolean, func: () => T): T | undefined {
    if (flag) {
      return func();
    } else {
      return undefined;
    }
  }

