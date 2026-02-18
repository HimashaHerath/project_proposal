import React from "react";
import { Document, Page, View, Text } from "@react-pdf/renderer";
import { baseStyles, colors } from "./styles";
import type { ContractData } from "../contractSchema";

export const ContractDocument = ({ data }: { data: ContractData }) => {
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
            <Text style={[baseStyles.label, { marginBottom: 0 }]}>Legal Binding Document</Text>
          </View>
          <Text style={baseStyles.pageNumber}>00</Text>
        </View>

        {/* Title */}
        <View style={{ marginTop: 60 }}>
          <Text style={{ fontSize: 42, fontFamily: "Helvetica-Bold", marginBottom: 16, lineHeight: 1.1 }}>
            Contract Agreement
          </Text>
          <Text style={{ fontSize: 18, color: colors.gray500 }}>Master Services Agreement</Text>
        </View>

        {/* Bottom details */}
        <View style={{ borderTopWidth: 2, borderTopColor: colors.black, paddingTop: 20, flexDirection: "row", flexWrap: "wrap", gap: 24 }}>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Client</Text>
            <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold" }}>{data.clientName}</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Provider</Text>
            <Text style={{ fontSize: 13, fontFamily: "Helvetica-Bold" }}>{data.providerName}</Text>
            <Text style={{ fontSize: 9, color: colors.gray500 }}>Service Provider</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Effective Date</Text>
            <Text style={{ fontSize: 9 }}>{data.effectiveDate}</Text>
          </View>
          <View style={{ width: "45%" }}>
            <Text style={baseStyles.label}>Document Date</Text>
            <Text style={{ fontSize: 9 }}>{today}</Text>
          </View>
        </View>
      </Page>

      {/* Page 2: Agreement Terms */}
      <Page size="A4" style={[baseStyles.page, { padding: 48, justifyContent: "space-between" }]}>
        <View>
          {/* Header */}
          <View style={baseStyles.headerBar}>
            <View>
              <Text style={baseStyles.h2}>Agreement Terms</Text>
              <Text style={{ fontSize: 7, color: colors.gray500, marginTop: 2 }}>Page 1 of 1</Text>
            </View>
            <Text style={baseStyles.pageNumber}>01</Text>
          </View>

          {/* 1. Parties */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[baseStyles.h3, { marginBottom: 8 }]}>1. Parties</Text>
            <Text style={[baseStyles.body, { fontSize: 9 }]}>
              This Master Services Agreement (&quot;Agreement&quot;) is entered into by and between{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.providerName}</Text> (&quot;Provider&quot;),
              located at {data.providerAddress}, and{" "}
              <Text style={{ fontFamily: "Helvetica-Bold" }}>{data.clientName}</Text> (&quot;Client&quot;),
              located at {data.clientAddress}, collectively referred to as the &quot;Parties&quot;.
            </Text>
          </View>

          {/* 2. Services & Fees */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[baseStyles.h3, { marginBottom: 8 }]}>2. Services & Fees</Text>
            <View>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10, marginBottom: 4 }}>Scope of Services:</Text>
              <Text style={{ fontSize: 9, color: colors.gray600, lineHeight: 1.5 }}>{data.servicesDescription}</Text>
            </View>
            <View style={[baseStyles.bgGray, { flexDirection: "row", gap: 20, marginTop: 12 }]}>
              <View style={{ width: "50%" }}>
                <Text style={baseStyles.label}>Total Fee</Text>
                <Text style={[baseStyles.mono, { fontSize: 14 }]}>${data.totalFee.toLocaleString()}</Text>
              </View>
              <View style={{ width: "50%" }}>
                <Text style={baseStyles.label}>Payment Terms</Text>
                <Text style={{ fontSize: 9 }}>{data.paymentTerms}</Text>
              </View>
            </View>
          </View>

          {/* 3. Legal Provisions */}
          <View style={{ marginBottom: 20 }}>
            <Text style={[baseStyles.h3, { marginBottom: 8 }]}>3. Legal Provisions</Text>
            <View style={{ gap: 8 }}>
              <Text style={{ fontSize: 8, color: colors.gray600, lineHeight: 1.5 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", color: colors.black }}>Confidentiality: </Text>
                {data.confidentialityClause}
              </Text>
              <Text style={{ fontSize: 8, color: colors.gray600, lineHeight: 1.5 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", color: colors.black }}>Intellectual Property: </Text>
                {data.ipRightsClause}
              </Text>
              <Text style={{ fontSize: 8, color: colors.gray600, lineHeight: 1.5 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", color: colors.black }}>Termination: </Text>
                {data.terminationClause}
              </Text>
              <Text style={{ fontSize: 8, color: colors.gray600, lineHeight: 1.5 }}>
                <Text style={{ fontFamily: "Helvetica-Bold", color: colors.black }}>Governing Law: </Text>
                This Agreement shall be governed by the laws of {data.governingLaw}.
              </Text>
            </View>
          </View>
        </View>

        {/* Signatures */}
        <View style={baseStyles.dividerDashed}>
          <View style={{ flexDirection: "row", gap: 40 }}>
            <View style={{ width: "45%" }}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10, marginBottom: 24 }}>{data.clientName}</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: colors.black, marginBottom: 4 }} />
              <Text style={[baseStyles.label, { marginBottom: 0 }]}>Authorized Signature</Text>
            </View>
            <View style={{ width: "45%" }}>
              <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10, marginBottom: 24 }}>{data.providerName}</Text>
              <View style={{ borderBottomWidth: 1, borderBottomColor: colors.black, marginBottom: 4 }} />
              <Text style={[baseStyles.label, { marginBottom: 0 }]}>Authorized Signature</Text>
            </View>
          </View>
        </View>
      </Page>
    </Document>
  );
};
