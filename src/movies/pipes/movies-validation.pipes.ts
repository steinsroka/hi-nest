import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

export class MovieStatusValidationPipe implements PipeTransform {
  NameOptions: any;
  // 첫번째 파라미터: 처리된 인자의 값, 두번째 파라미터: 메타데이터를 포함한 객채
  // Return 값은 route 핸들러로 전해짐, 예외가 발생하면 클라이언트에 바로 전해진다.
  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isNameValid(value)) {
      throw new BadRequestException('not valid name');
    }

    return value;
  }

  private isNameValid(name: any) {
    const index = this.NameOptions.indexOf(name);
    return index !== -1;
  }
}
