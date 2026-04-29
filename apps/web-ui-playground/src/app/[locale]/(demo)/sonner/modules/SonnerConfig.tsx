'use client';

import { Button, message, notification } from '@skyroc/web-ui';

const SonnerConfig = () => {
  return (
    <div className="flex-c gap-4">
      <p className="text-muted-foreground text-sm">
        Configure message and notification defaults before opening new toasts.
      </p>

      <div className="flex flex-wrap gap-3">
        <Button
          variant="plain"
          onClick={() => {
            message.config({ duration: 1500, maxCount: 2, position: 'top-center' });
            message.success('Message config applied');
          }}
        >
          Message Config
        </Button>

        <Button
          variant="plain"
          onClick={() => {
            notification.config({ closeButton: true, duration: 0, maxCount: 2, position: 'top-right' });
            notification.info({
              title: 'Notification config applied',
              description: 'This notification stays until you close it.'
            });
          }}
        >
          Notification Config
        </Button>

        <Button
          variant="plain"
          onClick={() => {
            message.destroy();
            notification.destroy();
          }}
        >
          Destroy All
        </Button>
      </div>
    </div>
  );
};

export default SonnerConfig;
