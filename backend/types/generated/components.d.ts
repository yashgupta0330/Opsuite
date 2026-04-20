import type { Schema, Struct } from '@strapi/strapi';

export interface SectionsAdvantageSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_advantage_sections';
  info: {
    displayName: 'Advantage section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface SectionsContactSection extends Struct.ComponentSchema {
  collectionName: 'components_sections_contact_sections';
  info: {
    description: '';
    displayName: 'Contact Section';
  };
  attributes: {
    description: Schema.Attribute.Text;
    featuresList: Schema.Attribute.Component<'shared.feature-point', true>;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsFeatureGrid extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_grids';
  info: {
    description: '';
    displayName: 'Feature Grid';
  };
  attributes: {
    cards: Schema.Attribute.Component<'shared.grid-card', true>;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsFeatureHighlights extends Struct.ComponentSchema {
  collectionName: 'components_sections_feature_highlights';
  info: {
    description: '';
    displayName: 'Feature Highlights';
  };
  attributes: {
    highlights: Schema.Attribute.Component<'shared.highlight-item', true>;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsHero extends Struct.ComponentSchema {
  collectionName: 'components_sections_heroes';
  info: {
    description: '';
    displayName: 'Hero';
  };
  attributes: {
    description: Schema.Attribute.RichText;
    heading: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images'>;
    primaryButtonLink: Schema.Attribute.String;
    primaryButtonText: Schema.Attribute.String;
    subheading: Schema.Attribute.String;
  };
}

export interface SectionsNumberedBenefits extends Struct.ComponentSchema {
  collectionName: 'components_sections_numbered_benefits';
  info: {
    description: '';
    displayName: 'Numbered Benefits';
  };
  attributes: {
    items: Schema.Attribute.Component<'shared.benefit-item', true>;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsSideFeature extends Struct.ComponentSchema {
  collectionName: 'components_sections_side_features';
  info: {
    description: '';
    displayName: 'Side Feature';
  };
  attributes: {
    features: Schema.Attribute.Component<'shared.feature-point', true>;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imagePosition: Schema.Attribute.Enumeration<['left', 'right']>;
    sectionDescription: Schema.Attribute.Text;
    sectionTitle: Schema.Attribute.String;
  };
}

export interface SectionsTestimonialBanner extends Struct.ComponentSchema {
  collectionName: 'components_sections_testimonial_banners';
  info: {
    description: '';
    displayName: 'Testimonial Banner';
  };
  attributes: {
    testimonial: Schema.Attribute.Relation<
      'oneToOne',
      'api::testimonial.testimonial'
    >;
  };
}

export interface SharedBenefitItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_benefit_items';
  info: {
    description: '';
    displayName: 'Benefit Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    number: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedFeaturePoint extends Struct.ComponentSchema {
  collectionName: 'components_shared_feature_points';
  info: {
    description: '';
    displayName: 'Feature Point';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedGridCard extends Struct.ComponentSchema {
  collectionName: 'components_shared_grid_cards';
  info: {
    description: '';
    displayName: 'Grid Card';
  };
  attributes: {
    description: Schema.Attribute.Text;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    mediaType: Schema.Attribute.Enumeration<['icon', 'image']> &
      Schema.Attribute.DefaultTo<'image'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedHighlightItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_highlight_items';
  info: {
    description: '';
    displayName: 'Highlight Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    icon: Schema.Attribute.Media<'images'>;
    title: Schema.Attribute.String;
  };
}

export interface SharedListItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_list_items';
  info: {
    description: 'Simple string item for lists';
    displayName: 'List Item';
  };
  attributes: {
    text: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface SharedSidebarInfo extends Struct.ComponentSchema {
  collectionName: 'components_shared_sidebar_infos';
  info: {
    description: 'Case study sidebar metadata';
    displayName: 'Sidebar Info';
  };
  attributes: {
    industry: Schema.Attribute.RichText;
    location: Schema.Attribute.RichText;
    size: Schema.Attribute.RichText;
  };
}

export interface SharedStatItem extends Struct.ComponentSchema {
  collectionName: 'components_shared_stat_items';
  info: {
    description: 'Case study statistics item';
    displayName: 'Stat Item';
  };
  attributes: {
    description: Schema.Attribute.Text;
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'sections.advantage-section': SectionsAdvantageSection;
      'sections.contact-section': SectionsContactSection;
      'sections.feature-grid': SectionsFeatureGrid;
      'sections.feature-highlights': SectionsFeatureHighlights;
      'sections.hero': SectionsHero;
      'sections.numbered-benefits': SectionsNumberedBenefits;
      'sections.side-feature': SectionsSideFeature;
      'sections.testimonial-banner': SectionsTestimonialBanner;
      'shared.benefit-item': SharedBenefitItem;
      'shared.feature-point': SharedFeaturePoint;
      'shared.grid-card': SharedGridCard;
      'shared.highlight-item': SharedHighlightItem;
      'shared.list-item': SharedListItem;
      'shared.sidebar-info': SharedSidebarInfo;
      'shared.stat-item': SharedStatItem;
    }
  }
}
