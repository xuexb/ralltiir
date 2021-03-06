fis.set('project.fileType.text', 'etpl');

fis.set('project.ignore', [
    '**.log',
    '**/*.swp'
]);

fis.set('project.files', [
    'lib/**',
    'src/**',
    'test/**',
    'test-main.js'
]);

fis.config.set("project.watch.usePolling", true);

fis.match('*', {
    release: false
});

fis.match('/src/(**).js', {
    release: true,
    moduleId: '$1',
    isMod: true
});

fis.media('prod').match('/src/(**).js', {
    release: true,
    moduleId: 'sfr/$1',
    isMod: true
});

// not included in main.js, build manually
fis.media('prod').match('/src/utils/logger.js', {
    release: true,
    moduleId: 'sfr/utils/logger',
    isMod: true
});

fis.match('/test/(**).js', {
    release: true,
    moduleId: 'test/$1',
    isMod: true
});

fis.match('/test-main.js', {
    release: true,
});

fis.match('/lib/(**).js', {
    moduleId: '$1',
    release: '/lib/$1'
});

fis.match('/examples/(**)', {
    release: '/examples/$1'
});

fis.match('main.js', {
    isMod: false,
    release: '/src/main.js'
});

fis.match('main.min.js', {
    isMod: false,
    optimizer: fis.plugin('uglify-js', {
        output: {
            max_line_len : 500
        },
        compress: {
            dead_code: true,
            pure_funcs: ['logger.debug', 'logger.log', 'logger.info', 'logger.error', 'logger.warn']
        }
    }),
    release: '/src/main.min.js'
});

fis.hook('amd', {
    baseUrl: '/base'
});
