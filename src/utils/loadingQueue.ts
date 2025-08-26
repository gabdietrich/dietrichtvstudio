// Simple semaphore for staggered loading to avoid network burst
let inflight = 0;
const MAX_CONCURRENT = 2;

export async function gatedLoad<T>(fn: () => Promise<T>): Promise<T> {
  // Wait for slot to be available
  while (inflight >= MAX_CONCURRENT) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  inflight++;
  try {
    return await fn();
  } finally {
    inflight--;
  }
}

export function resetLoadingQueue() {
  inflight = 0;
}
