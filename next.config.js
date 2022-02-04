const path = require('path')

const securityHeaders = [{
    key: 'Content-Security-Policy',
    value: 'upgrade-insecure-requests'
},
{
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains'
},
{
    key: 'X-XSS-Protection',
    value: '1; mode=block'
},
{
    key: 'X-Frame-Options',
    value: 'DENY'
},
{
    key: 'X-Content-Type-Options',
    value: 'nosniff'
},
{
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin'
},
{
    key: 'Permissions-Policy',
    value: 'interest-cohort=()'
}
]
module.exports = {
    async headers() {
        return [{
            source: '/(.*)',
            headers: securityHeaders,
        },]
    },
    poweredByHeader: false,
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
}
