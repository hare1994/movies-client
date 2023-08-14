import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'descriptionFormat'
})
export class DescriptionFormatPipe implements PipeTransform {
  transform(value: string | undefined): string {
    if (!value) {
      return '';
    }

    // Remove <br>, <b>, </b> tags and other chars
    const sanitizedValue = value.replace(/<br>|<b>|<\/b>|#|&|;/gi, '');

    // Break after dot
    const transformedValue = sanitizedValue.replace(/\./g, '.\n');

    return transformedValue;
  }
}
