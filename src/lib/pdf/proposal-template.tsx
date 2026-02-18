import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { baseStyles, colors } from "./styles";
import type { ProposalData } from "../schema";

const Footer = ({ name, contact, email }: { name?: string; contact?: string; email?: string }) => (
  <View style={baseStyles.footer}>
    <View>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8, marginBottom: 2 }}>Prepared By</Text>
      <Text style={baseStyles.small}>{name}</Text>
    </View>
    <View>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8, marginBottom: 2 }}>Contact</Text>
      <Text style={baseStyles.small}>{contact}</Text>
    </View>
    <View>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8, marginBottom: 2 }}>Email</Text>
      <Text style={baseStyles.small}>{email}</Text>
    </View>
  </View>
);

const BulletList = ({ items, color = colors.gray800 }: { items: string[]; color?: string }) => (
  <View>
    {items.map((item, i) => (
      <View key={i} style={baseStyles.bulletItem}>
        <Text style={[baseStyles.bullet, { color }]}>{"\u2022"}</Text>
        <Text style={[baseStyles.bulletText, { color }]}>{item}</Text>
      </View>
    ))}
  </View>
);

export const ProposalDocument = ({ data }: { data: ProposalData }) => {
  const total = data.pricingItems.reduce((acc, item) => acc + item.price, 0);
  const today = new Date().toISOString().split("T")[0];

  return (
    <Document>
      {/* Page 1: Cover */}
      <Page size="A4" style={[baseStyles.page, { padding: 48, justifyContent: "space-between" }]}>
        {/* Top */}
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
          <View>
            <Text style={{ fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 4 }}>
              {data.brandName || "Agency Name"}.
            </Text>
            <Text style={[baseStyles.label, { marginBottom: 0 }]}>
              {data.brandDescription || "Digital Solutions"}
            </Text>
          </View>
          <Text style={baseStyles.pageNumber}>00</Text>
        </View>

        {/* Title */}
        <View style={{ marginTop: 60 }}>
          <Text style={{ fontSize: 42, fontFamily: "Helvetica-Bold", marginBottom: 16, lineHeight: 1.1 }}>
            {data.projectName}
          </Text>
          <Text style={{ fontSize: 18, color: colors.gray500 }}>{data.projectType}</Text>
        </View>

        {/* Bottom details */}
        <View style={{ borderTopWidth: 2, borderTopColor: colors.black, paddingTop: 20, flexDirection: "row", flexWrap: "wrap", gap: 24 }}>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Prepared For</Text>
            <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold" }}>{data.clientName}</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Prepared By</Text>
            <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold" }}>{data.authorName}</Text>
            <Text style={{ fontSize: 9, color: colors.gray500 }}>{data.authorRole}</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Date & Version</Text>
            <Text style={{ fontSize: 9 }}>{today} {"\u2022"} {data.version || "v1.0"}</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Valid Until</Text>
            <Text style={{ fontSize: 9 }}>{data.validUntil || "7 days from date"}</Text>
          </View>
        </View>
      </Page>

      {/* Page 2: Project Scope */}
      <Page size="A4" style={[baseStyles.page, { padding: 48, justifyContent: "space-between" }]}>
        <View>
          {/* Header */}
          <View style={baseStyles.headerBar}>
            <Text style={baseStyles.h2}>Project Scope</Text>
            <Text style={baseStyles.pageNumber}>01</Text>
          </View>

          {/* Overview */}
          <View style={baseStyles.section}>
            <View style={baseStyles.sectionLabel}>
              <Text style={baseStyles.h3}>Overview</Text>
            </View>
            <View style={baseStyles.sectionContent}>
              <Text style={baseStyles.body}>{data.overview}</Text>
              {data.successCriteria && (
                <View style={[baseStyles.bgGray, { marginTop: 12, borderLeftWidth: 2, borderLeftColor: colors.black }]}>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold" }}>
                    Goal: {data.successCriteria}
                  </Text>
                </View>
              )}
            </View>
          </View>

          {/* Deliverables */}
          <View style={baseStyles.section}>
            <View style={baseStyles.sectionLabel}>
              <Text style={baseStyles.h3}>Deliverables</Text>
            </View>
            <View style={baseStyles.sectionContent}>
              <Text style={[baseStyles.small, { marginBottom: 8 }]}>What is included in this commercial offer:</Text>
              <BulletList items={data.includedScope} />
            </View>
          </View>

          {/* Out of Scope */}
          <View style={baseStyles.section}>
            <View style={baseStyles.sectionLabel}>
              <Text style={[baseStyles.h3, { color: colors.gray400 }]}>Out of Scope</Text>
            </View>
            <View style={baseStyles.sectionContent}>
              <BulletList items={data.excludedScope} color={colors.gray500} />
            </View>
          </View>

          {/* Assumptions */}
          <View style={baseStyles.section}>
            <View style={baseStyles.sectionLabel}>
              <Text style={baseStyles.h3}>Assumptions</Text>
            </View>
            <View style={baseStyles.sectionContent}>
              <BulletList items={data.assumptions} color={colors.gray600} />
            </View>
          </View>
        </View>

        <Footer name={data.authorName} contact={data.authorContact} email={data.authorEmail} />
      </Page>

      {/* Page 3: Pricing & Timeline */}
      <Page size="A4" style={[baseStyles.page, { padding: 48, justifyContent: "space-between" }]}>
        <View>
          {/* Header */}
          <View style={baseStyles.headerBar}>
            <Text style={baseStyles.h2}>Pricing & Deadline</Text>
            <Text style={baseStyles.pageNumber}>02</Text>
          </View>

          {/* Investment */}
          <View style={baseStyles.section}>
            <View style={baseStyles.sectionLabel}>
              <Text style={baseStyles.h3}>Investment</Text>
            </View>
            <View style={baseStyles.sectionContent}>
              <Text style={[baseStyles.body, { marginBottom: 16 }]}>
                Commercial breakdown of the deliverables.
              </Text>

              <View style={baseStyles.dividerThin}>
                {data.pricingItems.map((item, i) => (
                  <View key={i} style={baseStyles.row}>
                    <Text style={{ fontSize: 10 }}>{item.description}</Text>
                    <Text style={[baseStyles.mono, { fontSize: 10 }]}>$ {item.price.toLocaleString()}</Text>
                  </View>
                ))}
              </View>

              <View style={[baseStyles.row, { borderTopWidth: 2, borderTopColor: colors.black, paddingTop: 8, marginTop: 4 }]}>
                <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold" }}>Grand Total</Text>
                <Text style={{ fontSize: 14, fontFamily: "Helvetica-Bold" }}>$ {total.toLocaleString()}</Text>
              </View>

              <View style={[baseStyles.bgGray, { flexDirection: "row", gap: 20, marginTop: 16 }]}>
                <View style={{ width: "50%" }}>
                  <Text style={baseStyles.label}>Payment Schedule</Text>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold" }}>{data.paymentSchedule}</Text>
                </View>
                <View style={{ width: "50%" }}>
                  <Text style={baseStyles.label}>Revisions Included</Text>
                  <Text style={{ fontSize: 9, fontFamily: "Helvetica-Bold" }}>{data.revisions}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Timeline */}
          <View style={baseStyles.section}>
            <View style={baseStyles.sectionLabel}>
              <Text style={baseStyles.h3}>Timeline</Text>
            </View>
            <View style={baseStyles.sectionContent}>
              <View style={baseStyles.dividerThin}>
                {data.milestones.map((m, i) => (
                  <View key={i} style={baseStyles.row}>
                    <Text style={{ fontSize: 10 }}>{m.phase}</Text>
                    <Text style={[baseStyles.mono, { fontSize: 10 }]}>{m.duration}</Text>
                  </View>
                ))}
              </View>

              <View style={{ borderLeftWidth: 2, borderLeftColor: colors.gray300, paddingLeft: 12, marginTop: 12 }}>
                <Text style={{ fontSize: 9, fontStyle: "italic", color: colors.gray500, marginBottom: 4 }}>
                  {"\u2022"} {data.startCondition}
                </Text>
                <Text style={{ fontSize: 9, fontStyle: "italic", color: colors.gray500 }}>
                  {"\u2022"} {data.feedbackDependency}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <Footer name={data.authorName} contact={data.authorContact} email={data.authorEmail} />
      </Page>

      {/* Page 4: Terms */}
      <Page size="A4" style={[baseStyles.page, { padding: 48, justifyContent: "space-between" }]}>
        <View>
          {/* Header */}
          <View style={baseStyles.headerBar}>
            <Text style={baseStyles.h2}>Engagement Terms</Text>
            <Text style={baseStyles.pageNumber}>03</Text>
          </View>

          {/* Terms */}
          <View style={baseStyles.section}>
            <View style={baseStyles.sectionLabel}>
              <Text style={baseStyles.h3}>Standard{"\n"}Terms</Text>
            </View>
            <View style={baseStyles.sectionContent}>
              {data.terms.map((term, i) => {
                const colonIdx = term.indexOf(":");
                const title = colonIdx !== -1 ? term.substring(0, colonIdx + 1) : "";
                const body = colonIdx !== -1 ? term.substring(colonIdx + 1) : term;
                return (
                  <View key={i} style={[baseStyles.bulletItem, { marginBottom: 12 }]}>
                    <Text style={[baseStyles.bullet, { fontSize: 9 }]}>{"\u2022"}</Text>
                    <Text style={{ fontSize: 9, flex: 1, lineHeight: 1.5, color: colors.gray800 }}>
                      <Text style={{ fontFamily: "Helvetica-Bold" }}>{title}</Text>
                      {body}
                    </Text>
                  </View>
                );
              })}

              <Text style={{ fontSize: 7, color: colors.gray400, fontStyle: "italic", marginTop: 24 }}>
                * Note: Comprehensive legal terms regarding liability, warranties, and dispute resolution will be provided in the final contract.
              </Text>
            </View>
          </View>

          {/* Signature */}
          <View style={baseStyles.dividerDashed}>
            <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 20 }}>Approval</Text>
            <View style={{ flexDirection: "row", gap: 40 }}>
              <View style={{ width: "45%" }}>
                <Text style={[baseStyles.label, { marginBottom: 40 }]}>Client Signature</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.black, marginBottom: 4 }} />
                <Text style={{ fontSize: 7, color: colors.gray400 }}>Date: __________________</Text>
              </View>
              <View style={{ width: "45%" }}>
                <Text style={[baseStyles.label, { marginBottom: 40 }]}>Provider Signature</Text>
                <View style={{ borderBottomWidth: 1, borderBottomColor: colors.black, marginBottom: 4 }} />
                <Text style={{ fontSize: 7, color: colors.gray400 }}>Date: {today}</Text>
              </View>
            </View>
            <Text style={{ fontSize: 9, color: colors.gray600, marginTop: 16 }}>
              By signing above, you accept the scope, timeline, and pricing outlined in this proposal. A formal invoice and contract will follow.
            </Text>
          </View>
        </View>

        <Footer name={data.authorName} contact={data.authorContact} email={data.authorEmail} />
      </Page>
    </Document>
  );
};
