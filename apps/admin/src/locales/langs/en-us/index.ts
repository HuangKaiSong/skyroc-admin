import common from './common';
import form from './form';
import page from './page';
import request from './request';
import route from './route';
import system from './system';
import theme from './theme';

const local: I18n.Schema['translation'] = {
  common,
  datatable: {
    itemCount: 'Total {total} items'
  },
  dropdown: {
    closeAll: 'Close All',
    closeCurrent: 'Close Current',
    closeLeft: 'Close Left',
    closeOther: 'Close Other',
    closeRight: 'Close Right',
    pin: 'Pin Tab',
    unpin: 'Unpin Tab'
  },
  form,
  icon: {
    collapse: 'Collapse Menu',
    expand: 'Expand Menu',
    fullscreen: 'Fullscreen',
    fullscreenExit: 'Exit Fullscreen',
    lang: 'Switch Language',
    notification: 'Notification',
    pin: 'Pin',
    reload: 'Reload Page',
    themeConfig: 'Theme Configuration',
    themeSchema: 'Theme Schema',
    unpin: 'Unpin'
  },
  notification: {
    all: 'All',
    browser: 'Browser Notification',
    clearAll: 'Clear All',
    clearConfirm: 'Are you sure to clear all notifications?',
    doNotDisturb: 'Do Not Disturb',
    empty: 'No notifications',
    markAllRead: 'Mark All Read',
    message: 'Message',
    sound: 'Notification Sound',
    system: 'System',
    title: 'Notification Center'
  },
  page,
  request,
  route,
  system,
  theme
};

export default local;
