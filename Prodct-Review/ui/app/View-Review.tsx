import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useRouter } from 'expo-router';

type Review = {
  _id: string;
  productName: string;
  reviewText: string;
  username: string;
  image?: string;
};

export default function ViewReview() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('http://192.168.6.94:3000/reviews');
        const data = await response.json();
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('Unexpected response format:', data);
        }
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://192.168.6.94:3000/reviews/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setReviews((prev) => prev.filter((review) => review._id !== id));
      } else {
        const errorData = await response.json();
        console.error('Delete failed:', errorData.message);
      }
    } catch (error) {
      console.error('Error deleting review:', error);
    }
  };

  const handleUpdate = (id: string) => {
    router.push(`/update/${id}`);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#3c8256" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>All Reviews</Text>

      {reviews.length === 0 ? (
        <Text style={styles.noReviews}>No reviews found.</Text>
      ) : (
        reviews.map((review) => (
          <View key={review._id} style={styles.card}>
            <Text style={styles.productName}>{review.productName}</Text>
            <Text style={styles.text}>User: {review.username}</Text>
            <Text style={styles.text}>Review: {review.reviewText}</Text>
            {review.image && (
              <Image
                source={{
                  uri: `http://192.168.6.94:3000/${review.image}`,
                }}
                style={styles.image}
              />
            )}
            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={styles.updateBtn}
                onPress={() => handleUpdate(review._id)}
              >
                <Text style={styles.btnText}>Update</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteBtn}
                onPress={() => handleDelete(review._id)}
              >
                <Text style={styles.btnText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#9DCF8E',
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
    color: '#2e6d3f',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#3c8256',
    marginBottom: 4,
  },
  text: {
    fontSize: 16,
    marginBottom: 4,
    color: '#333',
  },
  image: {
    height: 200,
    width: '100%',
    marginTop: 8,
    borderRadius: 8,
  },
  noReviews: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
    color: '#555',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#9DCF8E',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  updateBtn: {
    backgroundColor: '#3c8256',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  deleteBtn: {
    backgroundColor: '#3c8256',
    padding: 10,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
