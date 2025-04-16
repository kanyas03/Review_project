
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useAuth } from '../app/context/AuthContext';

export default function HomePage() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>TrustVibe</Text>
        <View style={styles.navButtons}>
          {isLoggedIn ? (
            <>
              <Link href="/addReview" asChild>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Write Review</Text>
                </TouchableOpacity>
              </Link>
              <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Link href="/signup" asChild>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
              <Link href="/login" asChild>
                <TouchableOpacity style={styles.button}>
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
              </Link>
            </>
          )}
        </View>
      </View>

      <ImageBackground
        source={require('../assets/images/greenbg.jpeg')}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>Find and Share Real Reviews</Text>
          <Text style={styles.heroSubtitle}>
            Helping people make better decisions
          </Text>
        </View>
      </ImageBackground>

      <View style={styles.howItWorks}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Sign up and create your profile</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Write honest and helpful reviews</Text>
        </View>
        <View style={styles.stepBox}>
          <Text style={styles.stepText}>Discover real opinions before buying</Text>
        </View>
      </View>

      <View style={styles.reviewCard}>
        <Text style={styles.reviewTitle}>Featured Review</Text>
        <Text style={styles.reviewContent}>
          “TrustVibe helped me avoid wasting money. Real reviews from real people.”
        </Text>
        <Text style={styles.reviewAuthor}>— Alex R.</Text>
      </View>

      {!isLoggedIn && (
        <View style={styles.ctaSection}>
          <Text style={styles.ctaHeading}>Let Your Voice Be Heard</Text>
          <Text style={styles.ctaText}>
            Join thousands who share their experiences and help others make better
            choices.
          </Text>
          <Link href="/signup" asChild>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Join TrustVibe Now</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2025 TrustVibe. All rights reserved.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#9DCF8E',
    paddingVertical: 16,
    paddingHorizontal: 20,
    width: '100%',
  },
  logo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  navButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    backgroundColor: '#3c8256',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  hero: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    backgroundColor: 'rgba(70, 85, 67, 0.4)',
    padding: 20,
    borderRadius: 10,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#ddf',
    textAlign: 'center',
  },
  howItWorks: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: '#f4fff4',
    marginTop: 20,
    width: '100%',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e6d3f',
  },
  stepBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e1f4e9',
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
  },
  stepText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: '#e9f8ef',
    padding: 20,
    borderRadius: 10,
    marginVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#444',
    textAlign: 'center',
  },
  reviewContent: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  reviewAuthor: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  ctaSection: {
    backgroundColor: '#d0f0dd',
    margin: 20,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  ctaHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2e6d3f',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: 16,
    color: '#444',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaButton: {
    backgroundColor: '#3c8256',
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  ctaButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    marginTop: 40,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#999',
  },
});

