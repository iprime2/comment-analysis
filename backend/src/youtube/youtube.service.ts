import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';
import { GetCommentsDto } from './dto/get-comments.dto';
import { IYoutubeService, YoutubeComment } from './interfaces/youtube-service.interface';

@Injectable()
export class YoutubeService implements IYoutubeService {
  private readonly apiKey = process.env.YOUTUBE_API_KEY;
  // private readonly baseUrl = 'https://www.googleapis.com/youtube/v3';
  private readonly baseUrl = process.env.YOUTUBE_API_URL;
  // private readonly djangoApiUrl = 'http://127.0.0.1:8000/api/v1/comments/analyze/';
  private readonly djangoApiUrl = process.env.AI_BACKEND_API_URL;

  async fetchComments(videoId: GetCommentsDto): Promise<YoutubeComment[]> {
    const url = `${this.baseUrl}/commentThreads`;
    try {
      const youtubeResponse = await axios.get(url, {
        params: {
          part: 'snippet',
          videoId,
          key: this.apiKey,
          maxResults: 50,
        },
      });

      const comments = youtubeResponse.data.items.map((item): YoutubeComment => ({
        commentId: item.id,
        text: item.snippet.topLevelComment.snippet.textDisplay,
        author: item.snippet.topLevelComment.snippet.authorDisplayName,
        publishedAt: item.snippet.topLevelComment.snippet.publishedAt,
      }));
      const response = await axios.post(`${this.djangoApiUrl}/comments/analyze/`, { comments });
      return response.data.sentiment;
      // return comments;
    } catch (error) {
      throw new HttpException(
        `Failed to fetch comments: ${error.response?.data?.error?.message || error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
