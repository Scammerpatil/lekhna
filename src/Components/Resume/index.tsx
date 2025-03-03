import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 20, fontSize: 12 },
  section: { marginBottom: 10 },
  header: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  subHeader: { fontSize: 14, fontWeight: "bold", marginTop: 10 },
  text: { marginBottom: 2 },
});

const ResumePDF = ({ user }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Name & Contact */}
      <View style={styles.section}>
        <Text style={styles.header}>{user.name}</Text>
        <Text>
          {user.email} | {user.phone}
        </Text>
        {user.socialLinks?.linkedin && (
          <Text>LinkedIn: {user.socialLinks.linkedin}</Text>
        )}
        {user.socialLinks?.github && (
          <Text>GitHub: {user.socialLinks.github}</Text>
        )}
      </View>

      {/* Summary */}
      {user.summary && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Summary</Text>
          <Text>{user.summary}</Text>
        </View>
      )}

      {/* Skills */}
      {user.skills.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Skills</Text>
          <Text>{user.skills.join(", ")}</Text>
        </View>
      )}

      {/* Experience */}
      {user.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Experience</Text>
          {user.experience.map((exp, index) => (
            <View key={index}>
              <Text style={styles.text}>
                {exp.role} at {exp.company} (
                {new Date(exp.startDate).getFullYear()} -{" "}
                {exp.endDate ? new Date(exp.endDate).getFullYear() : "Present"})
              </Text>
              <Text>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education */}
      {user.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Education</Text>
          {user.education.map((edu, index) => (
            <Text key={index} style={styles.text}>
              {edu.degree} from {edu.institution} (
              {new Date(edu.startDate).getFullYear()} -{" "}
              {edu.endDate ? new Date(edu.endDate).getFullYear() : "Present"})
            </Text>
          ))}
        </View>
      )}

      {/* Certifications */}
      {user.certifications.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Certifications</Text>
          {user.certifications.map((cert, index) => (
            <Text key={index} style={styles.text}>
              {cert.name} ({cert.issuedBy}, {new Date(cert.date).getFullYear()})
            </Text>
          ))}
        </View>
      )}

      {/* Projects */}
      {user.projects.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Projects</Text>
          {user.projects.map((proj, index) => (
            <View key={index}>
              <Text style={styles.text}>{proj.title}</Text>
              <Text>{proj.description}</Text>
              <Text>Tech: {proj.technologies.join(", ")}</Text>
              {proj.links?.github && <Text>GitHub: {proj.links.github}</Text>}
              {proj.links?.liveDemo && (
                <Text>Live Demo: {proj.links.liveDemo}</Text>
              )}
            </View>
          ))}
        </View>
      )}

      {/* Achievements */}
      {user.achievements?.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.subHeader}>Achievements</Text>
          <Text>{user.achievements.join(", ")}</Text>
        </View>
      )}
    </Page>
  </Document>
);

export default ResumePDF;
