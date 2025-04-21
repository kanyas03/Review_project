import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    Image,
    ScrollView,
    ActivityIndicator,
    StyleSheet,
  } from 'react-native';
  import React, { useEffect, useState } from 'react';
  import { useLocalSearchParams, useRouter } from 'expo-router';
  import * as ImagePicker from 'expo-image-picker';
  
  const UpdateReview = () => {
    const { id: reviewId } = useLocalSearchParams();
    const router = useRouter();
  
    const [productName, setProductName] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [username, setUsername] = useState('');
    const [image, setImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      if (reviewId) {
        fetchReviewDetails(reviewId as string);
      }
    }, [reviewId]);
  
    const fetchReviewDetails = async (id: string) => {
      try {
        const res = await fetch(`http://192.168.6.94:3000/reviews/${id}`);
        const data = await res.json();
        setProductName(data.productName);
        setReviewText(data.reviewText);
        setUsername(data.username);
        setImage(data.image ? `http://192.168.6.94:3000/${data.image}` : null);
      } catch (err) {
        Alert.alert('Error', 'Failed to fetch review details');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
  
    const handleImagePick = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    };
  
    const handleSubmit = async () => {
      if (!reviewId) return;
  
      const formData = new FormData();
      formData.append('productName', productName);
      formData.append('reviewText', reviewText);
      formData.append('username', username);
  
      if (image && !image.startsWith('http')) {
        const fileName = image.split('/').pop();
        const fileType = fileName?.split('.').pop();
        formData.append('image', {
          uri: image,
          name: fileName,
          type: `image/${fileType}`,
        } as any);
      }
  
      try {
        const res = await fetch(`http://192.168.6.94:3000/reviews/${reviewId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          body: formData,
        });
  
        if (res.ok) {
          Alert.alert('Success', 'Review updated successfully');
          router.push('/View-Review');
        } else {
          const err = await res.json();
          Alert.alert('Error', err.message || 'Something went wrong');
        }
      } catch (err) {
        Alert.alert('Error', 'Failed to update review');
        console.error(err);
      }
    };
  
    if (loading) {
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3c8256" />
        </View>
      );
    }
  
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.formBox}>
          <Text style={styles.title}>Update Review</Text>
  
          <TextInput
            value={productName}
            onChangeText={setProductName}
            placeholder="Product Name"
            style={styles.input}
          />
          <TextInput
            value={reviewText}
            onChangeText={setReviewText}
            placeholder="Write your review"
            multiline
            style={[styles.input, { height: 100 }]}
          />
          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Your Name"
            style={styles.input}
          />
  
          <TouchableOpacity style={styles.button} onPress={handleImagePick}>
            <Text style={styles.buttonText}>Pick an Image</Text>
          </TouchableOpacity>
  
          {image && (
            <Image
              source={{ uri: image }}
              style={styles.preview}
            />
          )}
  
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Update Review</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      padding: 24,
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#9DCF8E',
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#9DCF8E',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 24,
      textAlign: 'center',
      color: '#2e6d3f',
    },
    formBox: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 4,
    },
    input: {
      backgroundColor: '#f8f8f8',
      padding: 12,
      marginBottom: 12,
      borderRadius: 8,
      borderColor: '#ccc',
      borderWidth: 1,
    },
    button: {
      backgroundColor: '#3c8256',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
    preview: {
      width: '100%',
      height: 200,
      marginTop: 10,
      marginBottom: 15,
      borderRadius: 8,
    },
  });
  
  export default UpdateReview;
  