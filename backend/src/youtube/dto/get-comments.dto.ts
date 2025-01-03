import { IsNotEmpty, IsString } from 'class-validator';

export class GetCommentsDto {
  @IsString()
  @IsNotEmpty()
  videoId: string;
}
