
export default ({ env }) => ({
    upload: {
        config: {
            sizeLimit: 10000000,
            provider: 'local',
            providerOptions: {
            },
        },
    },
    email: {
        config: {
            provider: '@strapi/provider-email-nodemailer',
            providerOptions: {
                host: env('SMTP_HOST'),
                port: env.int('SMTP_PORT', 587),
                secure: env.bool('SMTP_SECURE', false),
                requireTLS: true,
                auth: {
                    user: env('SMTP_USER'),
                    pass: env('SMTP_PASS', ''),
                },
                tls: {
                    rejectUnauthorized: false
                }
            },
            settings: {
                defaultFrom: env('SMTP_FROM', env('SMTP_USER')),
                defaultFromName: env('SMTP_FROM_NAME', 'ServitiumCRM'),
                defaultReplyTo: env('SMTP_FROM', env('SMTP_USER')),
            },
        },
    },
});