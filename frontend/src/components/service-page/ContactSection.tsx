"use client";

import ContactUsSection from "@/components/Contact";
import React from "react";

interface FeaturePoint {
  id: number;
  title: string;
  description: string;
  icon?: {
    url?: string;
    data?: {
      attributes?: {
        url?: string;
      };
    };
  } | null;
}

interface ContactSectionProps {
  sectionTitle: string;
  description?: string;
  featuresList: FeaturePoint[];
  themeColor?: string;
  onSubmit?: (data: any) => Promise<void> | void;
}

const ContactSection: React.FC<ContactSectionProps> = ({
  sectionTitle,
  description,
  featuresList,
  onSubmit,
}) => {
  return (
    <ContactUsSection
      sectionTitle={sectionTitle}
      description={description}
      featuresList={featuresList}
      isPageSection
      onSubmit={onSubmit}
    />
  );
};

export default ContactSection;
