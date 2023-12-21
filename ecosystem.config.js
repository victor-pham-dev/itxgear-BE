module.exports = {
  apps: [
    {
      name: 'itxgear-be',
      script: 'yarn',
      args: 'start:prod',
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
    },
  ],
}
