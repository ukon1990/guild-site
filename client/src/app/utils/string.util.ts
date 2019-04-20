import {StringMatch} from '../models/string-match.model';

export class StringUtil {
  /* istanbul ignore next */
  public static contains(target: string, contains: string): boolean {
    if (!target || !contains) {
      return false;
    }
    return target.toLowerCase().indexOf(contains.toLowerCase()) > -1;
  }

  public static getIndexOf(target: string, valueToCheckFor: string): number {
    if (!target || !valueToCheckFor) {
      return -1;
    }
    return target.toLowerCase().indexOf(valueToCheckFor.toLowerCase());
  }

  public static matchingParts(string: string, matchingString: string): StringMatch {
    const match = new StringMatch('', '', '');
    let firstIndex = StringUtil.getIndexOf(string, matchingString);

    if (!string) {
      return match;
    }

    if (firstIndex === -1) {
      firstIndex = 0;
    }
    match.start = string.slice(0, firstIndex);

    for (let i = firstIndex, x = string.length; i < x; i++) {
      if (match.match.toLowerCase() === matchingString.toLowerCase()) {
        match.end += string[i];
      } else {
        match.match += string[i];
      }
    }
    return match;
  }

  public static isLowerCase(text: string): boolean {
    return text === text.toLowerCase() && text !== text.toUpperCase();
  }
}
