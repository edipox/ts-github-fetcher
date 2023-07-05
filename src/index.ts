import { GitHubClient } from './githubClient';
import { performance } from 'perf_hooks';

async function fetchPullRequests() {
  const githubClient = new GitHubClient();
  const owner: string = 'rails';
  const repo: string = 'rails';
  const prIds: number[] = [48447, 48353, 48272];

  try {
    const pullRequests = await githubClient.getPullRequests(owner, repo, prIds);
    console.log('Pull Requests:', pullRequests);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error(error);
  }
}

async function benchmark(func: () => void) {
  // Calculate time elapsed
  const startTime = performance.now();
  await func();
  const endTime = performance.now();
  const elapsedTime = endTime - startTime;
  console.log('Elapsed Time:', elapsedTime, 'ms');

  // Measure memory usage
  const memoryUsage = process.memoryUsage();
  console.log('Memory Usage:');
  console.log('  - RSS:', convertBytesToMB(memoryUsage.rss), 'MB');
  console.log('  - Heap Total:', convertBytesToMB(memoryUsage.heapTotal), 'MB');
  console.log('  - Heap Used:', convertBytesToMB(memoryUsage.heapUsed), 'MB');
}

function convertBytesToMB(bytes: number): number {
  return Math.round(bytes / 1024 / 1024 * 100) / 100;
}

benchmark(fetchPullRequests);
