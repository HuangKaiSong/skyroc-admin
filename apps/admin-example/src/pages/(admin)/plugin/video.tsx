// oxlint-disable import/no-unassigned-import
import { createFileRoute } from '@tanstack/react-router';
import { Space } from 'antd';
import 'xgplayer/dist/index.min.css';
import { useEffect, useRef } from 'react';
import Player from 'xgplayer';

import { ExamplePanel, PluginPageHeader } from './modules/shared';

const videoUrl = 'https://lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo.mp4';

const VideoDemo = () => {
  const playerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!playerRef.current) return;

    const player = new Player({
      el: playerRef.current,
      fluid: true,
      playbackRate: [0.5, 0.75, 1, 1.5, 2],
      url: videoUrl
    });

    return () => {
      player.destroy();
    };
  }, []);

  return (
    <Space className="w-full" orientation="vertical" size={16}>
      <PluginPageHeader
        icon="mdi:play-box-outline"
        resources={[{ label: 'xgplayer', url: 'https://h5player.bytedance.com/' }]}
        tags={['xgplayer', 'HTMLVideoElement']}
        title="视频播放器示例"
      />
      <ExamplePanel icon="mdi:play-box-outline" title="XGPlayer">
        <div className="overflow-hidden rounded-lg shadow-sm" ref={playerRef} />
      </ExamplePanel>
    </Space>
  );
};

export const Route = createFileRoute('/(admin)/plugin/video')({
  component: VideoDemo,
  staticData: {
    i18nKey: 'route.plugin_video',
    menu: {
      icon: 'mdi:play-box-outline',
      order: 150
    },
    title: 'plugin_video'
  }
});
