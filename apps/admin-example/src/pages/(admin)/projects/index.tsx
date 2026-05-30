import { createFileRoute } from '@tanstack/react-router';
import { Typography } from 'antd';

const Projects = () => {
  return (
    <ACard className="card-wrapper" size="small" variant="borderless">
      <Typography.Title level={4}>Projects</Typography.Title>
      <Typography.Text type="secondary">用于承接功能页签示例中的动态路由跳转。</Typography.Text>
    </ACard>
  );
};

export const Route = createFileRoute('/(admin)/projects/')({
  component: Projects
});
