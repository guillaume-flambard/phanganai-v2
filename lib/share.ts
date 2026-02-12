import { toast } from 'sonner';

export async function share(data: { title?: string; text?: string; url?: string }) {
  try {
    if (navigator.share) {
      await navigator.share(data);
    } else {
      const shareUrl = data.url || window.location.href;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Link copied!');
    }
  } catch (err: unknown) {
    if (err instanceof Error && err.name !== 'AbortError') {
      await navigator.clipboard.writeText(data.url || window.location.href);
      toast.success('Link copied!');
    }
  }
}
