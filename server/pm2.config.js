'use strict';

module.exports = {
  apps: [
    {
      name: 'kittymark', // pm2로 실행한 프로세스 목록에서 이 애플리케이션의 이름으로 지정될 문자열
      script: './dist/api/main.js', // pm2로 실행될 파일 경로
      watch: false, // 파일이 변경되면 자동으로 재실행 (true || false)
      instances: 0,
      merge_logs: true,
      exec_mode: 'cluster',
      wait_ready: true,
      listen_timeout: 50000,
    },
  ],
};
