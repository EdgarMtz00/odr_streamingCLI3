module.exports = {
    runtimeCompiler: true,
    pwa: {
        workboxPluginMode: 'GenerateSW',
        name: 'Odr',
        appleMobileWebAppCapable: 'no',
        workboxOptions: {
            importWorkboxFrom: 'local',
            maximumFileSizeToCacheInBytes: 50 * 1024 * 1024,
            runtimeCaching:[{
                urlPattern: '/',
                handler: 'networkFirst',
                options: {
                    networkTimeoutSeconds: 30,
                }
            }]
        }
    }
}