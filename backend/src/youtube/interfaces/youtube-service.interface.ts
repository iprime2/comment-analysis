import { GetCommentsDto } from "../dto/get-comments.dto";

export interface YoutubeComment {
    commentId: string;
    text: string;
    author: string;
    publishedAt: string;
  }
  
export interface IYoutubeService {
  fetchComments(videoId: GetCommentsDto): Promise<YoutubeComment[]>;
}

export const IYoutubeService = Symbol("IYoutubeService");