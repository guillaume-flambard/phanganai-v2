type ImpactStyle = 'light' | 'medium' | 'heavy';
type NotificationType = 'success' | 'error' | 'warning';

async function isNative(): Promise<boolean> {
  try {
    const { Capacitor } = await import('@capacitor/core');
    return Capacitor.isNativePlatform();
  } catch {
    return false;
  }
}

export const haptics = {
  async impact(style: ImpactStyle = 'light') {
    if (!(await isNative())) return;
    try {
      const { Haptics, ImpactStyle } = await import('@capacitor/haptics');
      const map = { light: ImpactStyle.Light, medium: ImpactStyle.Medium, heavy: ImpactStyle.Heavy };
      await Haptics.impact({ style: map[style] });
    } catch {}
  },

  async notification(type: NotificationType = 'success') {
    if (!(await isNative())) return;
    try {
      const { Haptics, NotificationType } = await import('@capacitor/haptics');
      const map = { success: NotificationType.Success, error: NotificationType.Error, warning: NotificationType.Warning };
      await Haptics.notification({ type: map[type] });
    } catch {}
  },

  async selection() {
    if (!(await isNative())) return;
    try {
      const { Haptics } = await import('@capacitor/haptics');
      await Haptics.selectionStart();
      await Haptics.selectionEnd();
    } catch {}
  },
};
