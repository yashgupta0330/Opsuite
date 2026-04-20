// import type { Core } from '@strapi/strapi';

export default {
  /**
   * An asynchronous register function that runs before
   * your application is initialized.
   *
   * This gives you an opportunity to extend code.
   */
  register(/* { strapi }: { strapi: Core.Strapi } */) { },

  /**
   * An asynchronous bootstrap function that runs before
   * your application gets started.
   *
   * This gives you an opportunity to set up your data model,
   * run jobs, or perform some special logic.
   */
  async bootstrap({ strapi }: { strapi: any }) {
    try {
      // 1. Grant public permissions to the newly created Solutions and Platform endpoints
      const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({ where: { type: 'public' } });
      if (publicRole) {
        const actions = [
          'api::platform.platform.find',
          'api::platform.platform.findOne',
          'api::service-page.service-page.find',
          'api::service-page.service-page.findOne',
          'api::industries-page.industries-page.find',
          'api::industries-page.industries-page.findOne',
          'api::global.global.find',
          'api::global.global.findOne',
        ];
        for (const action of actions) {
          const exists = await strapi.db.query('plugin::users-permissions.permission').findOne({ where: { action, role: publicRole.id } });
          if (!exists) {
            await strapi.db.query('plugin::users-permissions.permission').create({ data: { action, role: publicRole.id } });
            strapi.log.info(`[SEED] Granted Public permission for ${action}`);
          }
        }
      }

      const slug = 'omnichannel-call-registration';

      // Determine which API to use (Strapi 5 vs 4)
      const service = strapi.documents ? strapi.documents('api::service-page.service-page') : strapi.entityService;
      const findMethod = strapi.documents ? 'findMany' : 'findMany';
      const createMethod = strapi.documents ? 'create' : 'create';
      const uid = 'api::service-page.service-page';

      const args = strapi.documents ? { filters: { slug } } : { filters: { slug } };

      // Check if entry exists
      const entries = await (strapi.documents ? service.findMany(args) : service.findMany(uid, args));

      if (entries.length === 0) {
        strapi.log.info(`[SEED] Creating Service Page: ${slug}`);

        const data = {
          title: 'Omnichannel Call Registration',
          slug,
          shortDescription: 'Unified Omni-Channel Customer Engagement Platform',
          category: 'Customer Service Operations',
          publishedAt: new Date(),
          sections: [
            {
              __component: 'sections.hero',
              heading: 'Meet Customers Anywhere with Seamless Service',
              subheading: 'Unified Omni-Channel Customer Engagement Platform',
              description: 'Customers engage across channels—voice, email, chat, social, and more. ServitiumCRM unifies these interactions into a single, intuitive interface, empowering agents to deliver consistent, personalized, and efficient support every time.',
              primaryButtonText: 'Request Demo',
              primaryButtonLink: '#contact',
            },
            {
              __component: 'sections.feature-highlights',
              sectionTitle: 'Transform Support into Connected, Insight-Driven Engagement',
              highlights: [
                { title: 'Unified Customer Engagement', description: 'Manage all interactions in one place.' },
                { title: 'Faster Case Resolution', description: ' AI-driven insights for quicker fixes.' },
                { title: 'Personalized Interactions', description: '360-degree view of customer history.' },
              ]
            },
            {
              __component: 'sections.side-feature',
              sectionTitle: 'Smart Call & IVR Management',
              description: 'Streamline voice interactions with intelligent routing.',
              imagePosition: 'right',
              features: [
                { title: 'Smart Routing', description: 'Direct callers to the right agent instantly based on intent and history.' },
                { title: 'Skill-based agent assignment', description: 'Connect each call to the agent best equipped to handle the specific issue.' },
                { title: 'Improve issue resolution', description: 'Reduce handling time and improve first-call resolution rates.' },
              ]
            },
            {
              __component: 'sections.side-feature',
              sectionTitle: 'WhatsApp Support Made Simple',
              description: 'Engage customers on their preferred messaging app.',
              imagePosition: 'right',
              features: [
                { title: 'Instant engagement', description: 'Respond to queries in real-time on WhatsApp.' },
                { title: 'Real-time updates', description: 'Send automated status updates and notifications.' },
                { title: 'Centralized management', description: 'Manage WhatsApp chats alongside other channels.' },
              ]
            },
            {
              __component: 'sections.side-feature',
              sectionTitle: 'SMS Notifications & Alerts',
              description: 'Keep customers informed with timely SMS updates.',
              imagePosition: 'left',
              features: [
                { title: 'Service acknowledgments', description: 'Confirm receipt of service requests instantly.' },
                { title: 'Status updates', description: 'Notify customers of progress at every stage.' },
                { title: 'Completion notifications', description: 'Alert customers when their issue is resolved.' },
              ]
            },
            {
              __component: 'sections.feature-grid',
              sectionTitle: 'Other Features',
              description: 'More tools to enhance your service operations.',
              cards: [
                { title: 'Smart Email Communication', description: 'Convert emails into tickets automatically and reply with templates.' },
                { title: 'Mobile-First Service Engagement', description: 'Empower customers and agents with mobile-friendly interfaces.' },
              ]
            },
            {
              __component: 'sections.numbered-benefits',
              sectionTitle: 'Business Impact',
              description: 'Drive tangible results with omni-channel engagement.',
              items: [
                { number: '01', title: 'Deliver real-time, context-aware support', description: ' Understand customer needs instantly.' },
                { number: '02', title: 'Improve agent efficiency and reduce churn', description: 'Simplify workflows and reduce burnout.' },
                { number: '03', title: 'Deliver consistent service across all channels', description: 'Unified brand experience everywhere.' },
                { number: '04', title: 'Build higher customer satisfaction and loyalty', description: 'Happy customers stay longer.' },
              ]
            },
            {
              __component: 'sections.testimonial-banner',
              quote: 'ServitiumCRM has transformed how we engage with our customers, leading to a 40% increase in satisfaction scores.',
              authorName: 'Success Story',
            },
            {
              __component: 'sections.contact-section',
              sectionTitle: 'Every Interaction Handled with Confidence',
              description: 'Ready to upgrade your customer service experience?',
              featuresList: [
                { title: 'Seamless self-registration for customers', description: '.' },
                { title: 'Faster resolution with AI assistance', description: '.' },
                { title: 'Consistent service experience across channels', description: '.' },
              ]
            }
          ]
        };

        if (strapi.documents) {
          await strapi.documents(uid).create({ data, status: 'published' });
        } else {
          await strapi.entityService.create(uid, { data });
        }

        strapi.log.info('[SEED] Service Page created successfully.');
      } else {
        strapi.log.info(`[SEED] Service Page "${slug}" already exists. Skipping.`);
      }
    } catch (error) {
      strapi.log.error('[SEED] Bootstrap error:', error);
    }
  },
};
