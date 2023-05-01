import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SpotifyService {
  private async getAccessToken(): Promise<string> {
    // Coloque suas credenciais do Spotify aqui
    const clientId = 'b1cba10854f845bab9318eeecc9b071a';
    const clientSecret = '95466a6d2fa14966be927d3f8c55ef9a';

    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${Buffer.from(
            `${clientId}:${clientSecret}`,
          ).toString('base64')}`,
        },
      },
    );

    return response.data.access_token;
  }

  public async searchPlaylist(query: string): Promise<any> {
    const accessToken = await this.getAccessToken();

    const response = await axios.get(
      `https://api.spotify.com/v1/search?q=${encodeURIComponent(
        query,
      )}&type=playlist&limit=1`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    if (
      response.data &&
      response.data.playlists &&
      response.data.playlists.items &&
      response.data.playlists.items.length > 0
    ) {
      const playlist = response.data.playlists.items[0];

      const tracksResponse = await axios.get(playlist.tracks.href, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const tracks = tracksResponse.data.items.map((item) => ({
        name: item.track.name,
        artist: item.track.artists.map((artist) => artist.name).join(', '),
        link: item.track.external_urls.spotify,
      }));

      return {
        name: playlist.name,
        tracks,
      };
    }

    return null;
  }
}
