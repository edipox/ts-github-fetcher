import axios, { AxiosResponse } from 'axios';

export class GitHubClient {
  private apiUrl: string;

  constructor() {
    this.apiUrl = 'https://api.github.com';
  }

  async getPullRequest(owner: string, repo: string, prNumber: number): Promise<any> {
    try {
      const url = `${this.apiUrl}/repos/${owner}/${repo}/pulls/${prNumber}`;
      const response: AxiosResponse = await axios.get(url);

      // Extract and return the pull request data
      return response.data;
    } catch (error) {
      // console.error(`Error fetching pull request #${prNumber}:`, error.message);
      throw error;
    }
  }

  async getPullRequests(owner: string, repo: string, prIds: number[]) {
    // const pullRequests: any[] = [];

    try {
      for (const prId of prIds) {
        const pullRequest = await this.getPullRequest(owner, repo, prId);
        console.log(pullRequest);
        // pullRequests.push(pullRequest);
      }
    } catch (error) {
      // Handle any errors that occurred during the fetch
      // console.error('Error fetching pull requests:', error.message);
      throw error;
    }

    // return pullRequests;
  }
}
